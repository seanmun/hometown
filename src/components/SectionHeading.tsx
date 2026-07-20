/* ============================================================
   SectionHeading — eyebrow label + serif heading + optional
   subline, used to open every section.
   ============================================================ */

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  sub?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  title,
  eyebrow,
  sub,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-display-md">{title}</h2>
      {sub && (
        <p
          className={`mt-3 max-w-2xl text-body-lg text-ink-soft ${
            centered ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
