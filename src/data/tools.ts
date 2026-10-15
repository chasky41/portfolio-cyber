import {
  siBurpsuite,
  siCisco,
  siDebian,
  siDocker,
  siElastic,
  siGithubactions,
  siGitlab,
  siGnubash,
  siKalilinux,
  siLinux,
  siOwasp,
  siPython,
  siTryhackme,
  siVirtualbox,
  siWireshark,
} from "simple-icons";
import type { L } from "./profile";

/**
 * Outils, référentiels et organismes (uniquement ceux déjà cités dans profile.ts).
 * - `path` : tracé officiel Simple Icons (logo de marque).
 * - `mono` : badge texte sobre quand il n'existe pas de logo libre (on ne redessine pas de logos officiels).
 * - `scene` : apparaît aussi dans le décor 3D.
 */
export type Tool = {
  id: string;
  label: string;
  path?: string;
  hex?: string;
  mono?: string;
  scene?: boolean;
};

export type ToolGroup = { id: string; title: L; tools: Tool[] };

const brand = (id: string, label: string, i: { path: string; hex: string }, scene = false): Tool => ({
  id,
  label,
  path: i.path,
  hex: `#${i.hex}`,
  scene,
});

export const toolGroups: ToolGroup[] = [
  {
    id: "offense",
    title: { fr: "Pentest & audit", en: "Pentest & audit" },
    tools: [
      brand("kali", "Kali Linux", siKalilinux, true),
      brand("burp", "Burp Suite", siBurpsuite, true),
      { id: "nmap", label: "Nmap", mono: "NMAP", scene: true },
      brand("wireshark", "Wireshark", siWireshark, true),
      brand("owasp", "OWASP", siOwasp, true),
      brand("thm", "TryHackMe", siTryhackme, true),
    ],
  },
  {
    id: "sys",
    title: { fr: "Réseau, systèmes & machines virtuelles", en: "Network, systems & virtual machines" },
    tools: [
      brand("vbox", "VirtualBox", siVirtualbox, true),
      brand("debian", "Debian", siDebian, true),
      brand("linux", "Linux", siLinux),
      { id: "nft", label: "nftables", mono: "NFT" },
      { id: "ad", label: "Active Directory", mono: "AD" },
      { id: "winsrv", label: "Windows Server", mono: "WIN" },
    ],
  },
  {
    id: "siem",
    title: { fr: "Détection & SIEM", en: "Detection & SIEM" },
    tools: [
      brand("elk", "ELK (Elastic)", siElastic, true),
      { id: "wazuh", label: "Wazuh", mono: "WZH" },
      { id: "mitre", label: "MITRE ATT&CK", mono: "ATT&CK", scene: true },
    ],
  },
  {
    id: "devsecops",
    title: { fr: "DevSecOps & cloud", en: "DevSecOps & cloud" },
    tools: [
      brand("docker", "Docker", siDocker, true),
      brand("ghactions", "GitHub Actions", siGithubactions),
      brand("gitlab", "GitLab CI", siGitlab),
      { id: "aws", label: "AWS IAM", mono: "AWS" },
      { id: "gitleaks", label: "gitleaks", mono: "LEAK" },
      brand("python", "Python", siPython, true),
      brand("bash", "Bash", siGnubash),
      { id: "ps", label: "PowerShell", mono: "PS>" },
    ],
  },
  {
    id: "gov",
    title: { fr: "Référentiels & organismes", en: "Frameworks & bodies" },
    tools: [
      { id: "anssi", label: "ANSSI", mono: "ANSSI", scene: true },
      { id: "certfr", label: "CERT-FR", mono: "CERT-FR", scene: true },
      { id: "secnum", label: "SecNumÉdu", mono: "SecNum" },
      { id: "iso27001", label: "ISO 27001", mono: "27001" },
      { id: "iso27005", label: "ISO 27005", mono: "27005" },
      { id: "ebios", label: "EBIOS RM", mono: "EBIOS" },
      { id: "nist", label: "NIST SP 800-61", mono: "NIST" },
      { id: "rgpd", label: "RGPD", mono: "RGPD" },
      { id: "cvss", label: "CVSS", mono: "CVSS" },
      brand("cisco", "Cisco", siCisco),
    ],
  },
];

export const allTools = toolGroups.flatMap((g) => g.tools);
export const sceneTools = allTools.filter((t) => t.scene);

/** Couleur lisible sur fond sombre : les logos trop sombres passent en clair. */
export function readableColor(hex?: string): string {
  if (!hex) return "#00f3ff";
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.38 ? "#e6f1ff" : hex;
}
