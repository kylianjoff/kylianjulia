// Types partagés par les composants blog. Les données réelles viennent des Netlify Functions
// (/api/blog/index, /api/blog/post), alimentées par netlify/functions/blog-sync.mts.

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    thumbnail: string | null;
}

export interface BlogPost extends BlogPostMeta {
    content: string; // markdown brut
}
