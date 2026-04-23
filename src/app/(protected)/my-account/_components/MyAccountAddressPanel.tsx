"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiRefreshCw,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import AddressDetailsForm from "@/components/shared/AddressDetailsForm";
import {
  useCreateMyAddressMutation,
  useDeleteMyAddressMutation,
  useGetMyAddressesQuery,
  useSetDefaultMyAddressMutation,
  useUpdateMyAddressMutation,
} from "@/features/account/myAddressApi";
import {
  emptyAddressFormValue,
  formValueToAddressPayload,
  getAddressDisplayLines,
  shippingAddressToFormValue,
} from "@/lib/address";
import type { EcommerceSavedAddress } from "@/types";

function getAddressErrorMessage(error: unknown) {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return "Address could not be saved.";
  }

  const responseData = (error as { data?: unknown }).data;

  if (!responseData || typeof responseData !== "object") {
    return "Address could not be saved.";
  }

  if ("message" in responseData && typeof responseData.message === "string" && responseData.message.trim()) {
    return responseData.message;
  }

  return "Address could not be saved.";
}

function getAddressTitle(address: EcommerceSavedAddress) {
  return address.label?.trim() || `${address.type.charAt(0).toUpperCase()}${address.type.slice(1)} Address`;
}

export default function MyAccountAddressPanel() {
  const { data, isFetching, isError, refetch } = useGetMyAddressesQuery();
  const [createMyAddress, { isLoading: isCreating }] = useCreateMyAddressMutation();
  const [updateMyAddress, { isLoading: isUpdating }] = useUpdateMyAddressMutation();
  const [setDefaultMyAddress, { isLoading: isSettingDefault }] = useSetDefaultMyAddressMutation();
  const [deleteMyAddress, { isLoading: isDeleting }] = useDeleteMyAddressMutation();
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formValue, setFormValue] = useState(emptyAddressFormValue);

  const addresses = useMemo(() => data?.addresses ?? [], [data?.addresses]);
  const editingAddress = addresses.find((address) => address.id === editingAddressId) ?? null;
  const isEditing = editingAddressId !== null;
  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (editingAddress) {
      setFormValue(shippingAddressToFormValue(editingAddress));
    }
  }, [editingAddress]);

  function handleAddNew() {
    setEditingAddressId(0);
    setFormValue(emptyAddressFormValue);
  }

  function handleEdit(address: EcommerceSavedAddress) {
    setEditingAddressId(address.id);
    setFormValue(shippingAddressToFormValue(address));
  }

  function handleCancel() {
    setEditingAddressId(null);
    setFormValue(emptyAddressFormValue);
  }

  async function handleSave() {
    if (!formValue.fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (!formValue.phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    if (!formValue.addressLine.trim()) {
      toast.error("Address line is required.");
      return;
    }

    if (!formValue.districtName.trim() || !formValue.zoneName.trim() || !formValue.areaName.trim()) {
      toast.error("District, zone, and area are required.");
      return;
    }

    const address = formValueToAddressPayload(formValue);

    try {
      if (editingAddressId && editingAddressId > 0) {
        await updateMyAddress({ id: editingAddressId, address }).unwrap();
      } else {
        await createMyAddress({
          ...address,
          is_default: addresses.length === 0,
        }).unwrap();
      }

      toast.success("Address saved successfully.");
      handleCancel();
    } catch (error) {
      toast.error(getAddressErrorMessage(error));
    }
  }

  async function handleSetDefault(id: number) {
    try {
      await setDefaultMyAddress(id).unwrap();
      toast.success("Default address updated.");
    } catch (error) {
      toast.error(getAddressErrorMessage(error));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteMyAddress(id).unwrap();
      toast.success("Address deleted successfully.");
    } catch (error) {
      toast.error(getAddressErrorMessage(error));
    }
  }

  if (isFetching && !data) {
    return (
      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-6 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
        <div className="h-[320px] animate-pulse rounded-[24px] bg-[linear-gradient(90deg,#f6f8fa_0%,#eef3f7_50%,#f6f8fa_100%)]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-[28px] border border-(--color-border) bg-(--color-bg) p-8 shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">My Address</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-(--color-text-muted)">
          Your saved addresses could not be loaded right now.
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

  if (isEditing) {
    return (
      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              <FiArrowLeft className="text-[22px]" />
            </button>
            <div>
              <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
                {editingAddress ? "Update Address" : "Add New Address"}
              </h1>
              <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                Saved addresses can be selected during checkout.
              </p>
            </div>
          </div>
        </div>

        <AddressDetailsForm
          value={formValue}
          onChange={setFormValue}
          title="My Address"
          description="Save this address to your address book."
          showNoteField={false}
        />

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-(--color-border) bg-(--color-bg) px-8 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-9 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark) disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave className="mr-2 text-[16px]" />
            {isSaving ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">My Address</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-(--color-text-muted)">
            Manage saved delivery addresses and choose one default address for checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
        >
          <FiPlus className="mr-2 text-[18px]" />
          Add New Address
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {addresses.map((address) => {
            const addressLines = getAddressDisplayLines(address);

            return (
              <article
                key={address.id}
                className="overflow-hidden rounded-[24px] border border-(--color-border) bg-(--color-bg) shadow-[0_18px_40px_rgba(17,17,17,0.04)]"
              >
                <div className="flex items-center justify-between gap-4 border-b border-(--color-border) px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                      <FiMapPin className="text-[20px]" />
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                        {getAddressTitle(address)}
                      </h2>
                      <p className="text-sm text-(--color-text-muted)">
                        {address.is_default ? "Default address" : "Saved address"}
                      </p>
                    </div>
                  </div>

                  {address.is_default ? (
                    <span className="inline-flex items-center rounded-full bg-[#eef6ef] px-3 py-1 text-xs font-semibold text-[#0d7a74]">
                      <FiCheckCircle className="mr-1" />
                      Default
                    </span>
                  ) : null}
                </div>

                <div className="space-y-2 px-5 py-5 text-[15px] leading-8 text-(--color-dark)">
                  <p className="font-semibold">{addressLines.name}</p>
                  <p>{addressLines.phone}</p>
                  <p>{addressLines.addressLine}</p>
                  <p className="text-(--color-text-muted)">{addressLines.locationLine}</p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-(--color-border) px-5 py-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-(--color-border) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit
                  </button>
                  {!address.is_default ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={isSettingDefault}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-(--color-border) px-4 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary) disabled:opacity-60"
                    >
                      Make Default
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleDelete(address.id)}
                    disabled={isDeleting}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-(--color-border) px-4 text-sm font-semibold text-(--color-danger) transition hover:border-(--color-danger) disabled:opacity-60"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-dashed border-(--color-border) bg-[#fbfcfd] px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
            <FiMapPin className="text-[24px]" />
          </div>
          <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
            No saved address yet
          </h2>
          <p className="mt-3 max-w-[520px] text-sm leading-7 text-(--color-text-muted)">
            Add a delivery address now. The first saved address becomes your default address automatically.
          </p>
        </section>
      )}
    </div>
  );
}
