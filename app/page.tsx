import ProjectsSection from "./components/projects";
import BlogSection from "./components/blog";
import AboutSection from "./components/about";
import AnimationSection from "./components/animation";

export default function Home() {
  return (
    <>
      <AnimationSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
    </>
  );
}
