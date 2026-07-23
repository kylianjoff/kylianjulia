import ContactForm from "@/components/contact-form";

export default function ContactSection() {
    return (
        <section className="py-28 px-6 bg-card border-t border-border/40">
            <div className="max-w-5xl mx-auto">
                <div className="mb-16 flex items-center gap-5">
                    <h2 className="text-3xl font-bold">Contact</h2>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <ContactForm />
            </div>
        </section>
    )
}