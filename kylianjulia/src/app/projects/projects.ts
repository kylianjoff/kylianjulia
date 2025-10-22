import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProjectPost {
  title: string;
  thumbnail?: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: '../blog/blog.css'
})
export class Projects {
  posts: ProjectPost[] = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.http.get<ProjectPost[]>('assets/project-index.json').subscribe(data => {
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
