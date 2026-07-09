interface CheatSheet {
    title: string;
    description: string;
    file: string;
    language: string;
    date: string;
}

const cheatSheets: CheatSheet[] = [
    {
        title: 'Cheat Sheet Diesel ORM V1 - FR',
        description: 'Cheat Sheet de l\'ORM Diesel en français',
        file: 'cheatsheets/DieselRust_v1_fr.pdf',
        language: 'Diesel ORM',
        date: '16/03/2026'
    },
    {
        title: 'Cheat Sheet RUST V1 - FR',
        description: 'Première version de la cheat sheet RUST en français',
        file: 'cheatsheets/Rust_v1_fr.pdf',
        language: 'RUST',
        date: '10/03/2026'
    },
    {
        title: 'Cheat Sheet Tailwind CSS V1 - FR',
        description: 'Première version de la cheat sheet Tailwind CSS en français',
        file: 'cheatsheets/TailwindCSS_v1_fr.pdf',
        language: 'Tailwind CSS',
        date: '10/03/2026'
    }
]

export const languageClassMap: Record<string, string> = {
    'RUST': 'lang-rust',
    'Tailwind CSS': 'lang-tailwind',
    'Diesel ORM': 'lang-diesel',
};