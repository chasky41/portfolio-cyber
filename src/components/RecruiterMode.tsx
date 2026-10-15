"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck, Download, ExternalLink, MapPin, Target, X } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { cvs, profile, recruiter } from "@/data/profile";
import { ui } from "@/data/ui";

export function RecruiterMode() {
  const { recruiter: open, setRecruiter, t, lang } = useApp();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRecruiter(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, setRecruiter]);

  if (!open) return null;

  const link = "inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-2 text-sm hover:border-accent hover:text-accent-text";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-bg/90 p-4 backdrop-blur-md sm:p-8"
      onClick={(e) => e.target === e.currentTarget && setRecruiter(false)}
    >
      <div className="glass mx-auto max-w-3xl !bg-elev p-5 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-green-text">{t(ui.recruiter.title)}</p>
            <h2 id="recruiter-title" className="mt-1 text-2xl font-bold sm:text-3xl">
              {profile.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setRecruiter(false)}
            aria-label={t(ui.recruiter.close)}
            className="rounded-lg border border-line p-2 hover:border-accent"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <section aria-labelledby="rm-target" className="mb-5">
          <h3 id="rm-target" className="mb-1 flex items-center gap-2 font-mono text-sm text-accent-text">
            <Target size={16} aria-hidden="true" /> {t(ui.recruiter.target)}
          </h3>
          <p>{t(profile.target)}</p>
        </section>

        <section aria-labelledby="rm-strengths" className="mb-5">
          <h3 id="rm-strengths" className="mb-2 font-mono text-sm text-accent-text">
            {t(ui.recruiter.strengths)}
          </h3>
          <ol className="space-y-2">
            {recruiter.strengths[lang].map((s, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-line bg-card p-3">
                <span className="font-mono font-bold text-green-text">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="rm-avail" className="mb-5">
          <h3 id="rm-avail" className="mb-1 flex items-center gap-2 font-mono text-sm text-accent-text">
            <CalendarCheck size={16} aria-hidden="true" /> {t(ui.recruiter.availability)}
          </h3>
          <p>
            {t(ui.recruiter.start)} · <MapPin size={14} className="mb-0.5 inline" aria-hidden="true" /> {t(ui.recruiter.mobility)} · {t(profile.license)}
          </p>
        </section>

        <section aria-labelledby="rm-links">
          <h3 id="rm-links" className="mb-2 font-mono text-sm text-accent-text">
            {t(ui.recruiter.links)}
          </h3>
          <div className="flex flex-wrap gap-2">
            <a className={link} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className={link} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a className={link} href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a className={link} href={profile.tryhackme} target="_blank" rel="noopener noreferrer">
              TryHackMe <ExternalLink size={13} aria-hidden="true" />
            </a>
            {cvs.map((c) => (
              <a key={c.id} className={`${link} !border-accent/50 !bg-accent/10`} href={c.file} download>
                <Download size={14} aria-hidden="true" /> {t(c.label)}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
