"use client";

import { useEffect, useState } from "react";

const lines = [
  "init network core",
  "mount secure interface",
  "load profile: C. BERHILI",
  "status: ONLINE · SOC ready",
];

/** Écran de démarrage : animé en CSS pur (visible dès le HTML), retiré du DOM ensuite. */
export function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setGone(true), 2600);
    return () => clearTimeout(id);
  }, []);

  if (gone) return null;

  return (
    <div className="loader" role="status" aria-label="Loading" aria-live="polite">
      <div className="loader-inner">
        <div className="loader-ring" aria-hidden="true">
          <span>CB</span>
        </div>
        <p className="loader-title">CHARAF-EDDINE BERHILI</p>
        <ul className="loader-lines" aria-hidden="true">
          {lines.map((l, i) => (
            <li key={l} style={{ animationDelay: `${0.25 + i * 0.4}s` }}>
              <span className="ok">[ OK ]</span> {l}
            </li>
          ))}
        </ul>
        <div className="loader-bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
