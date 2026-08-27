"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// ─── Données satellites ──────────────────────────────────────────────────────
// Remplace le contenu du <SatelliteIcon> par <Image src={...} /> quand tu auras les icônes.

interface SatelliteData {
  id: number;
  label: string;
  rx: number;          // demi-axe horizontal
  ry: number;          // demi-axe vertical
  rotation: number;    // inclinaison de l'orbite en degrés
  duration: number;    // secondes – période de base
  startAngle: number;  // degrés – angle initial (0 = haut)
  color: string;
}

// Orbites elliptiques plates → large horizontalement, compact verticalement
const SATELLITES: SatelliteData[] = [
  { id: 1, label: "Site personnel",  rx: 250, ry: 60,  rotation:  18, duration:  9, startAngle:   0, color: "#3b82f6" },
  //{ id: 2, label: "Projet 2",   rx: 340, ry: 80,  rotation: -22, duration: 14, startAngle: 130, color: "#38bdf8" },
  //{ id: 3, label: "Projet 3",   rx: 420, ry: 96,  rotation:  12, duration: 20, startAngle: 250, color: "#818cf8" },
];

const ORBIT_W = 860;   // largeur du container
const ORBIT_H = 460;   // hauteur du container
const CX = ORBIT_W / 2;  // 430
const CY = ORBIT_H / 2;  // 230

// ─── Icône satellite ─────────────────────────────────────────────────────────

function SatelliteIcon({ color, label }: { color: string; label: string }) {
  return (
    <div className="group/sat relative">
      <Image
        src={`/images/projects/${label.toLowerCase().replace(/\s+/g, '-')}.png`}
        alt={label}
        width={56}
        height={56}
        className="rounded-[14px]"
      />
      {/* Tooltip */}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-0.5 text-[10px] text-foreground opacity-0 transition-opacity group-hover/sat:opacity-100">
        {label}
      </span>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anglesRef    = useRef<number[]>(SATELLITES.map((s) => s.startAngle));
  const lastTsRef    = useRef<number | null>(null);
  const rafRef       = useRef<number>(0);
  const animateRef   = useRef<(ts: number) => void>(() => {});
  const lastScrollY  = useRef(0);
  const boost        = useRef(0);

  useEffect(() => {
    // Défini dans l'effet pour éviter l'accès au ref pendant le render
    animateRef.current = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.08);
      lastTsRef.current = ts;

      boost.current *= 0.93;
      const speed = 1 + boost.current;

      const container = containerRef.current;
      if (container) {
        SATELLITES.forEach((sat, i) => {
          anglesRef.current[i] = (anglesRef.current[i] + (360 / sat.duration) * speed * dt) % 360;

          const t      = ((anglesRef.current[i] - 90) * Math.PI) / 180;
          const rotRad = (sat.rotation * Math.PI) / 180;

          // Position locale sur l'ellipse
          const xLocal = sat.rx * Math.cos(t);
          const yLocal = sat.ry * Math.sin(t);

          // Rotation de l'orbite → coordonnées monde
          const x = xLocal * Math.cos(rotRad) - yLocal * Math.sin(rotRad);
          const y = xLocal * Math.sin(rotRad) + yLocal * Math.cos(rotRad);

          // Perspective : plus grand quand y < 0 (devant), plus petit quand y > 0 (derrière)
          const maxR  = Math.max(sat.rx, sat.ry);
          const scale = (1 - 0.20 * (y / maxR + 1) / 2).toFixed(3);

          const el = container.querySelector<HTMLElement>(`[data-sat="${sat.id}"]`);
          if (el) {
            el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
            // y < 0 → devant le bouton (z4) ; y ≥ 0 → derrière (z1)
            el.style.zIndex = y < 0 ? "4" : "1";
          }
        });
      }

      rafRef.current = requestAnimationFrame((nextTs) => animateRef.current(nextTs));
    };

    rafRef.current = requestAnimationFrame((nextTs) => animateRef.current(nextTs));

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      boost.current = Math.min(boost.current + dy * 0.015, 5);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="py-28 px-6 bg-background border-t border-border/40 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 flex items-center gap-5">
          <h2 className="text-3xl font-bold">Projets</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Scène orbitale */}
        <div className="flex items-center justify-center">
          <div
            ref={containerRef}
            className="relative shrink-0"
            style={{ width: ORBIT_W, height: ORBIT_H }}
          >

            {/* Trajectoires elliptiques pointillées – inclinaisons différentes = croisements */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              width={ORBIT_W}
              height={ORBIT_H}
              style={{ zIndex: 0 }}
            >
              {SATELLITES.map((sat) => (
                <ellipse
                  key={sat.id}
                  cx={CX}
                  cy={CY}
                  rx={sat.rx}
                  ry={sat.ry}
                  fill="none"
                  stroke={sat.color}
                  strokeOpacity={0.22}
                  strokeWidth={1.5}
                  strokeDasharray="7 5"
                  transform={`rotate(${sat.rotation}, ${CX}, ${CY})`}
                />
              ))}
            </svg>

            {/* Satellites */}
            {SATELLITES.map((sat) => (
              <div
                key={sat.id}
                data-sat={sat.id}
                className="absolute left-1/2 top-1/2"
                style={{ zIndex: 4 }}
              >
                <SatelliteIcon color={sat.color} label={sat.label} />
              </div>
            ))}

            {/* Bouton central – z-index 2 : satellites z4 passent devant, z1 passent derrière */}
            <a
              href="https://projets.kylianjulia.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              style={{ zIndex: 2 }}
              aria-label="Voir mes projets"
            >
              {/* Halo pulsant */}
              <span
                aria-hidden="true"
                className="absolute -inset-5 rounded-3xl bg-blue-500/10 blur-xl animate-pulse"
                style={{ animationDuration: "3s" }}
              />

              {/* Bouton */}
              <div className="relative overflow-hidden flex items-center gap-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 px-8 py-[14px] text-white shadow-[0_8px_40px_-8px_rgba(99,102,241,0.7)] transition-all duration-300 group-hover:shadow-[0_12px_50px_-8px_rgba(99,102,241,0.9)] group-hover:scale-[1.06] group-focus:scale-[1.06]">
                {/* Shimmer au hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-600 group-hover:translate-x-full"
                />
                {/* Icône globe */}
                <svg
                  aria-hidden="true"
                  className="relative z-10 shrink-0 opacity-80"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="relative z-10 text-[15px] font-semibold tracking-wide leading-none">Voir mes projets</span>
                {/* Flèche */}
                <svg
                  aria-hidden="true"
                  className="relative z-10 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
