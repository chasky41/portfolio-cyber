/**
 * Source unique du contenu du portfolio (FR + EN).
 * Modifiez ce fichier : aucun composant n'a besoin d'être touché.
 * Convention : { fr, en } pour tout texte affiché.
 * TODO : les champs marqués TODO sont à compléter par vous (ils ne s'affichent pas tant qu'ils sont vides).
 */

export type Lang = "fr" | "en";
export type L = { fr: string; en: string };
export type LList = { fr: string[]; en: string[] };

export type Level = "enterprise" | "project" | "learning";

export const levelLabels: Record<Level, L> = {
  enterprise: { fr: "Pratiqué en entreprise", en: "Practised in industry" },
  project: { fr: "Projet académique", en: "Academic project" },
  learning: { fr: "En apprentissage", en: "Currently learning" },
};

export const site = {
  url: "https://charaf-eddine.vercel.app", // TODO : remplacer par votre domaine final
  name: "Charaf-Eddine BERHILI",
  initials: "CB",
};

export const profile = {
  name: "Charaf-Eddine BERHILI",
  city: "Lyon",
  email: "berhili.charafeddine33@gmail.com",
  linkedin: "https://www.linkedin.com/in/charaf-eddine-berhili",
  github: "https://github.com/chasky41",
  tryhackme: "https://tryhackme.com/p/chasky",
  /** Affiche le téléphone dans la section contact (false par défaut). */
  showPhone: false,
  phone: "", // TODO : votre numéro (visible seulement si showPhone = true)
  license: { fr: "Permis B", en: "Driving licence (B)" } as L,
  photo: "/profile.jpg?v=2",
  roles: {
    fr: ["Analyste SOC", "Consultant GRC", "Pentest & audit", "Gestion des risques"],
    en: ["SOC Analyst", "GRC Consultant", "Pentest & audit", "Risk management"],
  } as LList,
  availability: {
    fr: "Disponible pour un stage de 6 mois dès fin mars 2027",
    en: "Available for a 6-month internship from late March 2027",
  } as L,
  target: {
    fr: "Stage de fin d'études en cybersécurité · 6 mois dès fin mars 2027 · Lyon, Paris ou mobilité France",
    en: "End-of-studies cybersecurity internship · 6 months from late March 2027 · Lyon, Paris or anywhere in France",
  } as L,
  tagline: {
    fr: "Étudiant en M2 Informatique parcours OPSIE à l'Université Lumière Lyon 2 (label SecNumÉdu de l'ANSSI) et titulaire du titre Expert en Systèmes d'Information et Sécurité (Bac+5). Je recherche un stage de fin d'études de 6 mois en cybersécurité dès fin mars 2027.",
    en: "M2 Computer Science student (OPSIE track) at Université Lumière Lyon 2 (ANSSI SecNumÉdu label), holder of the Expert in Information Systems and Security title (Bac+5). I am looking for a 6-month end-of-studies cybersecurity internship starting late March 2027.",
  } as L,
  qualities: {
    fr: ["Proactivité", "Fiabilité", "Rigueur", "Curiosité", "Esprit d'équipe"],
    en: ["Proactivity", "Reliability", "Rigour", "Curiosity", "Team spirit"],
  } as LList,
  languages: [
    { fr: "Français : bilingue", en: "French: bilingual" },
    { fr: "Anglais : courant (B2/C1)", en: "English: fluent (B2/C1)" },
  ] as L[],
  about: {
    fr: [
      "Mon parcours part de l'informatique appliquée et s'est orienté vers la sécurité : titre professionnel niveau 6, puis titre Expert en Systèmes d'Information et Sécurité, aujourd'hui Master OPSIE à Lyon 2.",
      "En alternance et en stage chez ETICAN Academy et IT Système, j'ai travaillé des deux côtés : sécuriser une application en production et auditer un système d'information (écarts ANSSI et RGPD, plan de durcissement, procédures).",
      "Je cherche un stage de fin d'études pour aller plus loin sur la gouvernance, la gestion des risques et la détection, avec une équipe qui aime transmettre.",
    ],
    en: [
      "My path started in applied computer science and moved towards security: a level 6 professional title, then the Expert in Information Systems and Security title, and now the OPSIE Master's at Lyon 2.",
      "During my work-study and internship at ETICAN Academy and IT Système, I worked on both sides: securing a production application and auditing an information system (ANSSI and GDPR gaps, hardening plan, procedures).",
      "I am looking for an end-of-studies internship to go further on governance, risk management and detection, within a team that likes to share knowledge.",
    ],
  } as LList,
};

