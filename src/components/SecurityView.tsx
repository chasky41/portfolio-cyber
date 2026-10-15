"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { securityPage } from "@/data/profile";
import { ui } from "@/data/ui";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SkipLink } from "./SkipLink";

export function SecurityView() {
  const { t } = useApp();
  return (
    <>
      <SkipLink />
      <Navbar home={false} />
      <main id="main" className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-accent-text hover:underline">
          <ArrowLeft size={14} aria-hidden="true" /> {t(ui.back)}
        </Link>
        <h1 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
          <ShieldCheck className="text-green-text" aria-hidden="true" /> {t(securityPage.title)}
        </h1>
        <p className="mt-4 text-muted">{t(securityPage.intro)}</p>
        <div className="mt-8 space-y-4">
          {securityPage.items.map((it) => (
            <section key={it.title.fr} className="glass p-5">
              <h2 className="font-semibold">{t(it.title)}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(it.text)}</p>
            </section>
          ))}
        </div>
        <p className="mt-6 font-mono text-sm">
          <a href="/.well-known/security.txt" className="text-accent-text hover:underline">
            /.well-known/security.txt
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
