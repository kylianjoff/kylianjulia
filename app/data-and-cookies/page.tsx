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
            "Le site collecte uniquement les données que vous transmettez volontairement. Le formulaire de contact collecte votre prénom, votre nom, votre adresse e-mail, le sujet et le contenu de votre message. Le formulaire de newsletter collecte uniquement votre adresse e-mail. Les champs anti-spam sont utilisés pour la sécurité et ne sont pas exploités à d'autres fins.",
    },
    {
        titre: "Finalités et bases légales",
        contenu:
            "Les données du formulaire de contact sont traitées pour répondre à vos demandes. La base légale est l'intérêt légitime (article 6.1.f RGPD) et, selon le contexte de votre demande, l'exécution de mesures précontractuelles ou contractuelles (article 6.1.b RGPD). L'adresse e-mail fournie pour la newsletter est destinée à l'envoi d'actualités et de mises à jour du site, sur la base de votre démarche volontaire et de votre consentement (article 6.1.a RGPD). Vous pouvez retirer ce consentement à tout moment.",
    },
    {
        titre: "Destinataires et sous-traitants",
        contenu:
            "Les données des formulaires de contact et de newsletter sont transmises à Netlify Forms pour recevoir et traiter les soumissions. Un mécanisme de secours via Formspree peut être utilisé en cas d'indisponibilité de Netlify, si ce service est configuré. Ces prestataires agissent en tant que sous-traitants techniques. Les données ne sont ni vendues ni cédées à des tiers à des fins commerciales.",
    },
    {
        titre: "Transferts hors Union européenne",
        contenu:
            "Selon la localisation des infrastructures de nos prestataires techniques, certaines données peuvent être transférées hors de l'Union européenne. Dans ce cas, les transferts sont encadrés par les mécanismes prévus par le RGPD (par exemple clauses contractuelles types ou décision d'adéquation, selon le fournisseur).",
    },
    {
        titre: "Durée de conservation",
        contenu:
            "Les données de contact sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées pour une durée maximale de 12 mois après le dernier échange, sauf obligation légale contraire. L'adresse e-mail utilisée pour la newsletter est conservée par le prestataire concerné jusqu'à votre désinscription ou votre demande d'effacement. L'application ne définit pas de durée automatique supplémentaire.",
    },
    {
        titre: "Cookies utilisés sur ce site",
        contenu:
            "Le site utilise deux cookies techniques de session : l'un mémorise la fermeture du modal d'information sur les cookies et l'autre mémorise la fermeture du modal de dernière actualité ou de recherche d'emploi suivant lequel est actif. Ils servent uniquement au fonctionnement de l'interface et ne sont pas utilisés à des fins publicitaires. L'inscription à la newsletter ne dépose pas de cookie dédié. Aucun cookie publicitaire ni traceur de profilage n'est utilisé.",
    },
    {
        titre: "Gestion du consentement cookies",
        contenu:
            "Lorsque les traceurs sont strictement nécessaires au service demandé par l'utilisateur, ils peuvent être exemptés de consentement préalable selon les règles applicables. Si de nouveaux cookies non essentiels sont ajoutés (mesure d'audience non exemptée, personnalisation avancée, marketing), un mécanisme de consentement préalable sera mis en place avant leur dépôt.",
    },
    {
        titre: "Newsletter",
        contenu:
            "Le site propose un formulaire d'inscription à la newsletter sur les pages du blog. Il collecte uniquement votre adresse e-mail afin de vous envoyer les dernières nouvelles et mises à jour. La soumission est traitée par l'API du site, puis transmise à Netlify Forms ou, en solution de secours, à Formspree. Vous pouvez demander votre désinscription ou l'effacement de votre adresse via le formulaire de contact. Aucun autre profil n'est créé à partir de cette inscription.",
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
            "Cette politique peut évoluer pour tenir compte des changements techniques, fonctionnels ou réglementaires. Dernière mise à jour : 27 août 2026.",
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