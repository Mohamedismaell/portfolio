import Hero from "@/components/hero/Hero";
import EditorialBio from "@/components/about/EditorialBio";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import GithubStatsSection from "@/components/github/GithubStatsSection";
import EducationSection from "@/components/education/EducationSection";
import Footer from "@/components/footer/Footer";
import ContactModal from "@/components/contact/ContactModal";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <EditorialBio />
      <SkillsSection />
      <ProjectsSection />
      <GithubStatsSection />
      <EducationSection />
      <Footer />
      <ContactModal />
    </main>
  );
}
