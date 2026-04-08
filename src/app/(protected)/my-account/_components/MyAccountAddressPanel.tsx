"use client";

import { useMemo, useState } from "react";
import { FiArrowLeft, FiEdit2, FiMapPin, FiPlus } from "react-icons/fi";
import AddressDetailsForm, {
  getAddressLabelName,
  type AddressFormValue,
} from "@/components/shared/AddressDetailsForm";

type SavedAddress = {
  id: number;
  title: string;
  fullName: string;
  phone: string;
  districtId: string;
  zoneId: string;
  areaId: string;
  addressLine: string;
  note: string;
  label: AddressFormValue["label"];
};

const emptyAddressForm: AddressFormValue = {
  fullName: "",
  phone: "",
  districtId: "",
  zoneId: "",
  areaId: "",
  addressLine: "",
  note: "",
  label: "home",
};

const mockAddresses: SavedAddress[] = [
  {
    id: 1,
    title: "Home Address",
    fullName: "Andgate User",
    phone: "01700-000001",
    districtId: "1",
    zoneId: "52",
    areaId: "12520",
    addressLine: "House 12, Road 7, Adabor",
    note: "Call before delivery",
    label: "home",
  },
  {
    id: 2,
    title: "Office Address",
    fullName: "Andgate Office",
    phone: "01700-000002",
    districtId: "1",
    zoneId: "18",
    areaId: "17825",
    addressLine: "Level 5, Business Hub, Agargaon",
    note: "Deliver during office hours",
    label: "office",
  },
];

function AddressCard({
  address,
  onChange,
}: {
  address: SavedAddress;
  onChange: (address: SavedAddress) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-(--color-border) bg-(--color-bg) shadow-[0_18px_40px_rgba(17,17,17,0.04)]">
      <div className="flex items-center justify-between gap-4 border-b border-(--color-border) px-5 py-4">
        <div className="flex items-center gap-3">
          <FiMapPin className="text-[24px] text-(--color-dark)" />
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-(--color-dark)">
            {address.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onChange(address)}
          className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg) px-4 py-2 text-sm font-semibold text-(--color-dark) transition hover:border-(--color-primary) hover:text-(--color-primary)"
        >
          <FiEdit2 />
          <span>Change</span>
        </button>
      </div>

      <div className="space-y-2 px-5 py-5 text-[15px] leading-8 text-(--color-dark)">
        <p>{address.fullName}</p>
        <p>{address.phone}</p>
        <p>{address.addressLine}</p>
        {address.note ? <p className="text-(--color-text-muted)">{address.note}</p> : null}
      </div>
    </article>
  );
}

export default function MyAccountAddressPanel() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(mockAddresses);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formValue, setFormValue] = useState<AddressFormValue>(emptyAddressForm);

  const panelTitle = useMemo(() => {
    if (!isEditing) return "Address";
    return editingId ? "Change Address" : "Add New Address";
  }, [editingId, isEditing]);

  function handleAddNew() {
    setEditingId(null);
    setFormValue(emptyAddressForm);
    setIsEditing(true);
  }

  function handleEdit(address: SavedAddress) {
    setEditingId(address.id);
    setFormValue({
      fullName: address.fullName,
      phone: address.phone,
      districtId: address.districtId,
      zoneId: address.zoneId,
      areaId: address.areaId,
      addressLine: address.addressLine,
      note: address.note,
      label: address.label,
    });
    setIsEditing(true);
  }

  function handleSave() {
    const nextAddress: SavedAddress = {
      id: editingId ?? Date.now(),
      title: getAddressLabelName(formValue.label),
      fullName: formValue.fullName || "New Address",
      phone: formValue.phone || "Phone not added",
      districtId: formValue.districtId,
      zoneId: formValue.zoneId,
      areaId: formValue.areaId,
      addressLine: formValue.addressLine || "Address line not added",
      note: formValue.note,
      label: formValue.label,
    };

    setAddresses((current) =>
      editingId ? current.map((item) => (item.id === editingId ? nextAddress : item)) : [...current, nextAddress]
    );
    setIsEditing(false);
    setEditingId(null);
    setFormValue(emptyAddressForm);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditingId(null);
    setFormValue(emptyAddressForm);
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
            <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">
              {panelTitle}
            </h1>
          </div>
        </div>

        <AddressDetailsForm
          value={formValue}
          onChange={setFormValue}
          title="Shipping Address"
          description="Use the same address structure as checkout. This is mock for now and ready for future dynamic save."
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
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-9 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-(--color-dark)">Address</h1>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-(--color-primary) px-7 text-sm font-semibold text-(--color-bg) shadow-[0_10px_24px_rgba(44,95,138,0.18)] transition hover:bg-(--color-primary-dark)"
        >
          <FiPlus className="mr-2 text-[18px]" />
          Add New Address
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} onChange={handleEdit} />
        ))}
      </div>
    </div>
  );
}
