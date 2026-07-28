"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState(NAV_LINKS[0].id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Scrollspy: mark a section active once it dominates the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full px-2 py-2 transition-[background-color,border-color,box-shadow] duration-500",
            scrolled ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "glass"
          )}
        >
          {/* Brand */}
          <button
            onClick={() => go("home")}
            className="ml-2 flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-tight"
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-black">
              {PROFILE.firstName[0]}
              {PROFILE.lastName[0]}
            </span>
            <span className="hidden sm:inline">{PROFILE.firstName}</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg/90 backdrop-blur-xl lg:hidden"
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
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={cn(
                      "flex w-full items-baseline gap-4 border-b border-white/5 py-4 text-3xl font-semibold tracking-tight",
                      active === link.id ? "text-fg" : "text-fg-muted"
                    )}
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
