import type { Metadata } from "next";
import { SecurityView } from "@/components/SecurityView";

export const metadata: Metadata = {
  title: "Sécurité de ce site · Charaf-Eddine BERHILI",
  description: "Mesures de sécurité appliquées à ce portfolio : CSP stricte, en-têtes HTTP, aucun tracker, dépendances auditées.",
  alternates: { canonical: "/securite" },
};

export default function SecuritePage() {
  return <SecurityView />;
}
