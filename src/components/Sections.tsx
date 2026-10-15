"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Bug, Check, Download, ExternalLink, Factory, GitBranch, Radar, Scale, ShieldCheck, Terminal } from "lucide-react";
import { useApp } from "@/lib/app-context";
import {
  caseStudies,
  certifications,
  cvs,
  education,
  experiences,
  expertise,
  frameworks,
  levelLabels,
  matrixLabels,
  profile,
  projects,
  skillGroups,
  skillsMatrix,
  statusLabels,
  type MatrixLevel,
} from "@/data/profile";
import { ui } from "@/data/ui";
import { Badge, Section } from "./Section";
import { Reveal } from "./Reveal";
import { Tilt } from "./Tilt";

const icons = { "shield-check": ShieldCheck, scale: Scale, radar: Radar, bug: Bug, "git-branch": GitBranch, factory: Factory };

/* ---------------------------------------------------------------- À propos */
export function About() {
  const { t, lang } = useApp();
  return (
    <Section id="about" title={t(ui.sections.about)} eyebrow="whoami">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Reveal className="space-y-4 text-base leading-relaxed text-muted">
          {profile.about[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass space-y-5 p-5">
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-text">{t(ui.labels.qualities)}</h3>
              <div className="flex flex-wrap gap-2">
                {profile.qualities[lang].map((q) => (
                  <Badge key={q}>{q}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-text">{t(ui.labels.languages)}</h3>
              <ul className="space-y-1 text-sm text-muted">
                {profile.languages.map((x) => (
                  <li key={x.fr}>{t(x)}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted">
              {profile.city} · {t(profile.license)}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Expertise */
export function Expertise() {
  const { t, lang } = useApp();
  return (
    <Section id="expertise" title={t(ui.sections.expertise)} eyebrow="./domains">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {expertise.map((d, i) => {
          const Icon = icons[d.icon];
          return (
            <Reveal key={d.id} delay={(i % 3) * 0.07} className="h-full">
              <Tilt className="h-full"><article className="glass glass-hover flex h-full flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent-text">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <Badge tone={d.level === "enterprise" ? "green" : d.level === "project" ? "accent" : "muted"}>
                    {t(levelLabels[d.level])}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">{t(d.title)}</h3>
                <h4 className="mb-1 mt-4 font-mono text-xs uppercase tracking-wider text-accent-text">{t(ui.labels.did)}</h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
                  {d.did[lang].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {d.tools.length > 0 && (
                  <>
                    <h4 className="mb-2 mt-4 font-mono text-xs uppercase tracking-wider text-accent-text">{t(ui.labels.tools)}</h4>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {d.tools.map((x) => (
                        <Badge key={x} tone="muted">
                          {x}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </article></Tilt>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- Expériences */
export function Experience() {
  const { t, lang } = useApp();
  return (
    <Section id="experience" title={t(ui.sections.experience)} eyebrow="git log">
      <ol className="relative ml-3 border-l border-line">
        {experiences.map((e, i) => (
          <li key={e.org + e.period.fr} className="relative pb-10 pl-8 last:pb-0">
            <span
              className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
              aria-hidden="true"
            />
            <Reveal delay={i * 0.05}>
              <div className="glass glass-hover p-5">
                <p className="font-mono text-xs text-accent-text">{t(e.period)}</p>
                <h3 className="mt-1 text-lg font-semibold">{t(e.role)}</h3>
                <p className="text-sm text-muted">
                  {e.org} · {e.place}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
                  {e.bullets[lang].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.chips.map((c) => (
                    <Badge key={c.fr} tone="green">
                      {t(c)}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------------------------------------------------- Études de cas */
export function CaseStudies() {
  const { t } = useApp();
  return (
    <Section id="cases" title={t(ui.sections.cases)} eyebrow="case-studies/">
      <div className="grid gap-5 lg:grid-cols-3">
        {caseStudies.map((c, i) => (
          <Reveal key={c.title.fr} delay={i * 0.07} className="h-full">
            <Tilt className="h-full"><article className="glass glass-hover h-full p-5">
              <h3 className="mb-4 text-lg font-semibold">{t(c.title)}</h3>
              <dl className="space-y-3 text-sm">
                {(
                  [
                    [ui.labels.context, c.context],
                    [ui.labels.approach, c.approach],
                    [ui.labels.result, c.result],
                  ] as const
                ).map(([label, text]) => (
                  <div key={label.fr}>
                    <dt className="font-mono text-xs uppercase tracking-wider text-accent-text">{t(label)}</dt>
                    <dd className="mt-0.5 text-muted">{t(text)}</dd>
                  </div>
                ))}
              </dl>
            </article></Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------- Projets */
export function Projects() {
  const { t } = useApp();
  return (
    <Section id="projects" title={t(ui.sections.projects)} eyebrow="projects/">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title.fr} delay={(i % 2) * 0.07} className="h-full">
            <Tilt className="h-full"><article className="glass glass-hover flex h-full flex-col p-5">
              <p className="font-mono text-xs text-accent-text">{p.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{t(p.title)}</h3>
              <p className="mt-2 text-sm text-muted">{t(p.description)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <Badge key={tag} tone="muted">
                    {tag}
                  </Badge>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:underline"
                >
                  {t(ui.labels.code)} <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </article></Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------ Référentiels */
export function Frameworks() {
  const { t } = useApp();
  return (
    <Section id="frameworks" title={t(ui.sections.frameworks)} eyebrow="standards/">
      <Reveal>
        <ul className="flex flex-wrap gap-3">
          {frameworks.map((f) => (
            <li key={f} className="glass glass-hover flex items-center gap-2 px-4 py-3 font-mono text-sm">
              <ShieldCheck size={16} className="text-accent-text" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------------------------------------- Matrice */
export function SkillsMatrix() {
  const { t } = useApp();
  const cols: MatrixLevel[] = ["enterprise", "project", "notions"];
  return (
    <Section id="skills" title={t(ui.sections.skills)} eyebrow="skills.matrix">
      <Reveal>
        <div className="glass overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th scope="col" className="p-3 font-mono text-xs uppercase tracking-wider text-accent-text">
                  {t(ui.labels.domain)}
                </th>
                {cols.map((c) => (
                  <th key={c} scope="col" className="p-3 text-center font-mono text-xs uppercase tracking-wider text-accent-text">
                    {t(matrixLabels[c])}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillsMatrix.map((row) => (
                <tr key={row.domain.fr} className="border-b border-line last:border-0">
                  <th scope="row" className="p-3 text-left font-medium">
                    {t(row.domain)}
                  </th>
                  {cols.map((c) => (
                    <td key={c} className="p-3 text-center">
                      {row.level === c ? (
                        <>
                          <Check size={18} className="mx-auto text-green-text" aria-hidden="true" />
                          <span className="sr-only">{t(matrixLabels[c])}</span>
                        </>
                      ) : (
                        <span aria-hidden="true" className="text-muted">
                          ·
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal>
        <h3 className="mb-3 mt-10 font-mono text-sm uppercase tracking-widest text-accent-text">{t(ui.labels.allSkills)}</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title.fr} className="glass p-4">
              <h4 className="mb-2 font-semibold">{t(g.title)}</h4>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <Badge key={it} tone="muted">
                    {it}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------- Certifications */
function ThmQr() {
  const { t } = useApp();
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(profile.tryhackme, { margin: 1, width: 192, color: { dark: "#0b1a30", light: "#ffffff" } })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, []);
  if (!src) return <div className="h-24 w-24 shrink-0 rounded-lg bg-white/80" aria-hidden="true" />;
  return (
    <Image src={src} alt={t(ui.labels.thmAlt)} width={96} height={96} unoptimized className="h-24 w-24 shrink-0 rounded-lg bg-white p-1" />
  );
}

export function Certifications() {
  const { t } = useApp();
  return (
    <Section id="certs" title={t(ui.sections.certs)} eyebrow="certs/">
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <ul className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.title.fr} delay={(i % 2) * 0.05}>
              <li className="glass glass-hover h-full list-none p-4">
                <Badge tone={c.status === "done" ? "green" : c.status === "ongoing" ? "accent" : "muted"}>
                  {t(statusLabels[c.status])}
                </Badge>
                <p className="mt-2 font-semibold">{t(c.title)}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="glass flex h-full flex-col gap-4 border-green/40 p-5">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-green-text" aria-hidden="true" />
              <h3 className="font-semibold">{t(ui.labels.thmTitle)}</h3>
              <Badge tone="green">{t(ui.labels.active)}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <ThmQr />
              <p className="text-sm text-muted">{t(ui.labels.thmText)}</p>
            </div>
            <a
              href={profile.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-green/60 px-4 py-2.5 text-sm font-semibold text-green-text hover:bg-green/10"
            >
              {t(ui.labels.thmBtn)} <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- Formation */
export function Education() {
  const { t } = useApp();
  return (
    <Section id="education" title={t(ui.sections.education)} eyebrow="education/">
      <div className="grid gap-4 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.title.fr} delay={i * 0.06} className="h-full">
            <article className="glass glass-hover h-full p-5">
              <p className="font-mono text-xs text-accent-text">{e.period}</p>
              <h3 className="mt-1 font-semibold">{t(e.title)}</h3>
              <p className="text-sm text-muted">{e.school}</p>
              {e.note && <p className="mt-2 text-sm text-green-text">{t(e.note)}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------------- CV */
export function CvSection() {
  const { t } = useApp();
  return (
    <Section id="cv" title={t(ui.sections.cv)} eyebrow="cv/">
      <Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {cvs.map((c) => (
            <a
              key={c.id}
              href={c.file}
              download
              className="glass glass-hover flex items-center justify-between gap-3 p-5 font-semibold"
            >
              {t(c.label)}
              <Download size={20} className="text-accent-text" aria-hidden="true" />
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
