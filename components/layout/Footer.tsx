import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-3 text-base font-bold">Kylian JULIA</p>
            <p className="text-sm leading-relaxed text-muted">
              Étudiant ingénieur informatique spécialisé en réseaux et sécurité informatique.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted transition-colors hover:text-primary">À propos</Link></li>
              <li><Link href="/blog" className="text-sm text-muted transition-colors hover:text-primary">Blog</Link></li>
              <li><Link href="/cheatsheets" className="text-sm text-muted transition-colors hover:text-primary">Cheat Sheets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Liens utiles
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://projets.kylianjulia.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  Mes projets
                </a>
              </li>
              <li>
                <a href="https://github.com/kylianjoff/kylianjulia/issues/new" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-primary">Signaler un bug</a>
              </li>
              <li>
                <a href="/data-and-cookies" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-primary">
                  Données personnelles &amp; Cookies
                </a>
              </li>
              
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Réseaux
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com/kylianjoff" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-primary">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kylian-julia/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-primary">LinkedIn</a>
              </li>
              <li>
                <a href="https://www.instagram.com/kylian_julia/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-primary">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-start gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Kylian JULIA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
