import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RouterLink } from '@angular/router';

interface BlogPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class Blog implements OnInit {
  posts: BlogPost[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
      this.posts = data.sort((a, b) => {
        // Convertir "dd/MM/yyyy" en Date
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Tri décroissant (du plus récent au plus ancien)
        return dateB.getTime() - dateA.getTime();
      });
    });
  }
}