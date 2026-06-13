import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GitHubWidget } from "@/components/sections/GitHubWidget";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-24 lg:gap-32 py-20 lg:py-28">
        <About />
        <Experience />
        <Projects />
        <GitHubWidget />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
