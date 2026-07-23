"use client"

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";

interface ContactFormProps {
    subject?: string;
}

export default function ContactForm({
    subject,
}: ContactFormProps) {

    const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    const DELAY_MIN_MS = 3000;

    const lastSubmitRef = useRef(0);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        toast.info("Envoi du message...");

        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const botField = data.get("bot-field")?.toString() ?? "";

        if (botField) {
            toast.warning("Spam détecté.");
            return;
        }

        const firstName = data.get("firstName")?.toString() ?? "";
        const lastName = data.get("lastName")?.toString() ?? "";
        const email = data.get("email")?.toString() ?? "";
        const subject = data.get("subject")?.toString() ?? "";
        const message = data.get("message")?.toString() ?? "";

        if (!firstName || !lastName || !email || !subject || !message) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        const now = Date.now();

        if ( now - lastSubmitRef.current < DELAY_MIN_MS) {
            toast.warning("Veuillez patienter quelques secondes avant de soumettre à nouveau le formulaire.");
            return;
        }

        lastSubmitRef.current = now;

        const body = new URLSearchParams({
            "form-name": "contact",
            "bot-field": "",
            firstName,
            lastName,
            email,
            subject,
            message,
        });

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (response.ok) {
                toast.success("Votre message a été envoyé !");
                form.reset();
                return;
            }
        } catch {}

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (response.ok) {
                toast.success("Votre message a été envoyé !");
                form.reset();
                return;
            }
        } catch {}

        toast.error("Une erreur est survenue lors de l'envoie. Veuillez réessayer plus tard.");
    }

    return (
        <form name="contact" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field" className="bg-background px-8 py-6 rounded-xl border border-border space-y-6">
            <div className="hidden">
                <Label htmlFor="bot-field">Ne pas remplir ce champ</Label>
                <Input type="text" name="bot-field" id="bot-field" />
            </div>
            <div className="flex flex-row gap-6">
                <div className="flex-1">
                    <Label htmlFor="firstName" className="mb-1">Prénom</Label>
                    <Input name="firstName" id="firstName" type="text" required />
                </div>
                <div className="flex-1">
                    <Label htmlFor="lastName" className="mb-1">Nom</Label>
                    <Input name="lastName" id="lastName" type="text" required />
                </div>
            </div>
            <div className="flex-1">
                <Label htmlFor="email" className="mb-1">Email</Label>
                <Input name="email" id="email" type="email" required />
            </div>
            <div className="flex-1">
                <Label htmlFor="subject" className="mb-1">Sujet</Label>
                <Input name="subject" id="subject" type="text" defaultValue={subject} required />
            </div>
            <div className="flex-1">
                <Label htmlFor="message" className="mb-1">Message</Label>
                <Textarea name="message" id="message" rows={5} required className="resize-none w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="flex justify-end">
                <Button type="submit" size="lg" className="">Envoyer</Button>
            </div>
        </form>
    )
}