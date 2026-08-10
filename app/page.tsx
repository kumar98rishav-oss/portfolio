import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileSidebar } from "@/components/sections/ProfileSidebar";
import { About } from "@/components/sections/About";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

/**
 * Résumé / profile-document layout (reference-site style).
 *   Slim sticky nav
 *   Two columns: identity sidebar (snapshot · stats · education · certs)
 *                | main: Summary+Skills → Experience → AI Tools → Projects
 *   Full-width Contact + Footer.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:pt-14">
          <ProfileSidebar />
          <div className="flex min-w-0 flex-col gap-12 lg:gap-16">
            <About />
            <Tools />
            <Work />
            <ExperienceList />
          </div>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
