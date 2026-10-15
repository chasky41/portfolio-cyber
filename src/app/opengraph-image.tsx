import { ImageResponse } from "next/og";

export const alt = "Charaf-Eddine BERHILI · Portfolio cybersécurité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #12294a 0%, #0b1a30 100%)",
          color: "#eaf2fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#88cc14" }}>{"> stage cybersécurité · 6 mois · dès fin mars 2027"}</div>
        <div style={{ display: "flex", fontSize: 80, fontWeight: 800, marginTop: 24 }}>Charaf-Eddine BERHILI</div>
        <div style={{ display: "flex", fontSize: 38, color: "#29b6f6", marginTop: 20 }}>
          Analyste SOC · Consultant GRC · Pentest & audit · Gestion des risques
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#b4c6dc", marginTop: 36 }}>
          M2 OPSIE · Université Lumière Lyon 2 · Lyon, Paris, mobilité France
        </div>
      </div>
    ),
    size,
  );
}
