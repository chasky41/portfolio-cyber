"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · {t(ui.footer.rights)}
        </p>
        <p>{t(ui.footer.built)}</p>
        <Link href="/securite" className="inline-flex items-center gap-1.5 font-medium text-accent-text hover:underline">
          <ShieldCheck size={15} aria-hidden="true" />
          {t(ui.footer.security)}
        </Link>
      </div>
    </footer>
  );
}
