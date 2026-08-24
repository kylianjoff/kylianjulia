import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: 'Données personnelles & cookies',
    description: 'Informations sur le traitement des données personnelles et l\'utilisation des cookies.',
};

interface Article {
    titre?: string,
    contenu: string,
}

const articles: Article[] = [
    {
        titre: "Introduction",
        contenu:
            "Cette page explique comment vos données personnelles sont traitées sur ce site et comment les cookies sont utilisés. Elle est rédigée conformément aux règles applicables en France et dans l'Union européenne, notamment le RGPD (Règlement UE 2016/679), la loi Informatique et Libertés et les recommandations de la CNIL.",
    },
    {
        titre: "Responsable du traitement",
        contenu:
            "Le responsable du traitement est Kylian JULIA. Pour toute question relative à la protection des données personnelles ou pour exercer vos droits, vous pouvez utiliser le formulaire de contact disponible sur ce site.",
    },
    {
        titre: "Données personnelles collectées",
        contenu:
            "Le site collecte uniquement les données que vous transmettez volontairement. Actuellement, cela concerne principalement le formulaire de contact (prénom, nom, e-mail, sujet, message). À ce jour, le système de newsletter n'est pas encore actif : aucune collecte d'e-mail pour newsletter n'est effectuée tant que cette fonctionnalité n'est pas mise en ligne.",
    },
    {
        titre: "Finalités et bases légales",
        contenu:
            "Les données du formulaire de contact sont traitées pour répondre à vos demandes. La base légale est l'intérêt légitime (article 6.1.f RGPD) et, selon le contexte de votre demande, l'exécution de mesures précontractuelles ou contractuelles (article 6.1.b RGPD). Si une newsletter est activée plus tard, l'envoi reposera sur votre consentement explicite (article 6.1.a RGPD), avec possibilité de retrait à tout moment.",
    },
    {
        titre: "Destinataires et sous-traitants",
        contenu:
            "Les données de contact sont traitées via Netlify Forms pour permettre la réception des messages. Un mécanisme de secours via Formspree peut être utilisé en cas d'indisponibilité. Ces prestataires agissent en tant que sous-traitants techniques. Les données ne sont ni vendues ni cédées à des tiers à des fins commerciales.",
    },
    {
        titre: "Transferts hors Union européenne",
        contenu:
            "Selon la localisation des infrastructures de nos prestataires techniques, certaines données peuvent être transférées hors de l'Union européenne. Dans ce cas, les transferts sont encadrés par les mécanismes prévus par le RGPD (par exemple clauses contractuelles types ou décision d'adéquation, selon le fournisseur).",
    },
    {
        titre: "Durée de conservation",
        contenu:
            "Les données de contact sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées pour une durée maximale de 12 mois après le dernier échange sauf obligation légale contraire. Si une newsletter est activée ultérieurement, l'adresse e-mail sera conservée jusqu'au retrait du consentement (désinscription).",
    },
    {
        titre: "Cookies utilisés sur ce site",
        contenu:
            "Le site utilise principalement un cookie technique de session permettant de mémoriser la fermeture du modal d'information sur les cookies. Ce cookie sert au fonctionnement de l'interface et n'est pas utilisé à des fins publicitaires. À ce jour, aucun cookie publicitaire ni traceur de profilage n'est déposé.",
    },
    {
        titre: "Gestion du consentement cookies",
        contenu:
            "Lorsque les traceurs sont strictement nécessaires au service demandé par l'utilisateur, ils peuvent être exemptés de consentement préalable selon les règles applicables. Si de nouveaux cookies non essentiels sont ajoutés (mesure d'audience non exemptée, personnalisation avancée, marketing), un mécanisme de consentement préalable sera mis en place avant leur dépôt.",
    },
    {
        titre: "Projet de modal news et newsletter",
        contenu:
            "Un modal d'actualités pourra être affiché à l'ouverture du site. Tant que ce dispositif n'est pas actif, aucune donnée n'est collectée à ce titre. Lors de sa mise en production, l'inscription éventuelle à la newsletter via Netlify reposera sur votre consentement explicite, avec information claire, lien de désinscription et retrait du consentement à tout moment.",
    },
    {
        titre: "Vos droits",
        contenu:
            "Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et, lorsque applicable, de portabilité de vos données. Vous pouvez également retirer votre consentement à tout moment pour les traitements fondés sur celui-ci. Vous pouvez exercer vos droits via le formulaire de contact. Vous avez aussi le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    },
    {
        titre: "Sécurité des données",
        contenu:
            "Des mesures techniques et organisationnelles raisonnables sont mises en oeuvre pour protéger les données contre les accès non autorisés, la divulgation, l'altération ou la destruction. L'accès aux données est limité aux seules personnes ayant besoin d'en connaître dans le cadre de leurs missions.",
    },
    {
        titre: "Mise à jour de cette politique",
        contenu:
            "Cette politique peut évoluer pour tenir compte des changements techniques, fonctionnels (notamment l'activation future de la newsletter/modal news) ou réglementaires. Dernière mise à jour : 24 août 2026.",
    },
];

export default function DataCookiesPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12 flex items-center gap-5">
                <h1 className="text-4xl font-bold text-white">Données personnelles & cookies</h1>
                <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-5">
                {articles.map(art => (
                    <div key={art.titre} className="flex flex-row gap-2">
                        <Separator className="mr-[12px] border border-border" orientation={"vertical"} />
                        <div className="flex flex-col gap-4">
                            {(art.titre && (
                                <h2 className="text-xl font-semibold">{art.titre}</h2>
                            ))}
                            <p>{art.contenu}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
    
}