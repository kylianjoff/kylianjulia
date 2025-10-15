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

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class Blog implements OnInit {
  posts: BlogPost[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
      this.http.get<BlogPost[]>('assets/blog-index.json').subscribe(data => {
        this.posts = data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  }
}