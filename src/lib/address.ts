import type { AddressFormValue } from "@/components/shared/AddressDetailsForm";
import type { EcommerceAddressPayload, EcommerceOrderShippingAddress } from "@/types";

export const emptyAddressFormValue: AddressFormValue = {
  fullName: "",
  phone: "",
  districtId: "",
  districtName: "",
  zoneId: "",
  zoneName: "",
  areaId: "",
  areaName: "",
  addressLine: "",
  note: "",
  label: "home",
};

export function shippingAddressToFormValue(
  shippingAddress: EcommerceOrderShippingAddress | null,
): AddressFormValue {
  if (!shippingAddress) {
    return emptyAddressFormValue;
  }

  return {
    fullName: shippingAddress.name ?? "",
    phone: shippingAddress.phone ?? "",
    districtId: "",
    districtName: shippingAddress.city ?? "",
    zoneId: "",
    zoneName: shippingAddress.zone ?? "",
    areaId: "",
    areaName: shippingAddress.area ?? "",
    addressLine: shippingAddress.address_line ?? "",
    note: "",
    label: shippingAddress.type ?? "home",
  };
}

export function formValueToAddressPayload(
  formValue: AddressFormValue,
): EcommerceAddressPayload {
  return {
    type: formValue.label,
    label: null,
    name: formValue.fullName.trim(),
    phone: formValue.phone.trim(),
    address_line: formValue.addressLine.trim(),
    city: formValue.districtName.trim(),
    zone: formValue.zoneName.trim(),
    area: formValue.areaName.trim(),
    postal_code: "",
  };
}

export const formValueToShippingAddress = formValueToAddressPayload;

export function getAddressDisplayLines(
  shippingAddress: EcommerceOrderShippingAddress,
) {
  const locationLine = [shippingAddress.area, shippingAddress.zone, shippingAddress.city]
    .filter(Boolean)
    .join(", ");

  return {
    name: shippingAddress.name,
    phone: shippingAddress.phone,
    addressLine: shippingAddress.address_line,
    locationLine,
  };
}
