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
    angular: {
      text: '#dd0031',
      background: 'rgba(221, 0, 49, 0.15)',
      border: 'rgba(221, 0, 49, 0.3)',
      hoverBackground: 'rgba(221, 0, 49, 0.25)',
      hoverBorder: '#dd0031',
      hoverShadow: 'rgba(221, 0, 49, 0.3)'
    },
    typescript: {
      text: '#3178c6',
      background: 'rgba(49, 120, 198, 0.15)',
      border: 'rgba(49, 120, 198, 0.3)',
      hoverBackground: 'rgba(49, 120, 198, 0.25)',
      hoverBorder: '#3178c6',
      hoverShadow: 'rgba(49, 120, 198, 0.3)'
    },
    javascript: {
      text: '#f7df1e',
      background: 'rgba(247, 223, 30, 0.15)',
      border: 'rgba(247, 223, 30, 0.3)',
      hoverBackground: 'rgba(247, 223, 30, 0.25)',
      hoverBorder: '#f7df1e',
      hoverShadow: 'rgba(247, 223, 30, 0.3)'
    },
    css: {
      text: '#264de4',
      background: 'rgba(38, 77, 228, 0.15)',
      border: 'rgba(38, 77, 228, 0.3)',
      hoverBackground: 'rgba(38, 77, 228, 0.25)',
      hoverBorder: '#264de4',
      hoverShadow: 'rgba(38, 77, 228, 0.3)'
    },
    html: {
      text: '#e34f26',
      background: 'rgba(227, 79, 38, 0.15)',
      border: 'rgba(227, 79, 38, 0.3)',
      hoverBackground: 'rgba(227, 79, 38, 0.25)',
      hoverBorder: '#e34f26',
      hoverShadow: 'rgba(227, 79, 38, 0.3)'
    },
    design: {
      text: '#22c55e',
      background: 'rgba(34, 197, 94, 0.15)',
      border: 'rgba(34, 197, 94, 0.3)',
      hoverBackground: 'rgba(34, 197, 94, 0.25)',
      hoverBorder: '#22c55e',
      hoverShadow: 'rgba(34, 197, 94, 0.3)'
    }
  };

  getColors(tag: string): TagColors {
    const normalized = tag.trim().replace(/^#/, '').toLowerCase();
    return this.tagColors[normalized] ?? this.defaultColors;
  }
}
