"use client"

import Link from "next/link";
import Image from "next/image";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { formations, experiences, associations, profileDescription, skills } from "@/app/datas/about";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CVPage } from "./components/cv";

export const metaDate = {
    title: "À propos de Kylian JULIA",
    description: "Découvrez le parcours, les compétences et les expériences de Kylian JULIA.",
}

const formationsItems: TimelineItem[] = formations.map((f) => ({
    title: f.nom,
    subtitle: `${f.ecole} — ${f.lieu}`,
    period: f.periode,
    description: f.description,
}));

const experiencesItems: TimelineItem[] = experiences.map((e) => ({
    title: e.nom,
    subtitle: e.lieu,
    period: e.periode,
    details: e.details,
}));

export default function AboutPage() {
    const sections = [
        "profil",
        "formations",
        "experiences",
        "competences",
        "associatif",
        "CV",
    ];

    const [activeSection, setActiveSection] = useState("profil");
    const [activeAssociation, setActiveAssociation] = useState("");
    const [associationHovered, setAssociationHovered] = useState("");
    const [cvOpen, setCvOpen] = useState(false);
    const [cvLang, setCvLang] = useState<"fr" | "en">("fr");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Card className="fixed top-[100px] left-[10%] z-50 w-44 p-2 rounded-2xl">
                <nav>
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/about#profil"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "profil"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                Profil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about#formations"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "formations"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                Formations
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about#experiences"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "experiences"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                Expériences
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about#competences"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "competences"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                Compétences
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about#associatif"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "associatif"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                Associatif
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about#CV"
                                className={cn(
                                    "block rounded-md px-3 py-2 transition-colors font-semibold text-muted",
                                    activeSection === "CV"
                                        ? "text-primary"
                                        : "hover:text-primary"
                                )}
                            >
                                CV
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Card>

            <main className="max-w-4xl mx-auto px-6 py-16">
                <section className="flex flex-col gap-6" id="profil">
                    <div className="mb-12 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">Profil</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="relative flex items-center min-h-[400px]">
                        <div className="ml-auto w-[50%] overflow-hidden rounded-3xl">
                            <Image
                                src="/images/profile.png"
                                alt="Profile"
                                width={400}
                                height={400}
                                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        <div className="absolute left-0 w-[60%] h-full rounded-3xl bg-background/70 p-8 backdrop-blur-md">
                            <div className="space-y-4">
                                {profileDescription.map((line, index) => (
                                    <p key={index} className="text-muted-foreground leading-7">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>

                <section className="flex flex-col gap-6" id="formations">
                    <div className="mb-12 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">Formations</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <Timeline items={formationsItems} />
                </section>

                <section className="flex flex-col gap-6 mt-16" id="experiences">
                    <div className="mb-12 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">Expériences</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <Timeline items={experiencesItems} />
                </section>

                <section className="flex flex-col gap-8 mt-16" id="competences">
                    <div className="mb-8 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">Compétences</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {skills.map((category, index) => (
                            <Card key={index} className="flex flex-col gap-4 p-6 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-base font-semibold text-white tracking-wide uppercase">{category.titre}</h2>
                                    <div className="h-px flex-1 bg-border/40" />
                                    <span className="text-xs text-muted-foreground tabular-nums">{category.skills.length}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex items-center gap-2 bg-muted/20 hover:bg-muted/50 border border-border/40 hover:border-border px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                                        >
                                            {s.logo && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={s.logo}
                                                    alt={s.titre}
                                                    width={16}
                                                    height={16}
                                                    className="w-4 h-4 object-contain shrink-0"
                                                />
                                            )}
                                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                                                {s.titre}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-6 mt-16" id="associatif">
                    <div className="mb-12 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">Associatif</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {associations.map((index) => (
                        <Button key={index.name} variant="outline" className="p-4 w-30 h-30 rounded-xl hover:cursor-pointer hover:bg-slate-800" onClick={() => setActiveAssociation(index.name)} onMouseEnter={() => setAssociationHovered(index.name)} onMouseLeave={() => setAssociationHovered("")}>
                                <Image
                                    src={`/${index.logo}`}
                                    alt={index.name}
                                    width={64}
                                    height={64}
                                    className={cn(
                                        "rounded-xl transition-transform duration-300",
                                        associationHovered === index.name
                                            ? "scale-100 opcatity-80"
                                            : activeAssociation == index.name
                                            ? "scale-100 opacity-100"
                                            : "scale-90 opacity-50"
                                    )}
                                />
                            </Button>
                        ))}
                    </div>

                    {activeAssociation && (
                        <Card className="mt-6 p-6 rounded-2xl">
                            {associations.filter((index) => index.name === activeAssociation).map((index) => (
                                <div key={index.name}>
                                    <h2 className="text-2xl font-bold text-white">{index.name}</h2>
                                    <p className="text-muted mt-2">{index.description}</p>
                                    <p className="text-muted mt-2"><strong>Rôle :</strong> {index.role}</p>
                                    {index.details && (
                                        <ul className="mt-4 list-disc list-inside text-muted">
                                            {index.details.map((detail, idx) => (
                                                <li key={idx}>{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </Card>
                    )}
                </section>

                <section className="flex flex-col gap-6 mt-16" id="CV">
                    <div className="mb-12 flex items-center gap-5">
                        <h1 className="text-4xl font-bold text-white">CV</h1>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex flex-row gap-4 w-full">
                        <Card className="flex flex-col gap-4 p-6 rounded-xl w-[65%]">
                            <h2 className="text-2xl font-bold text-white">Mon CV en format PDF</h2>

                        </Card>
                        <Card className="flex flex-col gap-4 p-6 rounded-xl w-[35%]">
                            <Button className="font-semibold" onClick={() => {
                                setCvOpen(true);
                                setCvLang('fr');
                            }}>Mon CV Français</Button>
                            <Button className="font-semibold" onClick={() => {
                                setCvOpen(true);
                                setCvLang('en');
                            }}>My English Resume</Button>
                        </Card>
                    </div>
                </section>
            </main>

            {cvOpen && (
                <CVPage
                    lang={cvLang}
                    open={cvOpen}
                    onClose={() => setCvOpen(false)}
                />
            )}
        </>
        
    )
}