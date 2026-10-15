import {
  certifications,
  cvs,
  education,
  expertise,
  profile,
  projects,
  skillGroups,
  statusLabels,
  levelLabels,
  type Lang,
} from "@/data/profile";

export type TLine = { text: string; tone?: "dim" | "ok" | "accent" | "err"; href?: string };

export const COMMANDS = [
  "help",
  "whoami",
  "skills",
  "grc",
  "soc",
  "pentest",
  "risk",
  "projects",
  "certs",
  "cv",
  "contact",
  "clear",
  "sudo hire-me",
] as const;

const l = (text: string, tone?: TLine["tone"], href?: string): TLine => ({ text, tone, href });

function domain(id: string, lang: Lang): TLine[] {
  const d = expertise.find((e) => e.id === id)!;
  return [
    l(`# ${d.title[lang]} · ${levelLabels[d.level][lang]}`, "accent"),
    ...d.did[lang].map((s) => l(`  - ${s}`)),
    ...(d.tools.length ? [l(`  ${lang === "fr" ? "outils" : "tools"}: ${d.tools.join(", ")}`, "dim")] : []),
  ];
}

export function run(raw: string, lang: Lang): TLine[] | "clear" {
  const cmd = raw.trim().replace(/\s+/g, " ").toLowerCase();
  const fr = lang === "fr";
  switch (cmd) {
    case "":
      return [];
    case "clear":
      return "clear";
    case "help":
      return [
        l(fr ? "Commandes disponibles :" : "Available commands:", "accent"),
        l("  whoami     " + (fr ? "qui suis-je" : "who am I")),
        l("  skills     " + (fr ? "compétences par catégorie" : "skills by category")),
        l("  grc        " + (fr ? "gouvernance, risques, conformité" : "governance, risk, compliance")),
        l("  soc        " + (fr ? "détection et incidents" : "detection and incidents")),
        l("  pentest    " + (fr ? "audit et tests d'intrusion" : "audit and penetration testing")),
        l("  risk       " + (fr ? "gestion des risques" : "risk management")),
        l("  projects   " + (fr ? "mes projets" : "my projects")),
        l("  certs      " + (fr ? "certifications et formation" : "certifications and education")),
        l("  cv         " + (fr ? "télécharger mes CV" : "download my CVs")),
        l("  contact    " + (fr ? "me joindre" : "get in touch")),
        l("  clear      " + (fr ? "vider le terminal" : "clear the terminal")),
        l(fr ? "Astuce : Tab pour compléter, ↑/↓ pour l'historique." : "Tip: Tab to complete, ↑/↓ for history.", "dim"),
      ];
    case "whoami":
      return [
        l(`${profile.name} · ${profile.city}`, "accent"),
        l(profile.tagline[lang]),
        l(`${fr ? "qualités" : "qualities"}: ${profile.qualities[lang].join(", ")}`, "dim"),
        l(`${fr ? "langues" : "languages"}: ${profile.languages.map((x) => x[lang]).join(" · ")}`, "dim"),
      ];
    case "skills":
      return skillGroups.map((g) => l(`${g.title[lang].padEnd(24, " ")} ${g.items.join(", ")}`));
    case "grc":
      return domain("grc", lang);
    case "soc":
      return domain("soc", lang);
    case "pentest":
      return domain("pentest", lang);
    case "risk":
      return domain("risk", lang);
    case "projects":
      return projects.flatMap((p) => [l(`${p.period}  ${p.title[lang]}`, "accent"), l(`  ${p.description[lang]}`)]);
    case "certs":
      return [
        ...certifications.map((c) => l(`[${statusLabels[c.status][lang]}] ${c.title[lang]} (${c.issuer})`)),
        l("", "dim"),
        ...education.map((e) => l(`${e.period}  ${e.title[lang]} · ${e.school}`, "dim")),
        l("TryHackMe", "ok", profile.tryhackme),
      ];
    case "cv":
      return cvs.map((c) => l(`↓ ${c.label[lang]}`, "ok", c.file));
    case "contact":
      return [
        l(profile.email, "ok", `mailto:${profile.email}`),
        l("LinkedIn", "ok", profile.linkedin),
        l("GitHub", "ok", profile.github),
        l("TryHackMe", "ok", profile.tryhackme),
      ];
    case "sudo hire-me":
      return [
        l("[sudo] password for visitor: ********", "dim"),
        l(fr ? "Authentification réussie. Bon choix." : "Authentication successful. Great choice.", "ok"),
        l(fr ? "Stage de 6 mois dès fin mars 2027, Lyon / Paris / mobilité France." : "6-month internship from late March 2027, Lyon / Paris / France-wide.", "accent"),
        l(fr ? "→ Écrivez-moi : " + profile.email : "→ Email me: " + profile.email, "ok", `mailto:${profile.email}`),
      ];
    default:
      if (cmd === "sudo" || cmd.startsWith("sudo ")) {
        return [l("visitor is not in the sudoers file. This incident will be reported.", "err"), l(fr ? "Essayez « sudo hire-me »." : 'Try "sudo hire-me".', "dim")];
      }
      return [l(`zsh: ${fr ? "commande introuvable" : "command not found"}: ${raw.trim()}`, "err"), l(fr ? "Tapez « help »." : 'Type "help".', "dim")];
  }
}

export function complete(input: string): string {
  const v = input.toLowerCase();
  if (!v) return input;
  const matches = COMMANDS.filter((c) => c.startsWith(v));
  return matches.length === 1 ? matches[0] : input;
}
