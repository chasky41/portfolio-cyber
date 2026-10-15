import { Reveal } from "./Reveal";

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-text">{eyebrow}</p>}
        <h2 id={`${id}-title`} className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="circuit -mt-5 mb-8 w-40" aria-hidden="true" />
      </Reveal>
      {children}
    </section>
  );
}

export function Badge({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "green" | "muted" }) {
  const tones = {
    accent: "border-accent/40 bg-accent/10 text-accent-text",
    green: "border-green/50 bg-green/10 text-green-text",
    muted: "border-line bg-card text-muted",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs ${tones[tone]}`}>{children}</span>
  );
}
