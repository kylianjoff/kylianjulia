import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; // Installe avec: npm install marked

const postsDir = path.resolve('src/assets/blogs');
const outputFile = path.resolve('src/assets/blog-index.json');
const postsJsonDir = path.resolve('src/assets/posts-json');

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

    // Crée un extrait des 3 premières lignes non vides
    const excerpt = content
        .split('\n')
        .filter(l => l.trim() !== '' && !l.startsWith('#'))
        .slice(0, 3)
        .join(' ')
        .substring(0, 150) + '...';

    // Slug = nom du fichier sans .md
    const slug = file.replace('.md', '');

    const post = {
        slug,
        title: data.title || file,
        date: data.date || '',
        author: data.author || '',
        tags: data.tags || [],
        excerpt: data.excerpt || excerpt,
        thumbnail: data.thumbnail || null,
        file: slug,
        content: htmlContent // HTML pré-généré
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