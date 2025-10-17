import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import * as yaml from 'js-yaml';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownModule, CommonModule],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css']
})
export class BlogPostComponent implements OnInit {
  postSrc!: string;
  postTitle!: string;
  postDate!: string;
  postAuthor!: string;
  postTags!: string[];
  postThumbnail!: string;
  postExcerpt!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer le paramètre "slug" depuis l'URL
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    const path = `assets/blogs/${slug}`;

    this.http.get(path, { responseType: 'text' }).subscribe(data => {
      const match = /^---\n([\s\S]*?)\n---/.exec(data);
      if (match) {
        const yamlContent = match[1];
        const meta = yaml.load(yamlContent) as any;

        this.postTitle = meta.title;
        this.postDate = meta.date;
        this.postAuthor = meta.author;
        this.postTags = meta.tags;
        this.postThumbnail = meta.thumbnail;
        this.postExcerpt = meta.excerpt;

        // Supprimer le YAML du markdown pour l'affichage
        this.postSrc = data.slice(match[0].length).trim();
      } else {
        this.postSrc = data;
      }
    });
  }
}