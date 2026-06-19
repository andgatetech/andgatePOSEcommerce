"use client";

import { useMemo, useState } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";

const inputClass =
  "h-12 w-full rounded-xl border border-(--color-border) bg-white px-4 text-sm text-(--color-dark) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary-100) disabled:cursor-not-allowed disabled:bg-slate-50";

const labelClass = "mb-2 block text-sm font-bold text-(--color-primary-900)";

type SubmitState = "idle" | "submitting" | "success" | "error";

type PartnerApplicationFormProps = {
  partnerTypes: string[];
};

function getLeadEndpoint() {
  const configured = process.env.NEXT_PUBLIC_API_URL;

  if (!configured) {
    return "/api/leads/create";
  }

  return configured.replace(/\/api\/ecommerce\/?$/, "/api").replace(/\/$/, "") + "/leads/create";
}

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function buildNotes(formData: FormData) {
  const fields = [
    "Business Name",
    "WhatsApp Number",
    "Website",
    "Facebook Page",
    "Business Category",
    "Business Type",
    "Existing Physical Store",
    "Existing Online Store",
    "Years In Business",
    "Number Of Products",
    "Monthly Orders",
    "Current POS Software",
    "Interested In",
    "Division",
    "District",
    "Area",
    "Current Challenges",
    "Additional Notes",
  ];

  return fields
    .map((field) => {
      const fieldValue = value(formData, field);
      return fieldValue ? `${field}: ${fieldValue}` : null;
    })
    .filter(Boolean)
    .join("\n");
}

export default function PartnerApplicationForm({ partnerTypes }: PartnerApplicationFormProps) {
  const endpoint = useMemo(() => getLeadEndpoint(), []);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: value(formData, "Owner Name"),
      phone: value(formData, "Mobile Number"),
      email: value(formData, "Email"),
      business_name: value(formData, "Business Name"),
      company_name: value(formData, "Business Name"),
      business_type: value(formData, "Business Type") || value(formData, "Business Category"),
      business_location: [value(formData, "Area"), value(formData, "District"), value(formData, "Division")]
        .filter(Boolean)
        .join(", "),
      source: "Hawkeri Become Partner Page",
      campaign: "become-partner",
      utm_source: "hawkeri",
      utm_medium: "website",
      utm_campaign: "become_partner",
      notes: buildNotes(formData),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit partner application.");
      }

      setSubmitState("success");
      setMessage("Application submitted. Hawkeri team will contact you soon.");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit partner application.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-(--color-border) bg-white p-5 shadow-[0_24px_70px_rgba(2,58,92,0.10)] md:p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="business-name">Business Name</label>
          <input className={inputClass} id="business-name" name="Business Name" required disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="owner-name">Owner Name</label>
          <input className={inputClass} id="owner-name" name="Owner Name" required disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="mobile">Mobile Number</label>
          <input className={inputClass} id="mobile" name="Mobile Number" required disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="whatsapp">WhatsApp Number</label>
          <input className={inputClass} id="whatsapp" name="WhatsApp Number" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input className={inputClass} id="email" name="Email" type="email" required disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="website">Website</label>
          <input className={inputClass} id="website" name="Website" placeholder="Optional" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="facebook">Facebook Page</label>
          <input className={inputClass} id="facebook" name="Facebook Page" placeholder="Optional" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">Business Category</label>
          <select className={inputClass} id="category" name="Business Category" defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select category</option>
            {partnerTypes.slice(0, 12).map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="business-type">Business Type</label>
          <select className={inputClass} id="business-type" name="Business Type" defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select type</option>
            <option>Retail Store</option>
            <option>Manufacturer</option>
            <option>Wholesaler</option>
            <option>Distributor</option>
            <option>Home-Based Business</option>
            <option>Brand Owner</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="physical-store">Existing Physical Store</label>
          <select className={inputClass} id="physical-store" name="Existing Physical Store" defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select answer</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="online-store">Existing Online Store</label>
          <select className={inputClass} id="online-store" name="Existing Online Store" defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select answer</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="years">Years In Business</label>
          <input className={inputClass} id="years" name="Years In Business" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="products">Number Of Products</label>
          <input className={inputClass} id="products" name="Number Of Products" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="orders">Monthly Orders</label>
          <input className={inputClass} id="orders" name="Monthly Orders" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pos">Current POS Software</label>
          <input className={inputClass} id="pos" name="Current POS Software" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="interest">Interested In</label>
          <select className={inputClass} id="interest" name="Interested In" defaultValue="" disabled={isSubmitting}>
            <option value="" disabled>Select interest</option>
            <option>Hawkeri Marketplace</option>
            <option>AndgatePOS</option>
            <option>Both</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="division">Division</label>
          <input className={inputClass} id="division" name="Division" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="district">District</label>
          <input className={inputClass} id="district" name="District" disabled={isSubmitting} />
        </div>
        <div>
          <label className={labelClass} htmlFor="area">Area</label>
          <input className={inputClass} id="area" name="Area" disabled={isSubmitting} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="challenges">Current Challenges</label>
          <textarea className={`${inputClass} min-h-28 py-3`} id="challenges" name="Current Challenges" disabled={isSubmitting} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="notes">Additional Notes</label>
          <textarea className={`${inputClass} min-h-28 py-3`} id="notes" name="Additional Notes" disabled={isSubmitting} />
        </div>
      </div>

      {message ? (
        <div
          className={`mt-5 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            submitState === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role={submitState === "error" ? "alert" : "status"}
        >
          {submitState === "success" ? <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-cta) px-6 py-4 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(231,145,55,0.28)] transition hover:bg-(--color-cta-hover) disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
        <FiSend />
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-(--color-text-muted)">
        Your application is sent securely to the Hawkeri admin team for follow-up.
      </p>
    </form>
  );
}
