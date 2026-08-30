 "use client"
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NewsletterForm() {
    const DELAY_MIN_MS = 3000;
    const lastSubmitRef = useRef(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);
        const botField = data.get("bot-field")?.toString() ?? "";

        if (botField) {
            toast.warning("Spam détecté.");
            return;
        }

        const email = data.get("email")?.toString() ?? "";

        if (!email) {
            toast.error("Veuiller fournir un email.");
            return;
        }

        const now = Date.now();

        if (now - lastSubmitRef.current < DELAY_MIN_MS) {
            toast.warning("Veuillez patienter quelques secondes avant de soumettre à nouveau le formulaire.");
            return;
        }

        lastSubmitRef.current = now;
        setIsSubmitting(true);
        toast.info("Envoi de l'inscription...");

        try {
            const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID_NEWSLETTER}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data
            });

            if (response.ok) {
                toast.success("Votre inscription à la newsletter a été prise en compte !");
                form.reset();
                return;
            }

            const errorData = await response.json().catch(() => null);
            toast.error(errorData?.error ?? "Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.");
        } catch {
            toast.error("Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form name="newsletter" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field" className="flex flex-col gap-4 mb-4 border border-border rounded-2xl bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-2xl font-bold text-center">Inscrivez-vous à la newsletter</h1>
                <p className="text-sm text-muted text-center">Recevez les dernières nouvelles et mises à jour directement dans votre boîte mail.</p>
            </div>
            <div className="hidden">
                <Label htmlFor="bot-field">Ne pas remplir ce champ</Label>
                <Input type="text" name="bot-field" id="bot-field" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Input type="email" name="email" id="email" placeholder="Votre email" required />
                <Button type="submit" size="lg" className="" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                </Button>
            </div>
        </form>
    );
}