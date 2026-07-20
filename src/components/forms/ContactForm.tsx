"use client";

/* ============================================================
   ContactForm — the short form on the Contact page.
   ============================================================ */

import { CircleCheck } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import { useJsonForm } from "@/lib/useJsonForm";
import { contact } from "@/data/pages";
import FormField, { HoneypotField } from "@/components/FormField";
import Button from "@/components/Button";

export default function ContactForm() {
  const { status, errors, handleSubmit } = useJsonForm(
    contactSchema,
    "/api/contact"
  );

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CircleCheck className="h-10 w-10 text-primary" aria-hidden="true" />
        <p className="text-body-lg font-medium">{contact.form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <HoneypotField />
      <FormField
        label="Name"
        name="name"
        required
        autoComplete="name"
        error={errors.name}
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
        label="Message"
        name="message"
        type="textarea"
        required
        error={errors.message}
      />
      <div>
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : contact.form.button}
        </Button>
        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-error">
            {contact.form.error}
          </p>
        )}
      </div>
    </form>
  );
}
