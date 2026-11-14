"use client";

import { useEffect, useRef, useState } from "react";
import { GitCommit, FolderGit2, Cpu } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface StatDef {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
  delay: number;
}

// ─── Données ───────────────────────────────────────────────────────────────

const STATS: StatDef[] = [
    {
        icon: FolderGit2,
        value: 8,
        suffix: "+",
        label: "Projets réalisés",
        sub: "perso · école · open source",
        color: "#3b82f6",
        delay: 120,
    },
    {
        icon: Cpu,
        value: 20,
        suffix: "+",
        label: "Technologies",
        sub: "langages · frameworks · outils",
        color: "#a855f7",
        delay: 240,
    },
    {
        icon: GitCommit,
        value: 600,
        suffix: "+",
        label: "Contributions Git (dernière année)",
        sub: "commits & pull requests",
        color: "#22c55e",
        delay: 0,
    },
];

// ─── Carte individuelle ────────────────────────────────────────────────────

function StatCard({
  stat,
  triggered,
}: {
  stat: StatDef;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  // Déclencher avec le délai de stagger
  useEffect(() => {
    if (!triggered) return;
    const timer = setTimeout(() => setVisible(true), stat.delay);
    return () => clearTimeout(timer);
  }, [triggered, stat.delay]);

  // Animation count-up
  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;
    const duration = 1500;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * stat.value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, stat.value]);

  const Icon = stat.icon;

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 flex flex-col gap-3
                 transition-all duration-300 ease-out
                 hover:-translate-y-0.5 hover:shadow-xl hover:border-opacity-60"
      style={
        {
          "--stat-color": stat.color,
          "--stat-color-faint": `${stat.color}18`,
          "--stat-color-border": `${stat.color}40`,
          transition: `opacity 0.5s ease ${stat.delay}ms, transform 0.5s ease ${stat.delay}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
        } as React.CSSProperties
      }
    >
      {/* Glow de fond */}
      <div
        className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: stat.color }}
      />

      {/* Ligne d'accent en haut */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full rounded-t-xl transition-all duration-500"
        style={{ background: `linear-gradient(to right, ${stat.color}, transparent)` }}
      />

      {/* Icône */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${stat.color}18` }}
      >
        <Icon className="w-4 h-4" style={{ color: stat.color }} />
      </div>

      {/* Nombre */}
      <div className="flex items-end gap-0.5 leading-none">
        <span className="text-4xl font-bold tracking-tight tabular-nums">
          {count.toLocaleString("fr-FR")}
        </span>
        <span
          className="text-2xl font-bold mb-0.5"
          style={{ color: stat.color }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{stat.label}</span>
        <span className="text-xs text-muted">{stat.sub}</span>
      </div>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────

export default function StatsCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="grid grid-cols-2 gap-4"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className={i === STATS.length - 1 ? "col-span-2" : ""}>
          <StatCard stat={stat} triggered={triggered} />
        </div>
      ))}
    </div>
  );
}
