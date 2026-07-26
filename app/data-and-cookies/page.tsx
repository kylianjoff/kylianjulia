import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: 'Données personnels & cookies',
    description: 'Informations concernant l\'utilisation de vos données personnelles et des cookies.',
};

interface Article {
    titre?: string,
    contenu: string,
}

const articles: Article[] = [
    {
        titre: "Test1",
        contenu: "Test1",
    },
    {
        contenu: "Test2",
    }
]

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