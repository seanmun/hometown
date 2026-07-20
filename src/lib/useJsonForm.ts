"use client";

/* ============================================================
   useJsonForm — shared submit logic for all three forms.
   Validates with the same zod schema the API uses, shows
   inline field errors, then POSTs JSON to the API route.
   ============================================================ */

import { useState, type FormEvent } from "react";
import { z } from "zod";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function useJsonForm(schema: z.ZodType, endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget));

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const { fieldErrors } = z.flattenError(parsed.error);
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors as Record<string, string[] | undefined>)
            .filter(([, messages]) => messages && messages.length > 0)
            .map(([field, messages]) => [field, messages![0]])
        )
      );
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, errors, handleSubmit };
}
