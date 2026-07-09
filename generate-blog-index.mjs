import fs from 'fs';
import path from 'path';

// ─── Chemins ──────────────────────────────────────────────────────────────────

const postsDir     = path.resolve('public/posts');
const outputFile   = path.resolve('public/blog-index.json');
const postsDataDir = path.resolve('public/posts-data');

if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log(`📁 Dossier créé : ${postsDir}`);
    console.log('   Ajoutez vos fichiers .md puis relancez le script.');
    process.exit(0);
}

if (!fs.existsSync(postsDataDir)) {
    fs.mkdirSync(postsDataDir, { recursive: true });
}

// ─── Parser frontmatter YAML ──────────────────────────────────────────────────

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw.trim() };

    const data = {};
    for (const line of match[1].split('\n')) {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) continue;
        const key = line.slice(0, colonIdx).trim();
        let   val = line.slice(colonIdx + 1).trim();

        // Tableau : ["a", "b"]
        const arrMatch = val.match(/^\[(.+)\]$/);
        if (arrMatch) {
            data[key] = arrMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
            continue;
        }
        data[key] = val.replace(/^["']|["']$/g, '');
    }

    // Normalise les fins de ligne Windows (\r\n) et Mac (\r) → Unix (\n)
    const content = match[2].trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    return { data, content };
}

// ─── Excerpt de secours ───────────────────────────────────────────────────────

function makeExcerpt(content, max = 160) {
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

// ─── Traitement des fichiers .md ──────────────────────────────────────────────

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

if (files.length === 0) {
    console.warn('⚠️  Aucun fichier .md trouvé dans', postsDir);
}

const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');

    const post = {
        slug,
        title:     data.title     || slug,
        date:      data.date      || '',
        author:    data.author    || '',
        tags:      Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
        excerpt:   data.excerpt   || makeExcerpt(content),
        thumbnail: data.thumbnail || null,
        content,  // markdown brut — rendu dans Next.js via lib/markdown.tsx
    };

    fs.writeFileSync(
        path.join(postsDataDir, `${slug}.json`),
        JSON.stringify(post, null, 2),
        'utf8'
    );

    console.log(`  ✓ ${slug}`);
    return post;
});

// Tri par date décroissante (format dd/MM/yyyy)
posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    const [da, ma, ya] = a.date.split('/').map(Number);
    const [db, mb, yb] = b.date.split('/').map(Number);
    return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
});

// Index sans le contenu (pour alléger la liste)
const index = posts.map(({ content, ...meta }) => meta);
fs.writeFileSync(outputFile, JSON.stringify(index, null, 2), 'utf8');

console.log(`\n✅ ${posts.length} article(s) traité(s)`);
console.log(`   Index → ${outputFile}`);
console.log(`   Posts → ${postsDataDir}/`);

