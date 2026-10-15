"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/app-context";
import { COMMANDS, complete, run, type TLine } from "@/lib/terminal-commands";
import { ui } from "@/data/ui";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type Entry = { cmd: string; out: TLine[] };

const toneClass: Record<NonNullable<TLine["tone"]>, string> = {
  dim: "text-[#8da4c0]",
  ok: "text-[#88cc14]",
  accent: "text-[#29b6f6]",
  err: "text-[#ff8a80]",
};

export function Terminal() {
  const { t, lang } = useApp();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [idx, setIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function submit() {
    const res = run(value, lang);
    if (res === "clear") setEntries([]);
    else setEntries((e) => [...e, { cmd: value, out: res }]);
    if (value.trim()) setHist((h) => [...h, value]);
    setIdx(-1);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      setValue((v) => complete(v));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      const n = idx === -1 ? hist.length - 1 : Math.max(0, idx - 1);
      setIdx(n);
      setValue(hist[n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (idx === -1) return;
      const n = idx + 1;
      if (n >= hist.length) {
        setIdx(-1);
        setValue("");
      } else {
        setIdx(n);
        setValue(hist[n]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  }

  const prompt = (
    <span className="select-none">
      <span className="text-[#88cc14]">visitor@cb</span>
      <span className="text-[#8da4c0]">:</span>
      <span className="text-[#29b6f6]">~</span>
      <span className="text-[#8da4c0]"> % </span>
    </span>
  );

  return (
    <Section id="terminal" title={t(ui.sections.terminal)} eyebrow="~/zsh">
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-line bg-[#0b1a30] shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f2240] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-[#8da4c0]">visitor@cb: ~ (zsh)</span>
          </div>
          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-[#e6eef8] sm:text-sm"
            onClick={() => inputRef.current?.focus()}
            role="log"
            aria-live="polite"
            aria-label="Terminal"
          >
            <p className="text-[#8da4c0]">
              {lang === "fr" ? "Bienvenue. Tapez " : "Welcome. Type "}
              <span className="text-[#88cc14]">help</span>
              {lang === "fr" ? " pour commencer." : " to get started."}
            </p>
            {entries.map((en, i) => (
              <div key={i} className="mt-1">
                <div>
                  {prompt}
                  {en.cmd}
                </div>
                {en.out.map((ln, j) => {
                  const cls = ln.tone ? toneClass[ln.tone] : "";
                  return ln.href ? (
                    <div key={j} className="whitespace-pre-wrap break-words">
                      <a
                        href={ln.href}
                        className={`${cls} underline underline-offset-2`}
                        {...(ln.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(ln.href.endsWith(".pdf") ? { download: true } : {})}
                      >
                        {ln.text}
                      </a>
                    </div>
                  ) : (
                    <div key={j} className={`whitespace-pre-wrap break-words ${cls}`}>
                      {ln.text || " "}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="mt-1 flex items-center">
              {prompt}
              <label className="sr-only" htmlFor="term-input">
                {lang === "fr" ? "Entrer une commande" : "Enter a command"}
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-[#e6eef8] caret-[#29b6f6] outline-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/10 bg-[#0f2240] px-3 py-2">
            {COMMANDS.filter((c) => c !== "sudo hire-me").map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  const res = run(c, lang);
                  if (res === "clear") setEntries([]);
                  else setEntries((e) => [...e, { cmd: c, out: res }]);
                  setHist((h) => [...h, c]);
                }}
                className="rounded-md border border-white/15 px-2 py-1 font-mono text-xs text-[#9fd8f7] hover:border-[#29b6f6]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
