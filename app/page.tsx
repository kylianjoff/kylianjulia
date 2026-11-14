import ProjectsSection from "./components/projects";
import BlogSection from "./components/blog";
import AboutSection from "./components/about";
import AnimationSection from "./components/animation";
import ContactSection from "./components/contact";

export default function Home() {
  return (
    <>
      <AnimationSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
