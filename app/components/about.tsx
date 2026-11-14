import Link from "next/link";
import StatsCards from "./stats";

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
              Étudiant en école d&apos;ingénieur spécialisé en informatique, spécialisé en réseaux et sécurité informatique.
            </p>
            <p className="leading-relaxed text-muted">
              Curieux et autonome, j&apos;aime passer mon temps libre à coder et créer des applications et autres outils.
            </p>
            <p className="leading-relaxed text-muted">
              Toujours à la recherche de nouveaux défis, je suis toujours motivé par des projets personnels.
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

          {/* Stats */}
          <div>
            <StatsCards />
          </div>
        </div>
      </div>
    </section>
  );
}
