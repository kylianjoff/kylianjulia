import Link from "next/link";

const skills = [
  "TypeScript", "Next.js", "React", "Node.js",
  "Python", "Docker", "Git", "Linux",
  "Cybersécurité", "SQL", "Tailwind CSS", "REST APIs",
];

export default function AboutSection() {
  return (
    <section className="py-28 px-6 bg-card border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-5">
          <h2 className="text-3xl font-bold">À propos</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-16 md:grid-cols-2 items-start">
          {/* Bio */}
          <div className="space-y-5">
            <p className="leading-relaxed text-muted">
              Étudiant en école d&apos;ingénieur spécialisé en informatique, je développe
              mes compétences en développement web full-stack et en cybersécurité.
            </p>
            <p className="leading-relaxed text-muted">
              Curieux et autonome, j&apos;aime créer des projets qui mêlent design
              soigné et architecture technique solide.
            </p>
            <p className="leading-relaxed text-muted">
              Toujours à la recherche de nouveaux défis, je m&apos;investis aussi
              bien dans des projets personnels que dans des collaborations open-source.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              En savoir plus
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Skills */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">
              Compétences
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
