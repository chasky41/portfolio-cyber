import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RecruiterMode } from "@/components/RecruiterMode";
import { Terminal } from "@/components/Terminal";
import {
  About,
  CaseStudies,
  Certifications,
  CvSection,
  Education,
  Experience,
  Expertise,
  Frameworks,
  Projects,
  SkillsMatrix,
} from "@/components/Sections";
import { ToolsWall } from "@/components/ToolsWall";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <RecruiterMode />
      <main id="main">
        <Hero />
        <Terminal />
        <About />
        <Expertise />
        <Experience />
        <CaseStudies />
        <Projects />
        <ToolsWall />
        <Frameworks />
        <SkillsMatrix />
        <Certifications />
        <Education />
        <CvSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
