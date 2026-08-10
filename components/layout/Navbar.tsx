"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

/** Slim, sticky top bar — brand · section links · Get in touch. */
export function Navbar() {
  const [active, setActive] = useState(NAV_LINKS[0].id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-[rgb(var(--border)/0.1)] bg-[rgb(var(--bg)/0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <button onClick={() => go("about")} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
              {PROFILE.firstName[0]}
              {PROFILE.lastName[0]}
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">{PROFILE.firstName}</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    active === link.id ? "text-accent" : "text-fg-muted hover:text-fg"
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go("contact"); }}
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[0.98] sm:inline-block"
            >
              Get in touch
            </a>
            <ThemeToggle />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[rgb(var(--bg)/0.96)] backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="mono text-sm text-fg-muted">navigation</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[...NAV_LINKS, { id: "contact", label: "Get in touch" }].map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline gap-4 border-b border-white/5 py-4 font-display text-3xl font-semibold tracking-tight text-fg"
                  >
                    <span className="mono text-xs text-accent">0{i + 1}</span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
