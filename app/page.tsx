import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Metrics } from "@/components/sections/Metrics";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Certifications } from "@/components/sections/Certifications";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Contact } from "@/components/sections/Contact";
import { EXPERIENCE, EDUCATION } from "@/lib/data";

/**
 * Section flow (11 blocks):
 *  1. Hero            7. Learning
 *  2. Tech marquee    8. Certifications
 *  3. About + Skills  9. GitHub / Open source
 *  4. Metrics        10. Contact
 *  5. Projects       11. Footer
 *  6. Experience
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* 1 */} <Hero />
        {/* 2 */} <TechMarquee />
        {/* 3 */} <BentoGrid />
        {/* 4 */} <Metrics />
        {/* 5 */} <Projects />
        {/* 6 */}
        <Timeline
          id="experience"
          kicker="Career"
          title="Experience"
          description="An alternating, scroll-lit timeline. The rail fills as you read."
          items={EXPERIENCE}
        />
        {/* 7 */}
        <Timeline
          id="education"
          kicker="The Build Journey"
          title="How I learned — by building"
          description="Each tool taught me the next. From a first PDF script to a live-model DAX workbench — driven by curiosity and a refusal to do things manually."
          items={EDUCATION}
        />
        {/* 8 */} <Certifications />
        {/* 9 */} <GitHubSection />
        {/* 10 */} <Contact />
      </main>
      {/* 11 */}
      <Footer />
    </>
  );
}
