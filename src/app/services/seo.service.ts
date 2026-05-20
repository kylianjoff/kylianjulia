import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
  jsonLd?: object;
}

const SITE_URL = 'https://kylianjulia.fr';
const DEFAULT_IMAGE = `${SITE_URL}/profil.jpeg`;
const SITE_NAME = 'Kylian JULIA';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  update(config: SeoConfig): void {
    const fullTitle = config.title.includes('Kylian JULIA')
      ? config.title
      : `${config.title} | Kylian JULIA`;

    const absoluteUrl = config.url
      ? config.url.startsWith('http') ? config.url : `${SITE_URL}${config.url}`
      : SITE_URL;

    const image = config.image
      ? config.image.startsWith('http') ? config.image : `${SITE_URL}${config.image}`
      : DEFAULT_IMAGE;

    // Titre
    this.titleService.setTitle(fullTitle);

    // Description standard
    this.meta.updateTag({ name: 'description', content: config.description });

    // Mots-clés
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: absoluteUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // URL canonique
    this.setCanonical(absoluteUrl);

    // Données structurées JSON-LD
    if (config.jsonLd) {
      this.setJsonLd(config.jsonLd);
    }
  }

  setJsonLd(data: object): void {
    const id = 'structured-data';
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Convertit une chaîne HTML en texte brut pour les balises meta */
  static stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  }

  /** Convertit "dd/MM/yyyy" en "yyyy-MM-dd" pour JSON-LD */
  static toISODate(date: string): string {
    const parts = date.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return date;
  }
}
