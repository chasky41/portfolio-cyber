"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Mail, Phone } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

// ID Formspree facultatif (NEXT_PUBLIC_FORMSPREE_ID). Sans lui : repli sur mailto.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const field =
  "w-full rounded-lg border border-line bg-bg/60 px-3 py-2.5 text-sm text-fg outline-none transition focus:border-accent";

export function Contact() {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // piège anti-bot
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio · ${String(data.get("name") ?? "")}`);
      const body = encodeURIComponent(`${String(data.get("message") ?? "")}\n\n${String(data.get("email") ?? "")}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else setStatus("err");
    } catch {
      setStatus("err");
    }
  }

  const linkCls = "glass glass-hover flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium";

  return (
    <Section id="contact" title={t(ui.sections.contact)} eyebrow="./contact.sh">
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal className="space-y-3">
          <p className="mb-4 text-muted">{t(ui.contact.intro)}</p>
          <div className="glass flex items-center justify-between gap-3 px-4 py-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 break-all text-sm font-medium hover:text-accent-text">
              <Mail size={16} className="shrink-0 text-accent-text" aria-hidden="true" />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs hover:border-accent"
            >
              {copied ? <Check size={14} className="text-green-text" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              <span aria-live="polite">{copied ? t(ui.contact.copied) : t(ui.contact.copy)}</span>
            </button>
          </div>
          {profile.showPhone && profile.phone && (
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={linkCls}>
              <span className="flex items-center gap-2">
                <Phone size={16} className="text-accent-text" aria-hidden="true" /> {t(ui.contact.phone)} · {profile.phone}
              </span>
            </a>
          )}
          {[
            ["LinkedIn", profile.linkedin],
            ["GitHub", profile.github],
            ["TryHackMe", profile.tryhackme],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {label}
              <ExternalLink size={14} className="text-muted" aria-hidden="true" />
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass space-y-4 p-5" noValidate={false}>
            <div>
              <label htmlFor="c-name" className="mb-1 block text-sm font-medium">
                {t(ui.contact.name)}
              </label>
              <input id="c-name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1 block text-sm font-medium">
                {t(ui.contact.email)}
              </label>
              <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1 block text-sm font-medium">
                {t(ui.contact.message)}
              </label>
              <textarea id="c-msg" name="message" rows={5} required className={field} />
            </div>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? t(ui.contact.sending) : FORMSPREE_ID ? t(ui.contact.send) : t(ui.contact.mailto)}
            </button>
            <p role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === "ok" && <span className="text-green-text">{t(ui.contact.ok)}</span>}
              {status === "err" && <span className="text-[#ff8a80]">{t(ui.contact.err)}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
