import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TagBadgeComponent } from '../shared/tag-badge/tag-badge';

interface ProjectPost {
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
  selector: 'app-project-post',
  imports: [RouterLink, TagBadgeComponent],
  templateUrl: './project-post.html',
  styleUrl: './project-post.css'
})
export class ProjectPostComponent {
  post?: ProjectPost;
  safeContent?: SafeHtml;
  loading = true;
  error = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Récupère le slug depuis l'URL
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      
      console.log('Slug récupéré:', slug); // Debug
      
      if (!slug) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.loadPost(slug);
    });
  }

  private loadPost(slug: string) {
    this.http.get<ProjectPost>(`assets/projects/posts-json/${slug}.json`).subscribe({
      next: (post) => {
        this.post = post;
        // Sanitize le HTML pour l'affichage
        this.safeContent = this.sanitizer.sanitize(1, post.content) || '';
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