/* ------------------------------------------------------------------ */
/* Mode recruteur                                                      */
/* ------------------------------------------------------------------ */
export const recruiter = {
  strengths: {
    fr: [
      "Sécurité appliquée en production : MFA TOTP, RBAC multi-tenant, TLS 1.3, audit OWASP (15 vulnérabilités corrigées)",
      "Approche GRC : état des lieux d'un SI, analyse d'écarts ANSSI / RGPD, plan de durcissement priorisé",
      "Culture SOC et pentest : Kali, Burp Suite, Wireshark, MITRE ATT&CK, détection d'accès anormaux par Isolation Forest",
    ],
    en: [
      "Applied security in production: TOTP MFA, multi-tenant RBAC, TLS 1.3, OWASP audit (15 vulnerabilities fixed)",
      "GRC approach: information system assessment, ANSSI / GDPR gap analysis, prioritised hardening plan",
      "SOC and pentest culture: Kali, Burp Suite, Wireshark, MITRE ATT&CK, anomalous access detection with Isolation Forest",
    ],
  } as LList,
};

/* ------------------------------------------------------------------ */
/* Compteurs (uniquement des chiffres issus du contenu fourni)         */
/* ------------------------------------------------------------------ */
export const counters = [
  { value: 15, label: { fr: "vulnérabilités corrigées (audit OWASP)", en: "vulnerabilities fixed (OWASP audit)" } as L },
  { value: 48, label: { fr: "tests automatisés en CI/CD", en: "automated tests in CI/CD" } as L },
  { value: 3, label: { fr: "expériences en entreprise", en: "industry experiences" } as L },
  { value: 6, label: { fr: "domaines de la cybersécurité abordés", en: "cybersecurity domains covered" } as L },
];

/* ------------------------------------------------------------------ */
/* Domaines d'expertise                                                */
/* ------------------------------------------------------------------ */
export type Expertise = {
  id: string;
  icon: "shield-check" | "scale" | "radar" | "bug" | "git-branch" | "factory";
  title: L;
  level: Level;
  did: LList;
  tools: string[];
};

