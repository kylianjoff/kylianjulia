import { Injectable } from '@angular/core';

export interface TagColors {
  text: string;
  background: string;
  border: string;
  hoverBackground: string;
  hoverBorder: string;
  hoverShadow: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagColorService {
  private readonly defaultColors: TagColors = {
    text: '#9f00b1',
    background: 'rgba(159, 0, 177, 0.15)',
    border: 'rgba(159, 0, 177, 0.3)',
    hoverBackground: 'rgba(159, 0, 177, 0.25)',
    hoverBorder: '#9f00b1',
    hoverShadow: 'rgba(159, 0, 177, 0.3)'
  };

  private readonly tagColors: Record<string, TagColors> = {
    // Tech
    angular: {
      text: '#dd0031',
      background: 'rgba(221, 0, 49, 0.12)',
      border: 'rgba(221, 0, 49, 0.35)',
      hoverBackground: 'rgba(221, 0, 49, 0.22)',
      hoverBorder: '#dd0031',
      hoverShadow: 'rgba(221, 0, 49, 0.25)'
    },
    typescript: {
      text: '#3178c6',
      background: 'rgba(49, 120, 198, 0.12)',
      border: 'rgba(49, 120, 198, 0.35)',
      hoverBackground: 'rgba(49, 120, 198, 0.22)',
      hoverBorder: '#3178c6',
      hoverShadow: 'rgba(49, 120, 198, 0.25)'
    },
    javascript: {
      text: '#c9a800',
      background: 'rgba(201, 168, 0, 0.12)',
      border: 'rgba(201, 168, 0, 0.35)',
      hoverBackground: 'rgba(201, 168, 0, 0.22)',
      hoverBorder: '#c9a800',
      hoverShadow: 'rgba(201, 168, 0, 0.25)'
    },
    'asp.net': {
      text: '#512bd4',
      background: 'rgba(81, 43, 212, 0.12)',
      border: 'rgba(81, 43, 212, 0.35)',
      hoverBackground: 'rgba(81, 43, 212, 0.22)',
      hoverBorder: '#512bd4',
      hoverShadow: 'rgba(81, 43, 212, 0.25)'
    },
    css: {
      text: '#264de4',
      background: 'rgba(38, 77, 228, 0.12)',
      border: 'rgba(38, 77, 228, 0.35)',
      hoverBackground: 'rgba(38, 77, 228, 0.22)',
      hoverBorder: '#264de4',
      hoverShadow: 'rgba(38, 77, 228, 0.25)'
    },
    html: {
      text: '#e34f26',
      background: 'rgba(227, 79, 38, 0.12)',
      border: 'rgba(227, 79, 38, 0.35)',
      hoverBackground: 'rgba(227, 79, 38, 0.22)',
      hoverBorder: '#e34f26',
      hoverShadow: 'rgba(227, 79, 38, 0.25)'
    },
    design: {
      text: '#22c55e',
      background: 'rgba(34, 197, 94, 0.12)',
      border: 'rgba(34, 197, 94, 0.35)',
      hoverBackground: 'rgba(34, 197, 94, 0.22)',
      hoverBorder: '#22c55e',
      hoverShadow: 'rgba(34, 197, 94, 0.25)'
    },
    // Associatif
    associatif: {
      text: '#a78bfa',
      background: 'rgba(167, 139, 250, 0.1)',
      border: 'rgba(167, 139, 250, 0.3)',
      hoverBackground: 'rgba(167, 139, 250, 0.18)',
      hoverBorder: '#a78bfa',
      hoverShadow: 'rgba(167, 139, 250, 0.2)'
    },
    clubs: {
      text: '#86efac',
      background: 'rgba(134, 239, 172, 0.1)',
      border: 'rgba(134, 239, 172, 0.3)',
      hoverBackground: 'rgba(134, 239, 172, 0.18)',
      hoverBorder: '#86efac',
      hoverShadow: 'rgba(134, 239, 172, 0.2)'
    },
    drezzing: {
      text: '#60a5fa',
      background: 'rgba(96, 165, 250, 0.1)',
      border: 'rgba(96, 165, 250, 0.3)',
      hoverBackground: 'rgba(96, 165, 250, 0.18)',
      hoverBorder: '#60a5fa',
      hoverShadow: 'rgba(96, 165, 250, 0.2)'
    },
    'im@ge': {
      text: '#18579a',
      background: 'rgba(128, 126, 125, 0.12)',
      border: 'rgba(128, 126, 125, 0.35)',
      hoverBackground: 'rgba(128, 126, 125, 0.22)',
      hoverBorder: '#18579a',
      hoverShadow: 'rgba(128, 126, 125, 0.25)'
    },
    sigmix: {
      text: '#a855f7',
      background: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.35)',
      hoverBackground: 'rgba(168, 85, 247, 0.22)',
      hoverBorder: '#a855f7',
      hoverShadow: 'rgba(168, 85, 247, 0.25)'
    },
    shared: {
      text: '#00ff64',
      background: 'rgba(191, 255, 187, 0.12)',
      border: 'rgba(191, 255, 187, 0.35)',
      hoverBackground: 'rgba(191, 255, 187, 0.22)',
      hoverBorder: '#00ff64',
      hoverShadow: 'rgba(191, 255, 187, 0.25)'
    },
    isimalt: {
      text: '#d7a433',
      background: 'rgba(206, 191, 162, 0.12)',
      border: 'rgba(206, 191, 162, 0.35)',
      hoverBackground: 'rgba(206, 191, 162, 0.22)',
      hoverBorder: '#d7a433',
      hoverShadow: 'rgba(206, 191, 162, 0.25)'
    }
  };

  getColors(tag: string): TagColors {
    const normalized = tag.trim().replace(/^#/, '').toLowerCase();
    return this.tagColors[normalized] ?? this.defaultColors;
  }
}
