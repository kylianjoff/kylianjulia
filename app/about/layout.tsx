export const metadata = {
    title: 'À propos',
    description: 'Parcours, formations, expériences et compétences de Kylian JULIA, étudiant ingénieur informatique.',
    alternates: { canonical: '/about' },
    openGraph: {
        type: 'profile',
        url: '/about',
        title: 'À propos — Kylian JULIA',
        description: 'Parcours, formations, expériences et compétences de Kylian JULIA, étudiant ingénieur informatique.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'À propos — Kylian JULIA',
        description: 'Parcours, formations, expériences et compétences de Kylian JULIA, étudiant ingénieur informatique.',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
