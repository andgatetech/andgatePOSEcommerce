"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiRefreshCw,
  FiSave,
} from "react-icons/fi";
import AddressDetailsForm from "@/components/shared/AddressDetailsForm";
import { useGetMyAddressQuery, useUpdateMyAddressMutation } from "@/features/account/myAddressApi";
import {
  emptyAddressFormValue,
  formValueToShippingAddress,
  getAddressDisplayLines,
  shippingAddressToFormValue,
} from "@/lib/address";

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

export default function MyAccountAddressPanel() {
  const { data, isFetching, isError, refetch } = useGetMyAddressQuery();
  const [updateMyAddress, { isLoading: isSaving }] = useUpdateMyAddressMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formValue, setFormValue] = useState(emptyAddressFormValue);

  const savedAddress = data?.shipping_address ?? null;
  const addressLines = useMemo(
    () => (savedAddress ? getAddressDisplayLines(savedAddress) : null),
    [savedAddress],
  );

  useEffect(() => {
    if (!isEditing) {
      setFormValue(shippingAddressToFormValue(savedAddress));
    }
  }, [isEditing, savedAddress]);

  function handleAddNew() {
    setFormValue(savedAddress ? shippingAddressToFormValue(savedAddress) : emptyAddressFormValue);
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setFormValue(shippingAddressToFormValue(savedAddress));
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

    try {
      await updateMyAddress({
        shipping_address: formValueToShippingAddress(formValue),
      }).unwrap();
      toast.success("Address saved successfully.");
      setIsEditing(false);
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
          Your saved address could not be loaded right now.
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
                {savedAddress ? "Update Address" : "Add New Address"}
              </h1>
              <p className="mt-2 text-sm leading-7 text-(--color-text-muted)">
                Save one default shipping address for faster checkout.
              </p>
            </div>
          </div>
        </div>

        <AddressDetailsForm
          value={formValue}
          onChange={setFormValue}
          title="My Address"
          description="This saved address will be available automatically on checkout."
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
            Save one default shipping address for checkout. You can update it anytime.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
        >
          {savedAddress ? <FiEdit2 className="mr-2 text-[18px]" /> : <FiPlus className="mr-2 text-[18px]" />}
          {savedAddress ? "Change Address" : "Add New Address"}
        </button>
      </div>

      {savedAddress && addressLines ? (
        <article className="overflow-hidden rounded-[24px] border border-(--color-border) bg-(--color-bg) shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
          <div className="flex items-center justify-between gap-4 border-b border-(--color-border) px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
                <FiMapPin className="text-[20px]" />
              </div>
              <div>
                <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-(--color-dark)">
                  Default Shipping Address
                </h2>
                <p className="text-sm text-(--color-text-muted)">
                  Used automatically in checkout unless you choose another address there.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-5 py-5 md:grid-cols-2">
            <div className="space-y-2 text-[15px] leading-8 text-(--color-dark)">
              <p className="font-semibold">{addressLines.name}</p>
              <p>{addressLines.phone}</p>
              <p>{addressLines.addressLine}</p>
              <p className="text-(--color-text-muted)">{addressLines.locationLine}</p>
            </div>
            <div className="rounded-[20px] border border-(--color-border) bg-[#fbfcfd] p-5 text-sm leading-7 text-(--color-text-muted)">
              Keep this address up to date so checkout can load faster and skip the Pathao selectors unless you need to change the delivery location.
            </div>
          </div>
        </article>
      ) : (
        <section className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-dashed border-(--color-border) bg-[#fbfcfd] px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
            <FiMapPin className="text-[24px]" />
          </div>
          <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.03em] text-(--color-dark)">
            No saved address yet
          </h2>
          <p className="mt-3 max-w-[520px] text-sm leading-7 text-(--color-text-muted)">
            Add one default shipping address now. Checkout will use it automatically later.
          </p>
        </section>
      )}
    </div>
  );
}
