"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { FiMapPin } from "react-icons/fi";
import {
  useGetPathaoAreasQuery,
  useGetPathaoCitiesQuery,
  useGetPathaoZonesQuery,
} from "@/features/locations/locationApi";

export const addressSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid BD mobile number (e.g. 01712345678)"),
  districtId: z.string().min(1, "Please select a district"),
  districtName: z.string(),
  zoneId: z.string().min(1, "Please select a zone"),
  zoneName: z.string(),
  areaId: z.string().min(1, "Please select an area"),
  areaName: z.string(),
  addressLine: z.string().min(5, "Address line must be at least 5 characters"),
  note: z.string(),
  label: z.enum(["home", "office", "other"]),
});

export type AddressFormValue = z.infer<typeof addressSchema>;

type AddressDetailsFormProps = {
  value: AddressFormValue;
  onChange: (nextValue: AddressFormValue) => void;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showNoteField?: boolean;
  className?: string;
};

const addressTypeOptions: Array<{ id: AddressFormValue["label"]; label: string }> = [
  { id: "home", label: "Home Address" },
  { id: "office", label: "Office Address" },
  { id: "other", label: "Other" },
];

export function getAddressLabelName(label: AddressFormValue["label"]) {
  if (label === "office") return "Office Address";
  if (label === "other") return "Other";
  return "Home Address";
}

