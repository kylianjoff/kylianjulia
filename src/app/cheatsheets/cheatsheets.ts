import { Component, inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SeoService } from '../services/seo.service';

interface CheatSheet {
  title: string;
  description: string;
  file: string;
  language: string;
  date: string;
}

@Component({
  selector: 'app-cheatsheets',
  imports: [],
  templateUrl: './cheatsheets.html',
  styleUrl: './cheatsheets.css',
})
export class Cheatsheets implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Cheatsheets — Aide-mémoire gratuits pour développeurs',
      description: 'Téléchargez gratuitement les cheat sheets de Kylian JULIA : Diesel ORM (Rust), RUST, Tailwind CSS et plus encore. Aide-mémoire en français pour développeurs.',
      url: '/cheatsheets',
      keywords: 'cheatsheet, aide-mémoire, Rust, Diesel ORM, Tailwind CSS, développeur, gratuit, PDF, français'
    });
  }
  private document = inject(DOCUMENT);
  private window = this.document.defaultView!;

  cheatSheets: CheatSheet[] = [
    {
      title: 'Cheat Sheet Diesel ORM V1 - FR',
      description: 'Cheat Sheet de l\'ORM Diesel pour Rust en français',
      file: 'cheatsheets/DieselRust_v1_fr.pdf',
      language: 'Diesel ORM',
      date: '16/03/2026'
    },
    {
      title: 'Cheat Sheet RUST V1 - FR',
      description: 'Première version de la cheat sheet RUST en français',
      file: 'cheatsheets/Rust_v1_fr.pdf',
      language: 'RUST',
      date: '10/03/2026'
    },
    {
      title: 'Cheat Sheet Tailwind CSS V1 - FR',
      description: 'Première version de la cheat sheet Tailwind CSS en français',
      file: 'cheatsheets/TailwindCSS_v1_fr.pdf',
      language: 'Tailwind CSS',
      date: '10/03/2026'
    }
  ]

  private languageClassMap: Record<string, string> = {
    'RUST': 'lang-rust',
    'Tailwind CSS': 'lang-tailwind',
    'Diesel ORM': 'lang-diesel',
  };

  getLanguageClass(language: string): string {
    return this.languageClassMap[language] ?? 'lang-default';
  }

  openCheatSheet(file: string): void {
    this.window.open(file, '_blank', 'noopener,noreferrer');
  }

  constructor() {
    this.cheatSheets.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
      return dateB - dateA;
    });
  }
}
