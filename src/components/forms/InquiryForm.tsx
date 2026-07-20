"use client";

/* ============================================================
   InquiryForm — the full Work With Us form. Field rules live
   in src/lib/validation.ts (shared with the API route);
   dropdown options come from site.ts and validation.ts.
   ============================================================ */

import { CircleCheck } from "lucide-react";
import {
  inquirySchema,
  collaborationTypes,
  contactPreferences,
} from "@/lib/validation";
import { useJsonForm } from "@/lib/useJsonForm";
import { audiences } from "@/data/site";
import { workWithUs } from "@/data/pages";
import FormField, { HoneypotField } from "@/components/FormField";
import Button from "@/components/Button";

export default function InquiryForm() {
  const { status, errors, handleSubmit } = useJsonForm(
    inquirySchema,
    "/api/inquiry"
  );

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CircleCheck className="h-10 w-10 text-primary" aria-hidden="true" />
        <p className="max-w-md text-body-lg font-medium">
          {workWithUs.form.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <HoneypotField />

      <FormField
        label="Business Name"
        name="businessName"
        required
        autoComplete="organization"
        error={errors.businessName}
      />
      <FormField
        label="Owner / Contact Name"
        name="ownerName"
        required
        autoComplete="name"
        error={errors.ownerName}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={errors.phone}
      />
      <FormField
        label="Instagram Handle"
        name="instagram"
        placeholder="@yourbusiness"
        error={errors.instagram}
      />
      <FormField
        label="Website"
        name="website"
        placeholder="yourbusiness.com"
        error={errors.website}
      />
      <FormField
        label="Business Category"
        name="category"
        type="select"
        options={audiences}
        placeholder="Choose a category…"
        required
        error={errors.category}
      />
      <FormField
        label="What type of collaboration interests you?"
        name="collaboration"
        type="select"
        options={collaborationTypes}
        placeholder="Choose one…"
        required
        error={errors.collaboration}
      />

      <div className="sm:col-span-2">
        <FormField
          label="Tell us about your business"
          name="about"
          type="textarea"
          required
          error={errors.about}
        />
      </div>
      <div className="sm:col-span-2">
        <FormField
          label="What are you hoping to accomplish?"
          name="goals"
          type="textarea"
          rows={4}
          required
          error={errors.goals}
        />
      </div>

      <FormField
        label="How did you hear about us?"
        name="referral"
        error={errors.referral}
      />
      <FormField
        label="Best way to contact you"
        name="contactPreference"
        type="select"
        options={contactPreferences}
        placeholder="Choose one…"
        required
        error={errors.contactPreference}
      />

      <div className="mt-2 sm:col-span-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : workWithUs.form.button}
        </Button>
        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-error">
            {workWithUs.form.error}
          </p>
        )}
      </div>
    </form>
  );
}
