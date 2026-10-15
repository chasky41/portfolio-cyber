"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { L, Lang } from "@/data/profile";

type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  recruiter: boolean;
  setRecruiter: (v: boolean) => void;
  t: (l: L) => string;
};

const AppContext = createContext<Ctx | null>(null);

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* stockage indisponible : on ignore */
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [recruiter, setRecruiter] = useState(false);

  // Hydratation des préférences (le thème est déjà appliqué au DOM par le script d'amorce).
  useEffect(() => {
    const l = read("lang");
    const nav = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(l === "en" || l === "fr" ? l : nav ? "en" : "fr");
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write("lang", l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      write("theme", next);
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, theme, toggleTheme, recruiter, setRecruiter, t: (l) => l[lang] }),
    [lang, setLang, theme, toggleTheme, recruiter],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp doit être utilisé dans <AppProvider>");
  return ctx;
}
