import { Routes } from '@angular/router';
import { Blog } from './blog/blog';
import { Projects } from './projects/projects';

export const routes: Routes = [
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
