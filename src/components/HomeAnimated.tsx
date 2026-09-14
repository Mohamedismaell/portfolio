"use client";

import Hero from "@/components/hero/Hero";
import EditorialBio from "@/components/about/EditorialBio";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import GithubStatsSection from "@/components/github/GithubStatsSection";
import EducationSection from "@/components/education/EducationSection";
import Footer from "@/components/footer/Footer";
import ContactModal from "@/components/contact/ContactModal";
import FadeIn from "@/components/ui/FadeIn";

export default function HomeAnimated() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <FadeIn>
        <EditorialBio />
      </FadeIn>
      <FadeIn>
        <SkillsSection />
      </FadeIn>
      <FadeIn>
        <ProjectsSection />
      </FadeIn>
      <FadeIn>
        <GithubStatsSection />
      </FadeIn>
      <FadeIn>
        <EducationSection />
      </FadeIn>
      <FadeIn>
        <Footer />
      </FadeIn>
      <ContactModal />
    </main>
  );
}
