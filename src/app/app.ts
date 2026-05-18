import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // ThemeService constructor already applies the saved theme on browser.
    // This ensures SSR server-rendered HTML gets the dark class as fallback.
    if (!isPlatformBrowser(this.platformId)) return;
  }
}
