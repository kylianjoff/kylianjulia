import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Dossier des posts Markdown
const postsDir = path.resolve('src/assets/blogs');

// Fichier JSON généré
const outputFile = path.resolve('src/assets/blog-index.json');

// Vérifie que le dossier existe
if (!fs.existsSync(postsDir)) {
    console.error(`❌ Le dossier ${postsDir} n’existe pas !`);
    process.exit(1);
}

// Lis tous les fichiers .md
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

if (files.length === 0) {
    console.warn(`⚠️ Aucun fichier .md trouvé dans ${postsDir}`);
}

// Génère le tableau de posts
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

  // Crée un extrait des 3 premières lignes non vides
    const excerpt = content
        .split('\n')
        .filter(l => l.trim() !== '')
        .slice(0, 3)
        .join(' ')
        .substring(0, 150) + '...';

    return {
        title: data.title || file,
        date: data.date || '',
        author: data.author || '',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        file,
        thumbnail: data.thumbnail || null
    };
});

// Écrit le JSON
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ Blog index généré : ${outputFile}`);
console.log(`📄 ${posts.length} post(s) trouvé(s)`);