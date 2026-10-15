"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, Mail, Terminal as TerminalIcon } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { certifications, counters, cvs, profile, thmStats } from "@/data/profile";
import { siGithub } from "simple-icons";
import { Tilt } from "./Tilt";
import { readableColor, allTools } from "@/data/tools";
import { ui } from "@/data/ui";
import { Counter } from "./Counter";
import { TypedRoles } from "./TypedRoles";
import { Reveal } from "./Reveal";

export function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={siGithub.path} />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const orbitIds = ["kali", "burp", "python", "wireshark", "docker"];
const orbitTools = orbitIds.map((id) => allTools.find((t) => t.id === id)).filter((t): t is (typeof allTools)[number] & { path: string } => !!t?.path);

export function Hero() {
  const { t, lang } = useApp();
  const [imgOk, setImgOk] = useState(true);
  const secondary =
    "inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent-text";

  return (
    <section id="top" className="relative overflow-hidden" style={{ ["--scan-h" as string]: "640px" }}>
      <div className="scanline" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 md:grid-cols-[auto_1fr] md:gap-14">
        <Reveal className="mx-auto">
          <Tilt max={12}>
            <div className="relative mt-10 h-72 w-72 sm:h-80 sm:w-80" style={{ transform: "translateZ(40px)" }}>
              <p className="open-pill" role="status">
                <span className="led" aria-hidden="true" />
                {t(ui.hero.open)}
              </p>

              {/* Orbite : anneau en pointillés + outils qui tournent autour de la photo */}
              <div className="orbit-track" aria-hidden="true" />
              <div className="orbit" aria-hidden="true">
                {orbitTools.map((tool, i) => (
                  <div key={tool.id} className="orbit-item" style={{ ["--a" as string]: `${(360 / orbitTools.length) * i + 20}deg` }}>
                    <div className="orbit-pos" style={{ ["--a" as string]: `${(360 / orbitTools.length) * i + 20}deg` }}>
                      <span className="orbit-icon" title={tool.label}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill={readableColor(tool.hex)}>
                          <path d={tool.path} />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute inset-[15%]">
                <div className="ring absolute inset-0 rounded-full" aria-hidden="true" />
                <div className="absolute inset-[4px] overflow-hidden rounded-full bg-elev">
                  {imgOk ? (
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      priority
                      unoptimized
                      sizes="(min-width: 640px) 220px, 200px"
                      className="object-cover"
                      onError={() => setImgOk(false)}
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-mono text-5xl font-bold text-accent-text">CB</div>
                  )}
                </div>
                <span className="online-dot" role="img" aria-label={t(ui.hero.online)} title={t(ui.hero.online)} />
              </div>
            </div>
          </Tilt>
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 rounded-md border border-green/40 bg-green/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-green-text">
              <span className="led" aria-hidden="true" />
              {t(ui.hero.status)}
            </p>
            <p className="mb-2 font-mono text-sm text-accent-text">{t(ui.hero.greeting)}</p>
            <h1 className="neon text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{profile.name}</h1>
            <p className="mt-3 min-h-8 text-xl text-accent-text sm:text-2xl" aria-live="off">
              <span className="mr-2 font-mono text-green-text" aria-hidden="true">
                &gt;
              </span>
              <TypedRoles key={lang} roles={profile.roles[lang]} />
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:mx-0">{t(profile.tagline)}</p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-green/50 bg-green/10 px-4 py-2 text-sm font-medium text-green-text">
              <span className="h-2 w-2 rounded-full bg-green" aria-hidden="true" />
              {t(profile.availability)}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href={cvs[0].file}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-110"
              >
                <Download size={16} aria-hidden="true" />
                {t(ui.hero.cv)}
              </a>
              <a href="#contact" className={secondary}>
                <Mail size={16} aria-hidden="true" />
                {t(ui.hero.contact)}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent-text shadow-[0_0_18px_-4px_var(--glow)] transition hover:bg-accent/20"
              >
                <GithubIcon />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
                <LinkedInIcon />
                LinkedIn
              </a>
              <a href={profile.tryhackme} target="_blank" rel="noopener noreferrer" className={`${secondary} hover:!border-green`}>
                <TerminalIcon size={16} aria-hidden="true" />
                TryHackMe
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <Reveal>
          <div className="glass p-4 sm:p-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent-text">{t(ui.hero.dashboard)}</p>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {counters.map((c) => (
                <div key={c.label.fr} className="rounded-lg border border-line bg-bg/40 p-3 text-center">
                  <dd className="font-mono text-3xl font-bold text-accent-text sm:text-4xl">
                    <Counter value={c.value} />
                  </dd>
                  <dt className="mt-1 text-xs text-muted sm:text-sm">{t(c.label)}</dt>
                </div>
              ))}
              <div className="rounded-lg border border-line bg-bg/40 p-3 text-center">
                <dd className="font-mono text-3xl font-bold text-green-text sm:text-4xl">
                  <Counter value={certifications.filter((c) => c.status === "done").length} />
                  <span className="text-lg text-muted"> +{certifications.filter((c) => c.status === "ongoing").length}</span>
                </dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">{t(ui.hero.certs)}</dt>
              </div>
              <div className="rounded-lg border border-line bg-bg/40 p-3 text-center sm:col-span-1">
                <dd className="font-mono text-xl font-bold text-accent-text sm:text-2xl">M2 OPSIE</dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">Lyon 2 · SecNumÉdu</dt>
              </div>
              {(
                [
                  ["THM Rank", thmStats.rank],
                  [t(ui.hero.rooms), thmStats.rooms],
                  ["THM Badges", thmStats.badges],
                  ["THM Streak", thmStats.streak],
                ] as const
              )
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-green/40 bg-green/5 p-3 text-center">
                    <dd className="font-mono text-2xl font-bold text-green-text">{v}</dd>
                    <dt className="mt-1 text-xs text-muted sm:text-sm">{k}</dt>
                  </div>
                ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
