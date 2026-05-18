import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light' | 'aurora';

const THEMES: Theme[] = ['dark', 'light', 'aurora'];
const STORAGE_KEY = 'mz-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme$ = new BehaviorSubject<Theme>('dark');
  readonly theme$ = this._theme$.asObservable();

  get current(): Theme { return this._theme$.value; }

  /** Icon that represents the NEXT theme (what the button will switch to) */
  get nextIcon(): string {
    const map: Record<Theme, string> = { dark: '☀️', light: '✨', aurora: '🌙' };
    return map[this.nextTheme];
  }

  get nextLabel(): string {
    const map: Record<Theme, string> = { dark: 'Light', light: 'Aurora', aurora: 'Dark' };
    return map[this.nextTheme];
  }

  get nextTheme(): Theme {
    return THEMES[(THEMES.indexOf(this.current) + 1) % THEMES.length];
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      this._apply(saved && THEMES.includes(saved) ? saved : 'dark');
    }
  }

  /** Advance to the next theme in the cycle: dark → light → aurora → dark */
  cycle(): void {
    this._apply(this.nextTheme);
  }

  private _apply(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      THEMES.forEach(t => body.classList.remove(`theme-${t}`));
      body.classList.add(`theme-${theme}`);
      localStorage.setItem(STORAGE_KEY, theme);
    }
    this._theme$.next(theme);
  }
}