export default function AddressDetailsForm({
  value,
  onChange,
  title = "Delivery Address",
  description = "Select district, then zone, then area for the shipping address.",
  showHeader = true,
  showNoteField = true,
  className = "",
}: AddressDetailsFormProps) {
  const [touched, setTouched] = useState<Partial<Record<keyof AddressFormValue, boolean>>>({});
  const { data: cities = [], isFetching: loadingCities } = useGetPathaoCitiesQuery();
  const { currentData: zones = [], isFetching: loadingZones } = useGetPathaoZonesQuery(value.districtId, {
    skip: !value.districtId,
  });
  const { currentData: areas = [], isFetching: loadingAreas } = useGetPathaoAreasQuery(value.zoneId, {
    skip: !value.zoneId,
  });

  const fieldErrors = useMemo<Partial<Record<keyof AddressFormValue, string>>>(() => {
    const result = addressSchema.safeParse(value);
    if (result.success) return {};
    const errs: Partial<Record<keyof AddressFormValue, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof AddressFormValue;
      if (!errs[key]) errs[key] = issue.message;
    }
    return errs;
  }, [value]);

  function touch(field: keyof AddressFormValue) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function fieldError(field: keyof AddressFormValue) {
    return touched[field] ? fieldErrors[field] : undefined;
  }

  useEffect(() => {
    if (!value.districtId && value.districtName && cities.length > 0) {
      const matchedCity = cities.find(
        (city) => city.city_name.toLowerCase() === value.districtName.toLowerCase(),
      );

      if (matchedCity) {
        onChange({
          ...value,
          districtId: String(matchedCity.city_id),
          districtName: matchedCity.city_name,
        });
      }
    }
  }, [cities, onChange, value]);

  function updateField<Key extends keyof AddressFormValue>(field: Key, fieldValue: AddressFormValue[Key]) {
    onChange({ ...value, [field]: fieldValue });
  }

  function handleDistrictChange(nextDistrictId: string) {
    const selectedCity = cities.find((city) => String(city.city_id) === nextDistrictId);

    onChange({
      ...value,
      districtId: nextDistrictId,
      districtName: selectedCity?.city_name ?? "",
      zoneId: "",
      zoneName: "",
      areaId: "",
      areaName: "",
    });
  }

  function handleZoneChange(nextZoneId: string) {
    const selectedZone = zones.find((zone) => String(zone.zone_id) === nextZoneId);

    onChange({
      ...value,
      zoneId: nextZoneId,
      zoneName: selectedZone?.zone_name ?? "",
      areaId: "",
      areaName: "",
    });
  }

  useEffect(() => {
    if (!value.zoneId && value.zoneName && zones.length > 0) {
      const matchedZone = zones.find(
        (zone) => zone.zone_name.toLowerCase() === value.zoneName.toLowerCase(),
      );

      if (matchedZone) {
        onChange({
          ...value,
          zoneId: String(matchedZone.zone_id),
          zoneName: matchedZone.zone_name,
        });
      }
    }
  }, [onChange, value, zones]);

  useEffect(() => {
    if (!value.areaId && value.areaName && areas.length > 0) {
      const matchedArea = areas.find(
        (area) => area.area_name.toLowerCase() === value.areaName.toLowerCase(),
      );

      if (matchedArea) {
        onChange({
          ...value,
          areaId: String(matchedArea.area_id),
          areaName: matchedArea.area_name,
        });
      }
    }
  }, [areas, onChange, value]);

  return (
    <section className={`overflow-hidden rounded-[22px] border border-(--color-border) bg-(--color-bg) ${className}`}>
      {showHeader ? (
        <div className="flex items-center gap-3 border-b border-(--color-border) bg-[#f4f6f8] px-5 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary-100) text-(--color-primary)">
            <FiMapPin size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-(--color-dark)">{title}</h2>
            <p className="text-sm text-(--color-text-muted)">{description}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">Full Name</span>
          <input
            type="text"
            value={value.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            onBlur={() => touch("fullName")}
            placeholder="Enter customer name"
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary) ${fieldError("fullName") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          />
          {fieldError("fullName") && <p className="text-xs text-[#d2435b]">{fieldError("fullName")}</p>}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">Phone Number</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={() => touch("phone")}
            placeholder="01712345678"
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary) ${fieldError("phone") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          />
          {fieldError("phone") && <p className="text-xs text-[#d2435b]">{fieldError("phone")}</p>}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">District</span>
          <select
            value={value.districtId}
            onChange={(event) => handleDistrictChange(event.target.value)}
            onBlur={() => touch("districtId")}
            disabled={loadingCities}
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary) ${fieldError("districtId") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          >
            <option value="">{loadingCities ? "Loading districts..." : "Select district"}</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
          {fieldError("districtId") && <p className="text-xs text-[#d2435b]">{fieldError("districtId")}</p>}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">Zone</span>
          <select
            value={value.zoneId}
            onChange={(event) => handleZoneChange(event.target.value)}
            onBlur={() => touch("zoneId")}
            disabled={!value.districtId || loadingZones}
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition disabled:cursor-not-allowed disabled:bg-[#f8fafc] disabled:text-(--color-text-muted) focus:border-(--color-primary) ${fieldError("zoneId") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          >
            <option value="">
              {!value.districtId ? "Select district first" : loadingZones ? "Loading zones..." : "Select zone"}
            </option>
            {zones.map((zone) => (
              <option key={zone.zone_id} value={zone.zone_id}>
                {zone.zone_name}
              </option>
            ))}
          </select>
          {fieldError("zoneId") && <p className="text-xs text-[#d2435b]">{fieldError("zoneId")}</p>}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">Area</span>
          <select
            value={value.areaId}
            onChange={(event) => {
              const nextAreaId = event.target.value;
              const selectedArea = areas.find((area) => String(area.area_id) === nextAreaId);
              onChange({ ...value, areaId: nextAreaId, areaName: selectedArea?.area_name ?? "" });
            }}
            onBlur={() => touch("areaId")}
            disabled={!value.zoneId || loadingAreas}
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition disabled:cursor-not-allowed disabled:bg-[#f8fafc] disabled:text-(--color-text-muted) focus:border-(--color-primary) ${fieldError("areaId") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          >
            <option value="">
              {!value.zoneId ? "Select zone first" : loadingAreas ? "Loading areas..." : "Select area"}
            </option>
            {areas.map((area) => (
              <option key={area.area_id} value={area.area_id}>
                {area.area_name}
              </option>
            ))}
          </select>
          {fieldError("areaId") && <p className="text-xs text-[#d2435b]">{fieldError("areaId")}</p>}
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium text-(--color-dark)">Address Line</span>
          <input
            type="text"
            value={value.addressLine}
            onChange={(event) => updateField("addressLine", event.target.value)}
            onBlur={() => touch("addressLine")}
            placeholder="House, road, landmark"
            className={`h-13 w-full rounded-[16px] border bg-(--color-bg) px-4 text-(--color-dark) outline-none transition focus:border-(--color-primary) ${fieldError("addressLine") ? "border-[#d2435b]" : "border-(--color-border)"}`}
          />
          {fieldError("addressLine") && <p className="text-xs text-[#d2435b]">{fieldError("addressLine")}</p>}
        </label>

        {showNoteField ? (
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium text-(--color-dark)">Order Note</span>
            <textarea
              rows={4}
              value={value.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="Add delivery note or special instruction"
              className="w-full rounded-[16px] border border-(--color-border) bg-(--color-bg) px-4 py-3 text-(--color-dark) outline-none transition focus:border-(--color-primary)"
            />
          </label>
        ) : null}

        <div className="space-y-3 md:col-span-2">
          <span className="text-sm font-medium text-(--color-dark)">Address Type</span>
          <div className="flex flex-wrap items-center gap-6">
            {addressTypeOptions.map((option) => (
              <label key={option.id} className="inline-flex items-center gap-3 text-sm text-(--color-dark)">
                <input
                  type="radio"
                  name="addressType"
                  checked={value.label === option.id}
                  onChange={() => updateField("label", option.id)}
                  className="h-5 w-5 accent-(--color-primary)"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
