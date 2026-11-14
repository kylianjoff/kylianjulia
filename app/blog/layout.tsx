export const metadata = {
    title: 'Blog — Kylian JULIA',
    description: 'Articles sur le développement web, la cybersécurité et la vie étudiante.',
    alternates: { canonical: '/blog' },
    openGraph: {
        type: 'website',
        url: '/blog',
        title: 'Blog — Kylian JULIA',
        description: 'Articles sur le développement web, la cybersécurité et la vie étudiante.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog — Kylian JULIA',
        description: 'Articles sur le développement web, la cybersécurité et la vie étudiante.',
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
