<<<<<<< HEAD
import HomeAnimated from "@/components/HomeAnimated";

export default function HomePage() {
  return <HomeAnimated />;
=======
import Hero from "@/components/hero/Hero";
import EditorialBio from "@/components/about/EditorialBio";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CredentialsSection from "@/components/credentials/CredentialsSection";
import GithubStatsSection from "@/components/github/GithubStatsSection";
import Footer from "@/components/footer/Footer";
import ContactModal from "@/components/contact/ContactModal";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <EditorialBio />
      <SkillsSection />
      <ProjectsSection />
      <CredentialsSection />
      <GithubStatsSection />
      <Footer />
      <ContactModal />
    </main>
  );
>>>>>>> parent of 9e38a5f (Refactor code structure for improved readability and maintainability)
}
