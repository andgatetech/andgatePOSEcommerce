"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiClock,
  FiLock,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiSave,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { setUser } from "@/features/auth/authSlice";
import { useGetMyAccountQuery, useUpdateMyAccountMutation } from "@/features/account/myAccountApi";
import { loadStoredAuth, saveStoredAuth } from "@/features/auth/authStorage";
import { useAppDispatch } from "@/lib/hooks";
import type { UpdateMyAccountRequest } from "@/types";

type ProfileForm = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof ProfileForm | "form", string>>;

const emptyForm: ProfileForm = {
  name: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-(--color-border) bg-(--color-bg) p-5 shadow-[0_14px_30px_rgba(17,17,17,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-muted)">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-(--color-dark)">{value}</p>
        </div>
      </div>
    </div>
  );
}

function formatStatus(status: string, otpVerify: 0 | 1) {
  if (status === "active" && otpVerify === 1) {
    return "Verified";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) {
    return "AU";
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

function getAccountErrorDetails(error: unknown): {
  message: string;
  fieldErrors: FieldErrors;
} {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return {
      message: "Account could not be updated.",
      fieldErrors: {},
    };
  }

  const responseData = (error as { data?: unknown }).data;
  if (!responseData || typeof responseData !== "object") {
    return {
      message: "Account could not be updated.",
      fieldErrors: {},
    };
  }

  const fieldErrors: FieldErrors = {};

  if ("errors" in responseData && responseData.errors && typeof responseData.errors === "object") {
    const errors = responseData.errors as Record<string, string[]>;
    if (errors.name?.[0]) fieldErrors.name = errors.name[0];
    if (errors.email?.[0]) fieldErrors.email = errors.email[0];
    if (errors.current_password?.[0]) fieldErrors.currentPassword = errors.current_password[0];
    if (errors.new_password?.[0]) fieldErrors.newPassword = errors.new_password[0];
    if (errors.new_password_confirmation?.[0]) {
      fieldErrors.confirmPassword = errors.new_password_confirmation[0];
    }
  }

  const message =
    "message" in responseData && typeof responseData.message === "string" && responseData.message.trim()
      ? responseData.message
      : "Account could not be updated.";

  return { message, fieldErrors };
}

export default function MyAccountProfilePanel() {
  const dispatch = useAppDispatch();
  const { data, isFetching, isError, refetch } = useGetMyAccountQuery();
  const [updateMyAccount, { isLoading: isSaving }] = useUpdateMyAccountMutation();
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const user = data?.user ?? null;

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setFieldErrors({});
  }, [user]);

  const statusLabel = useMemo(
    () => (user ? formatStatus(user.status, user.otp_verify) : "Loading"),
    [user],
  );

  function updateField<Key extends keyof ProfileForm>(field: Key, value: ProfileForm[Key]) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  function resetForm() {
    if (!user) {
      return;
    }

    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setFieldErrors({});
  }

  async function handleSave() {
    if (!user) {
      return;
    }

    const nextErrors: FieldErrors = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const passwordTouched =
      form.currentPassword.trim() || form.newPassword.trim() || form.confirmPassword.trim();

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    }

    if (passwordTouched) {
      if (!form.currentPassword.trim()) {
        nextErrors.currentPassword = "Current password is required.";
      }
      if (!form.newPassword.trim()) {
        nextErrors.newPassword = "New password is required.";
      }
      if (!form.confirmPassword.trim()) {
        nextErrors.confirmPassword = "Confirm new password is required.";
      }
      if (
        form.newPassword.trim() &&
        form.confirmPassword.trim() &&
        form.newPassword !== form.confirmPassword
      ) {
        nextErrors.confirmPassword = "Password confirmation does not match.";
      }
      if (
        form.currentPassword.trim() &&
        form.newPassword.trim() &&
        form.currentPassword === form.newPassword
      ) {
        nextErrors.newPassword = "New password must be different from current password.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    const payload: UpdateMyAccountRequest = {};

    if (trimmedName !== user.name) {
      payload.name = trimmedName;
    }

    if (trimmedEmail !== (user.email ?? "")) {
      payload.email = trimmedEmail || null;
    }

    if (passwordTouched) {
      payload.current_password = form.currentPassword;
      payload.new_password = form.newPassword;
      payload.new_password_confirmation = form.confirmPassword;
    }

    if (Object.keys(payload).length === 0) {
      toast("No changes to save.");
      return;
    }

    try {
      const result = await updateMyAccount(payload).unwrap();
      dispatch(setUser(result.user));

      const storedAuth = loadStoredAuth();
      if (storedAuth) {
        saveStoredAuth({ ...storedAuth, user: result.user });
      }

      setForm({
        name: result.user.name ?? "",
        email: result.user.email ?? "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setFieldErrors({});
      toast.success("Account updated successfully.");
    } catch (error) {
      const { message, fieldErrors: nextFieldErrors } = getAccountErrorDetails(error);
      setFieldErrors(nextFieldErrors);
      toast.error(message);
    }
  }

  if (isFetching && !user) {
    return (
      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
        <div className="h-[520px] animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-8 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
          My Account
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-(--color-text-muted)">
          Your account information could not be loaded right now.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-white transition hover:bg-(--color-primary-dark)"
        >
          <FiRefreshCw className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
          My Account
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
          Update your name, email, and password from one place. Password changes are optional and only submitted when those fields are filled.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) text-[40px] font-semibold text-(--color-bg) shadow-[0_18px_40px_rgba(44,95,138,0.24)]">
              {getInitials(user.name)}
            </div>

            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              {user.name}
            </h2>
            <p className="mt-2 rounded-full bg-(--color-primary-100) px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Account Settings
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <InfoCard
              icon={<FiMail className="text-[18px]" />}
              label="Email"
              value={user.email || "Not added"}
            />
            <InfoCard
              icon={<FiPhone className="text-[18px]" />}
              label="Phone"
              value={user.mobile_number || "Not added"}
            />
            <InfoCard
              icon={<FiShield className="text-[18px]" />}
              label="Status"
              value={statusLabel}
            />
            <InfoCard
              icon={<FiClock className="text-[18px]" />}
              label="Updated"
              value={new Date(user.updated_at).toLocaleString("en-BD")}
            />
          </div>
        </aside>

        <section className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)] md:p-7 xl:p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
              <FiUser className="text-[20px]" />
            </div>
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                Personal Information
              </h2>
              <p className="text-sm text-(--color-text-muted)">
                Only name and email are editable here. Mobile number is read-only from account data.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-medium text-(--color-dark)">Full Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
              {fieldErrors.name ? (
                <p className="text-sm text-(--color-danger)">{fieldErrors.name}</p>
              ) : null}
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">Email Address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
              {fieldErrors.email ? (
                <p className="text-sm text-(--color-danger)">{fieldErrors.email}</p>
              ) : null}
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">Phone Number</span>
              <input
                type="tel"
                value={user.mobile_number ?? ""}
                readOnly
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-[#f8fafc] px-4 text-(--color-dark) outline-none"
              />
            </label>
          </div>

          <div className="mt-10 rounded-[24px] border border-(--color-border) bg-[#f8fafc] p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                <FiLock className="text-[18px]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-dark)">Password Change</h3>
                <p className="mt-1 text-sm leading-7 text-(--color-text-muted)">
                  Leave these fields empty if you do not want to change your password.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm md:col-span-2">
                <span className="font-medium text-(--color-dark)">Current Password</span>
                <input
                  type="password"
                  value={form.currentPassword}
                  onChange={(event) => updateField("currentPassword", event.target.value)}
                  placeholder="Enter current password"
                  className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
                />
                {fieldErrors.currentPassword ? (
                  <p className="text-sm text-(--color-danger)">{fieldErrors.currentPassword}</p>
                ) : null}
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-(--color-dark)">New Password</span>
                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(event) => updateField("newPassword", event.target.value)}
                  placeholder="Enter new password"
                  className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
                />
                {fieldErrors.newPassword ? (
                  <p className="text-sm text-(--color-danger)">{fieldErrors.newPassword}</p>
                ) : null}
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-(--color-dark)">Confirm New Password</span>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  placeholder="Confirm new password"
                  className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
                />
                {fieldErrors.confirmPassword ? (
                  <p className="text-sm text-(--color-danger)">{fieldErrors.confirmPassword}</p>
                ) : null}
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-8 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-9 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark) disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave className="mr-2 text-[16px]" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {!fieldErrors.form ? null : (
            <div className="mt-5 rounded-[18px] border border-[#f6ccd4] bg-[#fff7f8] px-4 py-3 text-sm text-[#b5475a]">
              {fieldErrors.form}
            </div>
          )}

          <div className="mt-8 rounded-[20px] border border-[#d3ece4] bg-[#f4fbf8] px-4 py-4 text-sm leading-7 text-[#2b5f54]">
            <div className="flex items-start gap-3">
              <FiCheckCircle className="mt-1 shrink-0 text-[18px]" />
              <p>
                Basic account fields and password change are sent to the same endpoint. If you fill any password field, all three password fields are submitted together.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
