"use client";

import { useState } from "react";
import { FiCamera, FiMail, FiPhone, FiShield, FiUser } from "react-icons/fi";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const initialProfile: ProfileForm = {
  firstName: "Andgate",
  lastName: "User",
  email: "user@andgate.com",
  phone: "01700-123456",
  username: "andgateuser",
  password: "",
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

export default function MyAccountProfilePanel() {
  const [form, setForm] = useState<ProfileForm>(initialProfile);

  function updateField<Key extends keyof ProfileForm>(field: Key, value: ProfileForm[Key]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
          My Account
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
          Manage your personal information, account credentials and profile details here. This is a production-ready mock layout for now and can be connected to dynamic user data later.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) text-[40px] font-semibold text-(--color-bg) shadow-[0_18px_40px_rgba(44,95,138,0.24)]">
                AU
              </div>
              <button
                type="button"
                className="absolute bottom-2 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-(--color-cta) text-(--color-bg) shadow-[0_10px_24px_rgba(216,137,31,0.28)] transition hover:bg-(--color-cta-hover)"
              >
                <FiCamera className="text-[18px]" />
              </button>
            </div>

            <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
              {form.firstName} {form.lastName}
            </h2>
            <p className="mt-1 text-sm font-medium text-(--color-primary)">@{form.username}</p>
            <p className="mt-4 rounded-full bg-(--color-primary-100) px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Personal Profile
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <InfoCard icon={<FiMail className="text-[18px]" />} label="Email" value={form.email} />
            <InfoCard icon={<FiPhone className="text-[18px]" />} label="Phone" value={form.phone} />
            <InfoCard icon={<FiShield className="text-[18px]" />} label="Status" value="Account Verified" />
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
                Update your contact details and login credentials.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">First Name</span>
              <input
                type="text"
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">Last Name</span>
              <input
                type="text"
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">Email Address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium text-(--color-dark)">Phone Number</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
            </label>

            <label className="space-y-2 text-sm md:col-span-2">
              <span className="font-medium text-(--color-dark)">Username</span>
              <input
                type="text"
                value={form.username}
                onChange={(event) => updateField("username", event.target.value)}
                className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
              />
            </label>
          </div>

          <div className="mt-10 rounded-[24px] border border-(--color-border) bg-[#f8fafc] p-5 md:p-6">
            <h3 className="text-lg font-semibold text-(--color-dark)">Security</h3>
            <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
              Change your password here. This mock is ready for future secure API integration.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-medium text-(--color-dark)">New Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Enter new password"
                  className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-medium text-(--color-dark)">Confirm Password</span>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => updateField("confirmPassword", event.target.value)}
                  placeholder="Confirm new password"
                  className="h-13 w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-8 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-9 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
