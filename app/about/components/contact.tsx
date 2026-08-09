"use client"

import ContactForm from "@/components/contact-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ContactModalProps {
    open: boolean;
    onClose?: () => void;
}

export function ContactModal({
    open,
    onClose,
}: ContactModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-[60vw] max-w-[60vw] sm:max-w-[80vw] min-h-[60vh] gap-2">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Formulaire de contact
                    </DialogTitle>
                </DialogHeader>
                <ContactForm />
            </DialogContent>
        </Dialog>
    )
}