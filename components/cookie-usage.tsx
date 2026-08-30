import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CookieUsageModalProps {
    onOk: () => void;
}

export default function CookieUsageModal({
    onOk,
}: CookieUsageModalProps) {
    return (
        <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            className="fixed bottom-5 left-5 right-5 z-50 w-auto max-w-md border-border/70 bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:bottom-8 sm:left-8 sm:right-auto"
        >
            <CardHeader className="space-y-1 pb-3">
                <CardTitle id="cookie-modal-title" className="text-2xl font-bold tracking-tight">
                    Utilisation des cookies
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Ce site utilise des cookies pour le fonctionnement technique.
                </p>

                <div className="flex flex-col sm:flex-row justify-between gap-2 items-center">
                    <a
                        href="/data-and-cookies"
                        className="inline-block text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        En savoir plus
                    </a>

                    <Button className="w-full sm:w-auto" onClick={onOk}>
                        J&apos;ai compris
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}