import Link from "next/link";
import { cheatSheets } from "../datas/cheatsheets";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: 'Cheat Sheets',
    description: 'Fiches mémo et ressources pratiques de Kylian JULIA sur le développement et la cybersécurité.',
    alternates: { canonical: '/cheatsheets' },
    openGraph: {
        type: 'website',
        url: '/cheatsheets',
        title: 'Cheat Sheets — Kylian JULIA',
        description: 'Fiches mémo et ressources pratiques de Kylian JULIA sur le développement et la cybersécurité.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cheat Sheets — Kylian JULIA',
        description: 'Fiches mémo et ressources pratiques de Kylian JULIA sur le développement et la cybersécurité.',
    },
};

export default function CheatsheetsPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12 flex items-center gap-5">
                <h1 className="text-4xl font-bold text-white">Cheat Sheets</h1>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-muted">
                    {cheatSheets.length} cheat sheet{cheatSheets.length !== 1 ? 's' : ''}
                </span>
            </div>

            {cheatSheets.length === 0 ? (
                <p className="text-muted text-center py-24">Aucune cheat sheet pour le moment.</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {cheatSheets.map(sheet => (
                        <Link
                            key={sheet.file}
                            target="_blank"
                            href={`/${sheet.file}`}
                            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
                                    {sheet.title}
                                </h2>
                                <time className="shrink-0 font-mono text-xs text-muted pt-1">{sheet.date}</time>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-sm leading-relaxed text-muted line-clamp-2">{sheet.description}</p>
                                <Badge variant="secondary" className="shrink-0 font-mono text-xs p-4">
                                    {sheet.language}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-end text-xs text-muted/60 mt-1">
                                <span className="group-hover:text-primary transition-colors">Ouvrir →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    )
}