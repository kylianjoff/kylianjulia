// Parsing du frontmatter YAML léger + réécriture des chemins d'images vers le proxy /api/blog/image.

export interface PostFrontmatter {
    title?: string;
    date?: string;
    author?: string;
    tags?: string[];
    excerpt?: string;
    thumbnail?: string;
}

export function parseFrontmatter(raw: string): { data: PostFrontmatter; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw.trim() };

    const data: Record<string, string | string[]> = {};
    for (const line of match[1].split('\n')) {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) continue;
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();

        const arrMatch = val.match(/^\[(.+)\]$/);
        if (arrMatch) {
            data[key] = arrMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
            continue;
        }
        data[key] = val.replace(/^["']|["']$/g, '');
    }

    const content = match[2].trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    return { data: data as PostFrontmatter, content };
}

export function makeExcerpt(content: string, max = 160): string {
    const text = content
        .split('\n')
        .filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('```'))
        .join(' ')
        .replace(/\*\*([^*]*)\*\*/g, '$1')
        .replace(/\*([^*]*)\*/g, '$1')
        .replace(/`[^`]*`/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();
    return text.length > max ? text.substring(0, max) + '…' : text;
}

/** Convertit une référence d'image (locale, ou héritée en "assets/blogs/<slug>/foo.png") vers le proxy /api/blog/image. */
export function toImageProxyUrl(slug: string, src: string): string {
    if (/^https?:\/\//.test(src)) return src;
    const file = src.split('/').filter(Boolean).pop() ?? src;
    return `/api/blog/image?slug=${encodeURIComponent(slug)}&file=${encodeURIComponent(file)}`;
}

/** Réécrit toutes les images markdown `![alt](src "title")` d'un article vers le proxy. */
export function rewriteContentImages(content: string, slug: string): string {
    return content.replace(
        /!\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g,
        (_m, alt: string, src: string, title = '') => `![${alt}](${toImageProxyUrl(slug, src)}${title})`
    );
}
