"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

/** Terminal-style type / delete cycle through a list of words. */
export function TypingEffect({
  words,
  className,
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1400,
}: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Reduced motion: just show the first word, no animation.
  useEffect(() => {
    if (reduce) return;
    const current = words[index % words.length];

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce]);

  const text = reduce ? words[0] : words[index % words.length].substring(0, sub);

  return (
    <span className={`caret ${className ?? ""}`} aria-label={words[index % words.length]}>
      {text}
    </span>
  );
}
