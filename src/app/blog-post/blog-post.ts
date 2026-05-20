import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TagBadgeComponent } from '../shared/tag-badge/tag-badge';
import { SeoService } from '../services/seo.service';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  thumbnail: string | null;
  content: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, TagBadgeComponent],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css']
})
export class BlogPostComponent implements OnInit {
  post?: BlogPost;
  safeContent?: SafeHtml;
  loading = true;
  error = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      
      if (!slug) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.loadPost(slug);
    });
  }

  private loadPost(slug: string) {
    this.http.get<BlogPost>(`assets/blogs/posts-json/${slug}.json`).subscribe({
      next: (post) => {
        this.post = post;

        const description = SeoService.stripHtml(post.excerpt).substring(0, 160);
        const imageUrl = post.thumbnail
          ? post.thumbnail.startsWith('http') ? post.thumbnail : `https://kylianjulia.fr${post.thumbnail}`
          : 'https://kylianjulia.fr/profil.jpeg';

        this.seo.update({
          title: post.title,
          description,
          url: `/blog/${slug}`,
          image: imageUrl,
          type: 'article',
          keywords: post.tags.join(', '),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            image: imageUrl,
            url: `https://kylianjulia.fr/blog/${slug}`,
            datePublished: SeoService.toISODate(post.date),
            author: {
              '@type': 'Person',
              name: post.author,
              url: 'https://kylianjulia.fr/about'
            },
            publisher: {
              '@type': 'Person',
              name: 'Kylian JULIA',
              url: 'https://kylianjulia.fr'
            },
            keywords: post.tags.join(', '),
            inLanguage: 'fr-FR'
          }
        });

        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(post.content) || '';
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement post:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}