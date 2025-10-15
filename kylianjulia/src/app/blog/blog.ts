import { Component } from '@angular/core';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  file: string;
  excerpt: string;
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {
  posts: BlogPost[] = [];

  ngOnInit() {
    this.posts = [
      {
        title: 'Créer un blog Angular sans backend',
        date: '2025-10-15',
        author: 'Kylian Julia',
        file: 'assets/posts/post-1.md',
        excerpt: 'Apprends à créer un blog Angular 100 % statique avec Markdown.'
      }
    ]
  }
}
