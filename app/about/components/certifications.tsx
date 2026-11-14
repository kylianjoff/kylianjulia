import { certifications } from "@/app/datas/about";
import { Card } from "@/components/ui/card";

export function CertificationsSection() {
    return (
        <>
            <div className="mb-8 flex items-center gap-5">
                <h1 className="text-4xl font-bold text-white">Certifications</h1>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certifications.map((certification, index) => (
                    <Card key={index} className="flex flex-col gap-4 p-6 rounded-2xl">
                        <div className="flex items-start gap-4">
                            {certification.logo && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={`/${certification.logo}`}
                                    alt={certification.nom}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 shrink-0 object-contain"
                                />
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-base font-semibold uppercase tracking-wide text-white">
                                        {certification.nom}
                                    </h2>
                                    {certification.dateObtention && (
                                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                                            {certification.dateObtention}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {certification.organisme}
                                </p>
                            </div>
                        </div>
                        {certification.details && (
                            <div className="flex flex-wrap gap-2">
                                {certification.details.map((detail, detailIndex) => (
                                    <span
                                        key={detailIndex}
                                        className="rounded-lg border border-border/40 bg-muted/20 px-3 py-1.5 text-sm text-muted-foreground"
                                    >
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </>
    )
}