import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BlogPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

interface ProjetPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  blogPosts: BlogPost[] = [];
  projetPosts: ProjetPost[] = [];
  nbrBlog: number = 0;
  nbrProjet: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ProjetPost[]>('').subscribe(data => {
      this.projetPosts = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        const dateA = new Date(yearA, monthA, dayA);
        const dateB = new Date(yearB, monthB, dayB);

        return dateB.getTime() - dateA.getTime();
      }).slice(0,2);
    });

    this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
      this.blogPosts = data.sort((a, b) => {
        // Convertir "dd/MM/yyyy" en Date
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        // Tri décroissant (du plus récent au plus ancien)
        return dateB.getTime() - dateA.getTime();
      }).slice(0,2);
    });

    this.http.get<ProjetPost[]>('').subscribe(data => {
      this.nbrProjet = data.length;
    })

    this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
      this.nbrBlog = data.length;
    })
  }
}
