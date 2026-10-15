"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function TypedRoles({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = setInterval(() => setI((p) => (p + 1) % roles.length), 2600);
      return () => clearInterval(id);
    }
    const full = roles[i % roles.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === full) delay = 1600;
    if (deleting && text === "") delay = 300;
    const id = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((p) => (p + 1) % roles.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, i, roles, reduce]);

  const shown = reduce ? roles[i % roles.length] : text;
  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className={`font-mono ${reduce ? "" : "caret"}`}>
        {shown}
      </span>
    </>
  );
}
