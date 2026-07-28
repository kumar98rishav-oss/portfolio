"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { POSTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Blog() {
  const [featured, ...rest] = POSTS;

  return (
    <section id="blog" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
      <SectionHeading
        kicker="Writing"
        title="Latest articles"
        description="Featured post leads; the rest follow. Covers use a shimmer placeholder until you add images."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Featured */}
        <Reveal className="lg:row-span-2">
          <PostCard post={featured} featured />
        </Reveal>
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.06}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PostCard({ post, featured = false }: { post: (typeof POSTS)[number]; featured?: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="group glass gradient-border flex h-full flex-col overflow-hidden rounded-3xl"
    >
      {/* Shimmer cover */}
      <div
        className={cn(
          "skeleton relative w-full shrink-0 overflow-hidden",
          featured ? "aspect-[16/9]" : "aspect-[16/7]"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10" />
        <span className="mono absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur">
          {post.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mono flex items-center gap-3 text-xs text-fg-faint">
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readingTime}
          </span>
        </div>
        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight transition-colors group-hover:text-accent",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
        <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
