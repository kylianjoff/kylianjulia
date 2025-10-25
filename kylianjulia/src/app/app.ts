import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
  }

  ngOnDestroy(): void {
    // Clean up listener
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }
}