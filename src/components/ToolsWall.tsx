"use client";

import { useApp } from "@/lib/app-context";
import { readableColor, toolGroups, type Tool } from "@/data/tools";
import { ui } from "@/data/ui";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Tilt } from "./Tilt";

function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.path) {
    return (
      <svg viewBox="0 0 24 24" width="34" height="34" fill={readableColor(tool.hex)} aria-hidden="true">
        <path d={tool.path} />
      </svg>
    );
  }
  const long = (tool.mono?.length ?? 0) > 5;
  return (
    <span
      aria-hidden="true"
      className={`grid h-[34px] min-w-[34px] place-items-center rounded-md border border-accent/60 px-1.5 font-mono font-bold text-accent-text ${long ? "text-[9px]" : "text-[11px]"}`}
    >
      {tool.mono}
    </span>
  );
}

export function ToolsWall() {
  const { t } = useApp();
  return (
    <Section id="arsenal" title={t(ui.sections.arsenal)} eyebrow="./arsenal">
      <div className="space-y-8">
        {toolGroups.map((g) => (
          <Reveal key={g.id}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-green-text">{t(g.title)}</h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {g.tools.map((tool) => (
                <li key={tool.id}>
                  <Tilt className="h-full" max={12}>
                    <div className="glass glass-hover flex h-full items-center gap-3 px-4 py-3">
                      <ToolIcon tool={tool} />
                      <span className="text-sm font-medium leading-tight">{tool.label}</span>
                    </div>
                  </Tilt>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">{t(ui.labels.logoNote)}</p>
    </Section>
  );
}
