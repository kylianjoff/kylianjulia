import {
    BriefcaseBusiness,
    CalendarDays,
    Clock3,
    Globe2,
    Languages,
    MapPin,
    ArrowUpRight,
    FileText,
    X,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { jobSeeking } from "../app/datas/jobSeeking";

interface JobSeeking {
    onClose: () => void;
}

export default function JobSeekingModal({
    onClose,
}: JobSeeking) {
    function openCV(lang: 'fr' | 'en') {
        const cvUrl = `/cv/cv-${lang}.pdf`;
        window.open(cvUrl, '_blank');
    }

    function goToAboutPage() {
        window.open('/about', '_blank');
    }

    return (
        <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-seeking-modal-title"
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-hidden border-primary/20 bg-background shadow-2xl shadow-black/40 animate-in fade-in-0 zoom-in-95 duration-200 sm:max-h-[calc(100dvh-3rem)]"
        >
            <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/60 px-6 py-5">
                <div className="space-y-1">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                        Disponible prochainement
                    </p>
                    <CardTitle id="job-seeking-modal-title" className="text-2xl font-bold tracking-tight">
                        Recherche de stage
                    </CardTitle>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Fermer la fenêtre"
                    onClick={onClose}
                    className="-mr-2 -mt-2 shrink-0 text-muted-foreground hover:text-foreground"
                >
                    <X aria-hidden="true" />
                </Button>
            </CardHeader>

            <CardContent className="job-seeking-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoItem icon={BriefcaseBusiness} label="Type de contrat" value={jobSeeking.typeContrat} />
                    <InfoItem icon={Clock3} label="Durée" value={jobSeeking.duree} />
                    <InfoItem icon={CalendarDays} label="Disponibilité" value={jobSeeking.disponibilite} />
                    <InfoItem icon={MapPin} label="Localisation" values={jobSeeking.localisations} />
                </div>

                <TagGroup icon={Globe2} label="Domaines recherchés" values={jobSeeking.domaines} />
                <TagGroup icon={Languages} label="Langues" values={jobSeeking.langues} />

                {jobSeeking.description?.map((paragraph, index) => (
                    <p key={index} className="border-l-2 border-primary/50 pl-4 text-sm leading-relaxed text-muted-foreground">
                        {paragraph}
                    </p>
                ))}

                <div className="border-t border-border/60 pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Consulter mon parcours
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        <Button variant="outline" className="justify-start hover:cursor-pointer" onClick={() => openCV('fr')}>
                            <FileText aria-hidden="true" />
                            CV français
                        </Button>
                        <Button variant="outline" className="justify-start hover:cursor-pointer" onClick={() => openCV('en')}>
                            <FileText aria-hidden="true" />
                            English resume
                        </Button>
                        <Button className="justify-start hover:cursor-pointer" onClick={goToAboutPage}>
                            <ArrowUpRight aria-hidden="true" />
                            En savoir plus
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function InfoItem({
    icon: Icon,
    label,
    value,
    values,
}: {
    icon: typeof BriefcaseBusiness;
    label: string;
    value?: string;
    values?: string[];
}) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/10 p-3">
            <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{value ?? values?.join(", ")}</p>
            </div>
        </div>
    );
}

function TagGroup({
    icon: Icon,
    label,
    values,
}: {
    icon: typeof Globe2;
    label: string;
    values: string[];
}) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {values.map((item) => (
                    <span key={item} className="rounded-lg border border-border/60 bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}