import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './blog-post.html',
  styleUrls: ['./blog-post.css']
})
export class BlogPostComponent implements OnInit {
  postSrc = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.postSrc = `assets/blogs/${slug}`;
  }
}