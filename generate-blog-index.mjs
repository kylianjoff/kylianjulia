import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.resolve('src/assets/blogs');
const outputFile = path.resolve('src/assets/blog-index.json');
const postsJsonDir = path.resolve('src/assets/blogs/posts-json');

if (!fs.existsSync(postsDir)) {
    console.error(`❌ Le dossier ${postsDir} n'existe pas !`);
    process.exit(1);
}

// Crée le dossier posts-json s'il n'existe pas
if (!fs.existsSync(postsJsonDir)) {
    fs.mkdirSync(postsJsonDir, { recursive: true });
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

if (files.length === 0) {
    console.warn(`⚠️ Aucun fichier .md trouvé dans ${postsDir}`);
}

const posts = files.map(file => {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');

    let data = {};
    let content = '';
    try {
        const parsed = matter(raw);
        data = parsed.data || {};
        content = parsed.content || '';
    } catch (err) {
        console.warn(`⚠️ Impossible de parser ${file}: ${err.message}`);
    }

    // Génère le HTML depuis le Markdown
    const htmlContent = marked(content);

    // Génère l'excerpt en HTML
    let excerptHtml = '';
    if (data.excerpt) {
        // ✅ Convertit l'excerpt YAML en HTML avec marked
        excerptHtml = marked(data.excerpt);
    } else {
        // Fallback : crée un extrait depuis le contenu
        const fallbackExcerpt = content
            .split('\n')
            .filter(l => l.trim() !== '' && !l.startsWith('#'))
            .slice(0, 2)
            .join(' ')
            .substring(0, 150) + '...';
        excerptHtml = marked(fallbackExcerpt);
    }

    // Slug = nom du fichier sans .md
    const slug = file.replace('.md', '');

    const post = {
        slug,
        title: data.title || file,
        date: data.date || '',
        author: data.author || '',
        tags: data.tags || [],
        excerpt: excerptHtml, // ✅ HTML au lieu de texte brut
        thumbnail: data.thumbnail || "/miniatures/blog-default.png",
        file: slug,
        content: htmlContent
    };

    // Sauvegarde chaque post individuellement
    fs.writeFileSync(
        path.join(postsJsonDir, `${slug}.json`),
        JSON.stringify(post, null, 2)
    );

    return post;
});

// Écrit le JSON d'index (sans le contenu HTML pour alléger)
const index = posts.map(({ content, ...post }) => post);
fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));

console.log(`✅ Blog index généré : ${outputFile}`);
console.log(`✅ ${posts.length} post(s) généré(s) dans ${postsJsonDir}`);