export const expertise: Expertise[] = [
  {
    id: "grc",
    icon: "shield-check",
    title: { fr: "GRC & conformité", en: "GRC & compliance" },
    level: "enterprise",
    did: {
      fr: [
        "État des lieux de la sécurité d'un SI : cartographie des accès et des données, revue des comptes, des droits et des configurations",
        "Identification des écarts (bonnes pratiques ANSSI, RGPD) et propositions de durcissement priorisées",
        "Rédaction de procédures et suivi du plan d'action",
      ],
      en: [
        "Security assessment of an information system: access and data mapping, review of accounts, rights and configurations",
        "Gap identification (ANSSI good practices, GDPR) and prioritised hardening proposals",
        "Writing of procedures and action plan follow-up",
      ],
    },
    tools: ["ISO 27001", "RGPD", "Guides ANSSI", "Analyse d'écarts"],
  },
  {
    id: "risk",
    icon: "scale",
    title: { fr: "Gestion des risques", en: "Risk management" },
    level: "learning",
    did: {
      fr: [
        "Priorisation des actions de durcissement lors du diagnostic de SI",
        "Cotation de la criticité des vulnérabilités (CVSS) dans les audits",
        "Objectif 2027 : certification ISO/IEC 27005 Risk Manager (PECB)",
      ],
      en: [
        "Prioritisation of hardening actions during the information system assessment",
        "Vulnerability severity scoring (CVSS) in audits",
        "2027 goal: ISO/IEC 27005 Risk Manager certification (PECB)",
      ],
    },
    tools: ["ISO 27005", "EBIOS RM", "CVSS"],
  },
  {
    id: "soc",
    icon: "radar",
    title: { fr: "SOC & détection", en: "SOC & detection" },
    level: "project",
    did: {
      fr: [
        "Modèle Isolation Forest (Python) entraîné sur des journaux de connexion pour repérer les accès anormaux",
        "Analyse de trames avec Wireshark dans un projet d'infrastructure réseau",
        "Veille CVE et CERT-FR",
      ],
      en: [
        "Isolation Forest model (Python) trained on login logs to spot anomalous accesses",
        "Frame analysis with Wireshark in a network infrastructure project",
        "CVE and CERT-FR monitoring",
      ],
    },
    tools: ["Analyse de logs", "SIEM (notions Wazuh, ELK)", "Wireshark", "MITRE ATT&CK", "NIST SP 800-61"],
  },
  {
    id: "pentest",
    icon: "bug",
    title: { fr: "Pentest & audit", en: "Pentest & audit" },
    level: "enterprise",
    did: {
      fr: [
        "Audit de sécurité OWASP : reconnaissance, exploitation contrôlée, rapport, remédiation",
        "15 vulnérabilités identifiées, corrigées puis testées à nouveau",
      ],
      en: [
        "OWASP security audit: reconnaissance, controlled exploitation, report, remediation",
        "15 vulnerabilities identified, fixed, then re-tested",
      ],
    },
    tools: ["Kali Linux", "Nmap", "Burp Suite", "OWASP Top 10", "CVSS"],
  },
  {
    id: "appsec",
    icon: "git-branch",
    title: { fr: "Sécurité applicative & DevSecOps", en: "Application security & DevSecOps" },
    level: "enterprise",
    did: {
      fr: [
        "MFA TOTP, RBAC et cloisonnement multi-tenant, TLS 1.3, en-têtes de sécurité, rate limiting sur une application en production",
        "SAST, détection de secrets (gitleaks), 48 tests automatisés en CI/CD",
        "Intégrité des documents par empreinte SHA-256, anonymisation des données avant tout appel à une IA externe",
      ],
      en: [
        "TOTP MFA, RBAC and multi-tenant isolation, TLS 1.3, security headers, rate limiting on a production application",
        "SAST, secret detection (gitleaks), 48 automated tests in CI/CD",
        "Document integrity with SHA-256 fingerprints, data anonymisation before any external AI call",
      ],
    },
    tools: ["GitHub Actions", "GitLab CI", "gitleaks", "Docker", "AWS IAM"],
  },
  {
    id: "ics",
    icon: "factory",
    title: { fr: "Cybersécurité industrielle", en: "Industrial cybersecurity" },
    level: "learning",
    // TODO : à compléter si vous avez une expérience ou un cours dans ce domaine (aucune donnée fournie).
    did: {
      fr: ["Domaine que je souhaite découvrir en stage ; pas d'expérience en entreprise à ce jour"],
      en: ["An area I want to discover during my internship; no industry experience so far"],
    },
    tools: [],
  },
];

