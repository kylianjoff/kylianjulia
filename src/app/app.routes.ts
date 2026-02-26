import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { Projects } from './projects/projects';
import { Home } from './home/home';
import { About } from './about/about';
import { BlogPostComponent } from './blog-post/blog-post';
import { ProjectPostComponent } from './project-post/project-post';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        title: "Bienvenue sur le site de Kylian JULIA",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: 'blog',
        title: "Blog de Kylian JULIA",
        component: Blog
    },
    {
        path: 'blog/:slug',
        title: "Article de blog",
        component: BlogPostComponent
    },
    {
        path: 'projects',
        redirectTo: 'https://projets.kylianjulia.fr'
    },
    {
        path: 'about',
        title: "À propos de moi",
        component: About
    },
    {
        path: 'blog-post/:slug',
        redirectTo: 'blog/:slug'
    },
    {
        path: 'project-post/:slug',
        redirectTo: 'blog/:slug'
    },
    {
        path: '**',
        title: "Cette page est introuvable",
        component: NotFound
    }
];
