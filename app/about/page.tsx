"use client";

import Link from "next/link";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import {
    formations,
    experiences,
    associations,
    profileDescription,
    skills,
} from "@/app/datas/about";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CVPage } from "./components/cv";
import { ContactModal } from "./components/contact";
import { CertificationsSection } from "./components/certifications";
import { Menu, X } from "lucide-react";

export const metaDate = {
    title: "À propos de Kylian JULIA",
    description:
        "Découvrez le parcours, les compétences et les expériences de Kylian JULIA.",
};

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
        { id: "profil", label: "Profil" },
        { id: "formations", label: "Formations" },
        { id: "experiences", label: "Expériences" },
        { id: "competences", label: "Compétences" },
        { id: "certifications", label: "Certifications" },
        { id: "associatif", label: "Associatif" },
        { id: "cv", label: "CV" },
    ];

    const [activeSection, setActiveSection] = useState("profil");
    const [activeAssociation, setActiveAssociation] = useState("");
    const [associationHovered, setAssociationHovered] = useState("");
    const [cvOpen, setCvOpen] = useState(false);
    const [cvLang, setCvLang] = useState<"fr" | "en">("fr");
    const [contactOpen, setContactOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    )[0];

                if (visibleEntry) {
                    setActiveSection(visibleEntry.target.id);
                }
            },
            {
                rootMargin: "-120px 0px -45% 0px",
                threshold: [0.1, 0.25, 0.5, 0.75],
            }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);

            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleNavigation = () => {
        setMobileNavOpen(false);
    };

    return (
        <>
            {/* =========================
                Navigation desktop
            ========================== */}
            <aside
                className="
                    fixed
                    left-6
                    top-1/2
                    z-40
                    hidden
                    -translate-y-1/2
                    xl:block
                "
            >
                <Card className="w-48 rounded-2xl p-2 shadow-lg shadow-primary/10">
                    <nav aria-label="Navigation de la page">
                        <ul className="space-y-1">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <Link
                                        href={`/about#${section.id}`}
                                        className={cn(
                                            "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                                            activeSection === section.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted hover:bg-muted/20 hover:text-primary"
                                        )}
                                    >
                                        {section.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Card>
            </aside>

            {/* =========================
                Navigation mobile
            ========================== */}
            <div className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] -translate-x-1/2 xl:hidden">
                <Card className="overflow-hidden rounded-2xl shadow-xl shadow-primary/10">
                    <button
                        type="button"
                        onClick={() => setMobileNavOpen((open) => !open)}
                        className="
                            flex
                            w-full
                            items-center
                            justify-between
                            px-4
                            py-3
                            text-sm
                            font-semibold
                        "
                        aria-expanded={mobileNavOpen}
                        aria-label={
                            mobileNavOpen
                                ? "Fermer la navigation"
                                : "Ouvrir la navigation"
                        }
                    >
                        <span>Navigation</span>

                        {mobileNavOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    {mobileNavOpen && (
                        <nav
                            aria-label="Navigation mobile"
                            className="border-t border-border p-2"
                        >
                            <ul className="grid grid-cols-2 gap-1">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <Link
                                            href={`/about#${section.id}`}
                                            onClick={handleNavigation}
                                            className={cn(
                                                "block rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition-colors",
                                                activeSection === section.id
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted hover:bg-muted/20 hover:text-primary"
                                            )}
                                        >
                                            {section.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </Card>
            </div>

            {/* =========================
                Contenu
            ========================== */}
            <main className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-6 lg:ml-[calc(50%_-_28rem)] lg:mr-auto lg:px-6">
                {/* Profil */}
                <section
                    id="profil"
                    className="scroll-mt-28 flex flex-col gap-6"
                >
                    <div className="mb-8 flex items-center gap-4 sm:mb-12 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Profil
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="relative flex min-h-0 flex-col gap-6 lg:min-h-[400px] lg:block">
                        <div className="w-full overflow-hidden rounded-3xl lg:ml-auto lg:w-[50%]">
                            <img
                                src="/images/profile.png"
                                alt="Profile"
                                width={400}
                                height={400}
                                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        <div
                            className="
                                relative
                                w-full
                                rounded-3xl
                                bg-background/70
                                p-6
                                backdrop-blur-md
                                lg:absolute
                                lg:left-0
                                lg:top-0
                                lg:h-full
                                lg:w-[60%]
                                lg:p-8
                            "
                        >
                            <div className="space-y-4">
                                {profileDescription.map((line, index) => (
                                    <p
                                        key={index}
                                        className="leading-7 text-muted-foreground"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formations */}
                <section
                    id="formations"
                    className="mt-16 scroll-mt-28 flex flex-col gap-6"
                >
                    <div className="mb-8 flex items-center gap-4 sm:mb-12 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Formations
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <Timeline items={formationsItems} />
                </section>

                {/* Expériences */}
                <section
                    id="experiences"
                    className="mt-16 scroll-mt-28 flex flex-col gap-6"
                >
                    <div className="mb-8 flex items-center gap-4 sm:mb-12 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Expériences
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <Timeline items={experiencesItems} />
                </section>

                {/* Compétences */}
                <section
                    id="competences"
                    className="mt-16 scroll-mt-28 flex flex-col gap-8"
                >
                    <div className="mb-4 flex items-center gap-4 sm:mb-8 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Compétences
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {skills.map((category, index) => (
                            <Card
                                key={index}
                                className="flex flex-col gap-4 rounded-2xl p-5 sm:p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
                                        {category.titre}
                                    </h2>

                                    <div className="h-px flex-1 bg-border/40" />

                                    <span className="text-xs tabular-nums text-muted-foreground">
                                        {category.skills.length}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="
                                                group
                                                flex
                                                items-center
                                                gap-2
                                                rounded-lg
                                                border
                                                border-border/40
                                                bg-muted/20
                                                px-3
                                                py-1.5
                                                transition-all
                                                duration-200
                                                hover:border-border
                                                hover:bg-muted/50
                                            "
                                        >
                                            {s.logo && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={s.logo}
                                                    alt={s.titre}
                                                    width={16}
                                                    height={16}
                                                    className="h-4 w-4 shrink-0 object-contain"
                                                />
                                            )}

                                            <span className="whitespace-nowrap text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                                {s.titre}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section
                    id="certifications"
                    className="mt-16 scroll-mt-28 flex flex-col gap-6"
                >
                    <CertificationsSection />
                </section>

                {/* Associatif */}
                <section
                    id="associatif"
                    className="mt-16 scroll-mt-28 flex flex-col gap-6"
                >
                    <div className="mb-8 flex items-center gap-4 sm:mb-12 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            Associatif
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                        {associations.map((association) => (
                            <Button
                                key={association.name}
                                variant="outline"
                                className="h-24 w-24 rounded-xl p-4 sm:h-30 sm:w-30"
                                onClick={() =>
                                    setActiveAssociation(association.name)
                                }
                                onMouseEnter={() =>
                                    setAssociationHovered(
                                        association.name
                                    )
                                }
                                onMouseLeave={() =>
                                    setAssociationHovered("")
                                }
                            >
                                <img
                                    src={`/${association.logo}`}
                                    alt={association.name}
                                    width={64}
                                    height={64}
                                    className={cn(
                                        "rounded-xl transition-transform duration-300",
                                        associationHovered === association.name
                                            ? "scale-100 opacity-80"
                                            : activeAssociation ===
                                                association.name
                                              ? "scale-100 opacity-100"
                                              : "scale-90 opacity-50"
                                    )}
                                />
                            </Button>
                        ))}
                    </div>

                    {activeAssociation && (
                        <Card className="mt-6 rounded-2xl p-5 sm:p-6">
                            {associations
                                .filter(
                                    (association) =>
                                        association.name === activeAssociation
                                )
                                .map((association) => (
                                    <div key={association.name}>
                                        <h2 className="text-xl font-bold text-white sm:text-2xl">
                                            {association.name}
                                        </h2>

                                        <p className="mt-2 text-muted">
                                            {association.description}
                                        </p>

                                        <p className="mt-2 text-muted">
                                            <strong>Rôle :</strong>{" "}
                                            {association.role}
                                        </p>

                                        {association.details && (
                                            <ul className="mt-4 list-inside list-disc text-muted">
                                                {association.details.map(
                                                    (detail, idx) => (
                                                        <li key={idx}>
                                                            {detail}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                        </Card>
                    )}
                </section>

                {/* CV */}
                <section
                    id="cv"
                    className="mt-16 scroll-mt-28 flex flex-col gap-6 pb-24 lg:pb-0"
                >
                    <div className="mb-8 flex items-center gap-4 sm:mb-12 sm:gap-5">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl">
                            CV
                        </h1>

                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                        <Card className="flex w-full flex-col gap-4 rounded-xl p-5 sm:p-6 sm:w-[65%]">
                            <h2 className="text-xl font-bold text-white sm:text-2xl">
                                Mon CV en format PDF
                            </h2>

                            <p className="text-muted">
                                Vous pouvez consulter mon CV en format PDF.
                                Mes informations de contact sont masquées,
                                veuillez utiliser le{" "}
                                <Button
                                    variant="secondary"
                                    className="h-auto px-2 py-1 font-semibold"
                                    onClick={() => setContactOpen(true)}
                                >
                                    formulaire de contact
                                </Button>
                                .
                            </p>
                        </Card>

                        <Card className="flex w-full flex-col gap-4 rounded-xl p-5 sm:p-6 sm:w-[35%]">
                            <Button
                                className="font-semibold"
                                onClick={() => {
                                    setCvOpen(true);
                                    setCvLang("fr");
                                }}
                            >
                                Mon CV Français
                            </Button>

                            <Button
                                className="font-semibold"
                                onClick={() => {
                                    setCvOpen(true);
                                    setCvLang("en");
                                }}
                            >
                                My English Resume
                            </Button>
                        </Card>
                    </div>
                </section>
            </main>

            {/* Modale CV */}
            {cvOpen && (
                <CVPage
                    lang={cvLang}
                    open={cvOpen}
                    onClose={() => setCvOpen(false)}
                />
            )}

            {/* Modale contact */}
            {contactOpen && (
                <ContactModal
                    open={contactOpen}
                    onClose={() => setContactOpen(false)}
                    subject={"Demande de contact depuis la section CV"}
                />
            )}
        </>
    );
}