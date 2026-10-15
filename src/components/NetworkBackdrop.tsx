"use client";

import dynamic from "next/dynamic";

// Three.js est chargé côté client uniquement, après le premier rendu.
const NetworkBackground = dynamic(() => import("./NetworkBackground"), { ssr: false });

export function NetworkBackdrop() {
  return <NetworkBackground />;
}
