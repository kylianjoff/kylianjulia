import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('kylianjulia');

  littleScreen = false;
  menuMobileOpen = false;

  private mediaQuery = window.matchMedia('(max-width: 940px)');
  private mediaQueryListener = (event: MediaQueryListEvent) => {
    this.littleScreen = event.matches;
  };

  ngOnInit(): void {
    // Initial check
    this.littleScreen = this.mediaQuery.matches;

    // Listen to changes
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);

    // Cacher le loader initial après le chargement d'Angular
    this.hideInitialLoader();
  }

  ngOnDestroy(): void {
    // Clean up listener
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  menuChange() {
    this.menuMobileOpen = !this.menuMobileOpen;
  }

  private hideInitialLoader(): void {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      // Petit délai pour que l'animation soit visible
      setTimeout(() => {
        loader.classList.add('hidden');
        // Supprimer l'élément du DOM après la transition
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 500);
    }
  }
}