/* ------------------------------------------------------------------ */
/* Expériences                                                         */
/* ------------------------------------------------------------------ */
export type Experience = {
  role: L;
  org: string;
  place: string;
  period: L;
  bullets: LList;
  chips: L[];
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    role: { fr: "Alternant Ingénieur Logiciel et Sécurité", en: "Work-study Software & Security Engineer" },
    org: "ETICAN Academy",
    place: "Poissy",
    period: { fr: "janv. 2026 – juil. 2026", en: "Jan. 2026 – Jul. 2026" },
    bullets: {
      fr: [
        "Sécurisation d'une application en production : MFA TOTP, RBAC et cloisonnement multi-tenant, TLS 1.3, en-têtes de sécurité, rate limiting",
        "Audit de sécurité OWASP (Kali Linux, Burp Suite) : 15 vulnérabilités identifiées, corrigées et testées à nouveau",
        "Contrôles de sécurité automatisés (SAST, détection de secrets avec gitleaks, 48 tests automatisés en CI/CD), intégrité des documents par empreinte SHA-256, anonymisation des données avant tout appel à une IA externe",
      ],
      en: [
        "Securing a production application: TOTP MFA, RBAC and multi-tenant isolation, TLS 1.3, security headers, rate limiting",
        "OWASP security audit (Kali Linux, Burp Suite): 15 vulnerabilities identified, fixed and re-tested",
        "Automated security controls (SAST, secret detection with gitleaks, 48 automated tests in CI/CD), document integrity with SHA-256 fingerprints, data anonymisation before any external AI call",
      ],
    },
    chips: [
      { fr: "15 vulnérabilités corrigées", en: "15 vulnerabilities fixed" },
      { fr: "48 tests en CI/CD", en: "48 tests in CI/CD" },
      { fr: "MFA TOTP", en: "TOTP MFA" },
      { fr: "TLS 1.3", en: "TLS 1.3" },
    ],
  },
  {
    role: { fr: "Stagiaire Cybersécurité", en: "Cybersecurity Intern" },
    org: "ETICAN Academy",
    place: "Paris",
    period: { fr: "2025 · 2 mois", en: "2025 · 2 months" },
    bullets: {
      fr: [
        "État des lieux de la sécurité du SI : cartographie des accès et des données, revue des comptes, des droits et des configurations",
        "Identification des écarts (bonnes pratiques ANSSI, RGPD) et propositions de durcissement priorisées",
        "Rédaction de procédures et de supports de sensibilisation, suivi du plan d'action",
      ],
      en: [
        "Security assessment of the information system: access and data mapping, review of accounts, rights and configurations",
        "Gap identification (ANSSI good practices, GDPR) and prioritised hardening proposals",
        "Writing of procedures and awareness material, action plan follow-up",
      ],
    },
    chips: [
      { fr: "Analyse d'écarts ANSSI / RGPD", en: "ANSSI / GDPR gap analysis" },
      { fr: "Plan de durcissement priorisé", en: "Prioritised hardening plan" },
      { fr: "Sensibilisation", en: "Awareness" },
    ],
  },
  {
    role: { fr: "Alternant Full-Stack et Sécurité", en: "Work-study Full-Stack & Security" },
    org: "IT Système",
    place: "Paris",
    period: { fr: "2024", en: "2024" },
    bullets: {
      fr: [
        "Gestion des identités et des accès d'un CRM (Python Django, React, API REST) : authentification JWT, gestion des rôles et des droits",
        "Sécurisation des accès cloud AWS (IAM) et des environnements conteneurisés Docker",
        "Validation des entrées et contrôles de sécurité intégrés à la chaîne de déploiement GitLab",
      ],
      en: [
        "Identity and access management of a CRM (Python Django, React, REST API): JWT authentication, role and rights management",
        "Securing AWS cloud access (IAM) and Docker containerised environments",
        "Input validation and security checks built into the GitLab deployment pipeline",
      ],
    },
    chips: [
      { fr: "JWT & rôles", en: "JWT & roles" },
      { fr: "AWS IAM", en: "AWS IAM" },
      { fr: "Docker", en: "Docker" },
      { fr: "GitLab CI", en: "GitLab CI" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Études de cas                                                       */
/* ------------------------------------------------------------------ */
export type CaseStudy = { title: L; context: L; approach: L; result: L };

export const caseStudies: CaseStudy[] = [
  {
    title: { fr: "Sécuriser une plateforme métier en production", en: "Securing a business platform in production" },
    context: {
      fr: "Application exposée sur Internet, avec des données sensibles (ETICAN).",
      en: "An internet-exposed application holding sensitive data (ETICAN).",
    },
    approach: {
      fr: "MFA, RBAC, cloisonnement multi-tenant, TLS 1.3, puis audit OWASP et mise en place d'une CI/CD sécurisée.",
      en: "MFA, RBAC, multi-tenant isolation, TLS 1.3, then an OWASP audit and a secured CI/CD pipeline.",
    },
    result: {
      fr: "15 vulnérabilités corrigées et des contrôles bloquants à chaque déploiement.",
      en: "15 vulnerabilities fixed and blocking checks on every deployment.",
    },
  },
  {
    title: { fr: "Diagnostic sécurité d'un SI", en: "Information system security assessment" },
    context: {
      fr: "Stage 2025 : un système d'information sans état des lieux de sa sécurité.",
      en: "2025 internship: an information system with no security baseline.",
    },
    approach: {
      fr: "Cartographie, revue des droits, analyse d'écarts ANSSI / RGPD.",
      en: "Mapping, rights review, ANSSI / GDPR gap analysis.",
    },
    result: {
      fr: "Un plan de durcissement priorisé, avec procédures et supports de sensibilisation.",
      en: "A prioritised hardening plan, with procedures and awareness material.",
    },
  },
  {
    title: { fr: "Détecter les accès frauduleux par l'IA", en: "Detecting fraudulent access with AI" },
    context: {
      fr: "Des journaux de connexion volumineux, impossibles à analyser à la main.",
      en: "Large login logs that cannot be reviewed by hand.",
    },
    approach: {
      fr: "Modèle Isolation Forest en Python entraîné sur les journaux de connexion.",
      en: "Isolation Forest model in Python trained on the login logs.",
    },
    result: {
      fr: "Détection des accès anormaux.",
      en: "Detection of anomalous accesses.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */
export type Project = {
  title: L;
  period: string;
  description: L;
  tags: string[];
  /** Laissez "" si pas de lien (aucun lien n'est affiché). TODO : ajouter vos liens GitHub. */
  link: string;
};

export const projects: Project[] = [
  {
    title: { fr: "SécuriDay · Université Lyon 2", en: "SécuriDay · Université Lyon 2" },
    period: "2026-2027",
    description: {
      fr: "Scrum Master de l'équipe qui organise une journée de sensibilisation à la cybersécurité (ateliers, CTF).",
      en: "Scrum Master of the team organising a cybersecurity awareness day (workshops, CTF).",
    },
    tags: ["Scrum", "Sensibilisation", "CTF"],
    link: "", // TODO
  },
  {
    title: { fr: "Laboratoire réseau · M2 OPSIE", en: "Network lab · M2 OPSIE" },
    period: "2026",
    description: {
      fr: "Topologie client et routeurs sous Debian (VirtualBox), routage IP, filtrage et NAT avec nftables, tests de connectivité.",
      en: "Client and router topology on Debian (VirtualBox), IP routing, filtering and NAT with nftables, connectivity tests.",
    },
    tags: ["Debian", "nftables", "NAT", "VirtualBox"],
    link: "", // TODO
  },
  {
    title: { fr: "Audit de sécurité et détection d'accès frauduleux", en: "Security audit and fraudulent access detection" },
    period: "2026",
    description: {
      fr: "Audit OWASP complet (reconnaissance, exploitation contrôlée, rapport, remédiation) et modèle Isolation Forest (Python) entraîné sur les journaux de connexion pour repérer les accès anormaux.",
      en: "Full OWASP audit (reconnaissance, controlled exploitation, report, remediation) and Isolation Forest model (Python) trained on login logs to spot anomalous accesses.",
    },
    tags: ["OWASP", "Kali Linux", "Burp Suite", "Python", "Isolation Forest"],
    link: "", // TODO
  },
  {
    title: { fr: "Infrastructure réseau sécurisée", en: "Secured network infrastructure" },
    period: "2025",
    description: {
      fr: "Installation et sécurisation de serveurs DNS et DHCP, analyse de trames Wireshark, tests de résilience.",
      en: "Installation and hardening of DNS and DHCP servers, Wireshark frame analysis, resilience tests.",
    },
    tags: ["DNS", "DHCP", "Wireshark"],
    link: "", // TODO
  },
];

/* ------------------------------------------------------------------ */
/* Référentiels                                                        */
/* ------------------------------------------------------------------ */
export const frameworks: string[] = [
  "ISO 27001",
  "ISO 27005",
  "EBIOS RM",
  "NIST SP 800-61",
  "MITRE ATT&CK",
  "OWASP Top 10",
  "RGPD",
  "Guides ANSSI",
];

/* ------------------------------------------------------------------ */
/* Compétences (groupes) + matrice                                     */
/* ------------------------------------------------------------------ */
export const skillGroups: { title: L; items: string[] }[] = [
  { title: { fr: "GRC & risques", en: "GRC & risk" }, items: ["ISO 27001", "ISO 27005", "EBIOS RM", "RGPD", "Guides ANSSI", "Analyse d'écarts", "Plan d'action"] },
  { title: { fr: "SOC & incidents", en: "SOC & incidents" }, items: ["Analyse de logs", "SIEM (notions Wazuh, ELK)", "Wireshark", "MITRE ATT&CK", "NIST SP 800-61", "Veille CVE et CERT-FR"] },
  { title: { fr: "Pentest & audit", en: "Pentest & audit" }, items: ["Kali Linux", "Nmap", "Burp Suite", "OWASP Top 10", "Cotation CVSS", "Rapport d'audit", "Suivi de remédiation"] },
  { title: { fr: "Identités & accès", en: "Identity & access" }, items: ["Active Directory", "MFA", "RBAC", "Gestion des droits", "Certificats TLS"] },
  { title: { fr: "Réseau & systèmes", en: "Network & systems" }, items: ["Linux (Debian, Kali)", "Windows Server", "TCP/IP", "Routage", "NAT", "nftables", "VPN", "DNS", "DHCP"] },
  { title: { fr: "Cloud & automatisation", en: "Cloud & automation" }, items: ["AWS (IAM)", "Docker", "CI/CD (GitHub Actions, GitLab CI)", "Python", "Bash", "PowerShell (notions)", "SQL"] },
  { title: { fr: "Conseil & méthodes", en: "Consulting & methods" }, items: ["Rédaction de procédures et rapports", "Sensibilisation", "Scrum"] },
];

export type MatrixLevel = "enterprise" | "project" | "notions";
export const matrixLabels: Record<MatrixLevel, L> = {
  enterprise: { fr: "Pratiqué en entreprise", en: "Practised in industry" },
  project: { fr: "Projet", en: "Project" },
  notions: { fr: "Notions", en: "Notions" },
};

/** Une ligne = un domaine, la colonne cochée = le niveau honnête. */
export const skillsMatrix: { domain: L; level: MatrixLevel }[] = [
  { domain: { fr: "GRC & conformité (ANSSI, RGPD)", en: "GRC & compliance (ANSSI, GDPR)" }, level: "enterprise" },
  { domain: { fr: "Pentest & audit OWASP", en: "Pentest & OWASP audit" }, level: "enterprise" },
  { domain: { fr: "Sécurité applicative & DevSecOps", en: "Application security & DevSecOps" }, level: "enterprise" },
  { domain: { fr: "Identités & accès (MFA, RBAC, IAM)", en: "Identity & access (MFA, RBAC, IAM)" }, level: "enterprise" },
  { domain: { fr: "Réseau & systèmes", en: "Network & systems" }, level: "project" },
  { domain: { fr: "Détection d'anomalies (Python)", en: "Anomaly detection (Python)" }, level: "project" },
  { domain: { fr: "Gestion des risques (ISO 27005, EBIOS RM)", en: "Risk management (ISO 27005, EBIOS RM)" }, level: "notions" },
  { domain: { fr: "SIEM (Wazuh, ELK)", en: "SIEM (Wazuh, ELK)" }, level: "notions" },
  { domain: { fr: "Cybersécurité industrielle", en: "Industrial cybersecurity" }, level: "notions" },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */
export type Cert = { title: L; issuer: string; status: "done" | "ongoing" | "goal" };

export const certifications: Cert[] = [
  { title: { fr: "Security Administration with Cisco Defense Orchestrator", en: "Security Administration with Cisco Defense Orchestrator" }, issuer: "Coursera", status: "done" },
  { title: { fr: "Professional Certificate in Agile and SCRUM", en: "Professional Certificate in Agile and SCRUM" }, issuer: "Udemy", status: "done" },
  { title: { fr: "Cybersecurity Operations Fundamentals", en: "Cybersecurity Operations Fundamentals" }, issuer: "Cisco", status: "ongoing" },
  { title: { fr: "Information Systems Auditing, Controls and Assurance", en: "Information Systems Auditing, Controls and Assurance" }, issuer: "HKUST", status: "ongoing" },
  { title: { fr: "ISO/IEC 27005 Risk Manager", en: "ISO/IEC 27005 Risk Manager" }, issuer: "PECB", status: "goal" },
];

export const statusLabels: Record<Cert["status"], L> = {
  done: { fr: "Obtenue", en: "Completed" },
  ongoing: { fr: "En cours", en: "In progress" },
  goal: { fr: "Objectif 2027", en: "2027 goal" },
};

/* ------------------------------------------------------------------ */
/* Formation                                                           */
/* ------------------------------------------------------------------ */
export const education: { title: L; school: string; period: string; note?: L }[] = [
  {
    title: { fr: "Master Informatique, parcours OPSIE", en: "Master's in Computer Science, OPSIE track" },
    school: "Université Lumière Lyon 2",
    period: "2025 – 2027",
    note: { fr: "Label SecNumÉdu de l'ANSSI", en: "ANSSI SecNumÉdu label" },
  },
  {
    title: { fr: "Titre Expert en Systèmes d'Information et Sécurité", en: "Expert in Information Systems and Security title" },
    school: "ESIC Paris",
    period: "2024 – 2026",
    note: { fr: "RNCP39394 · niveau 7 (Bac+5)", en: "RNCP39394 · level 7 (Bac+5)" },
  },
  {
    title: { fr: "Titre professionnel CDA (niveau 6)", en: "Professional title CDA (level 6)" },
    school: "ESIC Paris",
    period: "2023 – 2024",
  },
];

/* ------------------------------------------------------------------ */
/* CV                                                                  */
/* ------------------------------------------------------------------ */
// Remplacez le PDF dans public/cv/ en gardant le nom, et incrémentez ?v= pour forcer le rechargement chez les visiteurs.
// Pour ajouter un autre CV (ex. GRC, SOC), ajoutez une ligne ici et déposez le PDF dans public/cv/.
export const cvs: { label: L; file: string; id: string }[] = [
  { id: "cyber", label: { fr: "CV Cybersécurité (Pentest, SOC, GRC)", en: "Cybersecurity CV (Pentest, SOC, GRC)" }, file: "/cv/cv-cyber.pdf?v=2" },
];

/* ------------------------------------------------------------------ */
/* Page /securite                                                      */
/* ------------------------------------------------------------------ */
export const securityPage = {
  title: { fr: "Sécurité de ce site", en: "Security of this site" } as L,
  intro: {
    fr: "Un portfolio cyber doit appliquer ce qu'il prétend maîtriser. Voici les mesures en place, vérifiables dans les en-têtes HTTP de la page.",
    en: "A cybersecurity portfolio should practise what it claims. Here are the measures in place, verifiable in the page's HTTP headers.",
  } as L,
  items: [
    {
      title: { fr: "Content Security Policy stricte", en: "Strict Content Security Policy" },
      text: {
        fr: "Les scripts sont autorisés uniquement avec un nonce généré à chaque requête (strict-dynamic), sans 'unsafe-inline' ni 'unsafe-eval' en production. Seule exception justifiée : style-src-attr 'unsafe-inline', nécessaire aux attributs style posés par Framer Motion. Les balises <style> restent soumises au nonce.",
        en: "Scripts only run with a per-request nonce (strict-dynamic), with no 'unsafe-inline' nor 'unsafe-eval' in production. One justified exception: style-src-attr 'unsafe-inline', required by the style attributes set by Framer Motion. <style> tags remain nonce-protected.",
      },
    },
    {
      title: { fr: "En-têtes HTTP", en: "HTTP headers" },
      text: {
        fr: "HSTS (2 ans, preload), X-Content-Type-Options: nosniff, X-Frame-Options: DENY, frame-ancestors 'none', Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restrictive, COOP et CORP same-origin.",
        en: "HSTS (2 years, preload), X-Content-Type-Options: nosniff, X-Frame-Options: DENY, frame-ancestors 'none', Referrer-Policy strict-origin-when-cross-origin, restrictive Permissions-Policy, same-origin COOP and CORP.",
      },
    },
    {
      title: { fr: "Aucun tracker, aucun cookie", en: "No trackers, no cookies" },
      text: {
        fr: "Pas d'analytics, pas de cookie, pas de ressource tierce : polices, scripts et images sont servis depuis le site. Le thème et la langue sont mémorisés dans le stockage local de votre navigateur, sans envoi au serveur.",
        en: "No analytics, no cookies, no third-party resources: fonts, scripts and images are served by the site itself. Theme and language are kept in your browser's local storage and never sent to a server.",
      },
    },
    {
      title: { fr: "Formulaire de contact", en: "Contact form" },
      text: {
        fr: "Le formulaire envoie votre message uniquement à FormSubmit ou Formspree (les seules origines externes autorisées par la CSP), en HTTPS. En cas d'échec, un lien mailto est proposé. Aucun secret n'est présent dans le code.",
        en: "The form sends your message only to FormSubmit or Formspree (the only external origins allowed by the CSP), over HTTPS. If sending fails, a mailto link is offered. No secret is present in the code.",
      },
    },
    {
      title: { fr: "Dépendances auditées", en: "Audited dependencies" },
      text: {
        fr: "Les dépendances sont vérifiées avec npm audit avant chaque mise en ligne.",
        en: "Dependencies are checked with npm audit before each release.",
      },
    },
    {
      title: { fr: "Signalement de vulnérabilité", en: "Vulnerability disclosure" },
      text: {
        fr: "Un fichier /.well-known/security.txt (RFC 9116) indique comment me contacter en cas de problème.",
        en: "A /.well-known/security.txt file (RFC 9116) explains how to reach me if you find an issue.",
      },
    },
  ],
};

/**
 * Stats TryHackMe affichées dans le dashboard du hero.
 * TODO : renseignez vos vraies valeurs (copiez-les depuis votre profil). Les champs vides ne s'affichent pas.
 */
export const thmStats: { rank: string; rooms: string; badges: string; streak: string } = {
  rank: "",
  rooms: "",
  badges: "",
  streak: "",
};
