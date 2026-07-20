/* ============================================================
   FormField — label + input (or textarea / select) + inline
   error message. Used by all three forms so every field looks
   and behaves the same.

   HoneypotField is the hidden anti-spam field — bots fill it
   in, humans never see it, the API discards anything that has
   a value in it.
   ============================================================ */

export const inputClasses =
  "w-full rounded-input border border-sand bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-error";

type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: readonly string[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
  autoComplete?: string;
  error?: string;
};

export default function FormField({
  label,
  name,
  type = "text",
  options,
  placeholder,
  required,
  rows = 5,
  autoComplete,
  error,
}: FormFieldProps) {
  const errorId = `${name}-error`;
  const shared = {
    id: name,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: inputClasses,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {!required && (
          <span className="ml-1.5 text-xs font-normal text-ink-soft/70">
            (optional)
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea {...shared} rows={rows} placeholder={placeholder} />
      ) : type === "select" ? (
        <select {...shared} defaultValue="">
          <option value="" disabled>
            {placeholder ?? "Choose one…"}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...shared}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      )}

      {error && (
        <p id={errorId} className="text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website_url">Leave this field empty</label>
      <input
        id="website_url"
        name="website_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
