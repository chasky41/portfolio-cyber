"use client";

import { useState } from "react";
import { Download, Globe, Menu, Moon, ScanEye, Sun, X } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { ui } from "@/data/ui";
import { cvs, site } from "@/data/profile";

const links = [
  ["about", ui.nav.about],
  ["expertise", ui.nav.expertise],
  ["experience", ui.nav.experience],
  ["cases", ui.nav.cases],
  ["projects", ui.nav.projects],
  ["skills", ui.nav.skills],
  ["certs", ui.nav.certs],
  ["contact", ui.nav.contact],
] as const;

const btn =
  "inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium transition hover:border-accent hover:text-accent-text";

export function Navbar({ home = true }: { home?: boolean }) {
  const { lang, setLang, theme, toggleTheme, setRecruiter, t } = useApp();
  const [open, setOpen] = useState(false);
  const prefix = home ? "" : "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-lg">
      <nav aria-label="Navigation" className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <a href={`${prefix}#top`} className="flex items-center gap-2 font-mono text-lg font-bold" aria-label={site.name}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-fg">{site.initials}</span>
        </a>

        {home && (
          <ul className="ml-4 hidden items-center gap-1 2xl:flex">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm text-muted transition hover:text-accent-text">
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className={btn} onClick={() => setLang(lang === "fr" ? "en" : "fr")} aria-label={t(ui.lang)}>
            <Globe size={16} aria-hidden="true" />
            <span className="font-mono">{lang === "fr" ? "EN" : "FR"}</span>
          </button>
          <button type="button" className={btn} onClick={toggleTheme} aria-label={t(ui.theme)}>
            {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          {home && (
            <button type="button" className={`${btn} max-sm:hidden whitespace-nowrap`} onClick={() => setRecruiter(true)}>
              <ScanEye size={16} aria-hidden="true" />
              {t(ui.recruiterBtn)}
            </button>
          )}
          <a
            href={cvs[0].file}
            download
            className="hidden items-center gap-2 whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-fg transition hover:brightness-110 md:inline-flex"
          >
            <Download size={16} aria-hidden="true" />
            {t(ui.cvBtn)}
          </a>
          {home && (
            <button
              type="button"
              className={`${btn} 2xl:hidden`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t(ui.menu)}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          )}
        </div>
      </nav>

      {home && open && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-4 pb-4 pt-2 2xl:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-sm hover:bg-card">
                  {t(label)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className={btn}
              onClick={() => {
                setOpen(false);
                setRecruiter(true);
              }}
            >
              <ScanEye size={16} aria-hidden="true" />
              {t(ui.recruiterBtn)}
            </button>
            <a href={cvs[0].file} download className={btn}>
              <Download size={16} aria-hidden="true" />
              {t(ui.cvBtn)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
