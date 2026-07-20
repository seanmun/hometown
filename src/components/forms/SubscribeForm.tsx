"use client";

/* ============================================================
   SubscribeForm — the compact newsletter signup that lives in
   the green "Stay in the Loop" bar. Adds the subscriber to
   the Resend audience via /api/subscribe.
   ============================================================ */

import { CircleCheck } from "lucide-react";
import { subscribeSchema } from "@/lib/validation";
import { useJsonForm } from "@/lib/useJsonForm";
import { home } from "@/data/pages";
import { inputClasses, HoneypotField } from "@/components/FormField";
import Button from "@/components/Button";

export default function SubscribeForm() {
  const { status, errors, handleSubmit } = useJsonForm(
    subscribeSchema,
    "/api/subscribe"
  );

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-cream">
        <CircleCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
        {home.newsletter.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl">
      <HoneypotField />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <input
            name="name"
            type="text"
            autoComplete="name"
            aria-label="Your name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            className={inputClasses}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-cream">{errors.name}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-label="Your email"
            placeholder="Your email"
            aria-invalid={errors.email ? true : undefined}
            className={inputClasses}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-cream">{errors.email}</p>
          )}
        </div>
        <Button type="submit" variant="light" disabled={status === "submitting"}>
          {status === "submitting" ? "Subscribing…" : home.newsletter.button}
        </Button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs font-medium text-cream">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
