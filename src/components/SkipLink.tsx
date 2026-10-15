"use client";

import { useApp } from "@/lib/app-context";
import { ui } from "@/data/ui";

export function SkipLink() {
  const { t } = useApp();
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-semibold text-accent-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t(ui.skip)}
    </a>
  );
}
