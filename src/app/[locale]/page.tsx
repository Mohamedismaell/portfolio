import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import SkillsSection from "@/components/skills/SkillsSection";
import HireSection from "@/components/contact/HireSection";
import Footer from "@/components/footer/Footer";
import GithubStatsSection from "@/components/github/GithubStatsSection";

export default function HomePage() {
  return (
    <main className="text-white overflow-hidden">
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <GithubStatsSection />
      <HireSection />
      <Footer />
    </main>
  );
}
