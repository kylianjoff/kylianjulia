import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { Projects } from './projects/projects';
import { Home } from './home/home';

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
        path: 'projects',
        title: "Projets de Kylian JULIA",
        component: Projects
    },
];
