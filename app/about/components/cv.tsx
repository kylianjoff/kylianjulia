"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CVPageProps {
    lang: 'fr' | 'en';
    open: boolean;
    onClose?: () => void;
}

export function CVPage({
    lang,
    open,
    onClose,
}: CVPageProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-[80vw] max-w-[80vw] sm:max-w-[80vw] h-[80vh] gap-2">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {lang === 'fr' ? 'Mon CV' : 'My Resume'}
                    </DialogTitle>
                </DialogHeader>
                <iframe
                    src={`cv/cv-${lang}.pdf`}
                    className="w-full flex-1 rounded-lg"
                    title={lang === 'fr' ? 'Mon CV' : 'My Resume'}
                />
            </DialogContent>
        </Dialog>
    )
}