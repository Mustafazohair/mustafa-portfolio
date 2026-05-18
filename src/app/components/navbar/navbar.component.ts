import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = false;
  menuOpen = false;
  activeSection = 'hero';
  toggling = false;

  navLinks = [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Contact',    href: '#contact'    },
  ];

  private sections = ['hero', 'about', 'skills', 'experience', 'projects', 'tech-stack', 'contact'];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  private updateActiveSection() {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollY = window.scrollY + 120;
    for (const id of [...this.sections].reverse()) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) { this.activeSection = id; return; }
    }
  }

  scrollTo(href: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen = false;
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  cycleTheme() {
    this.toggling = true;
    this.themeService.cycle();
    setTimeout(() => { this.toggling = false; }, 400);
  }

  ngOnDestroy() {}
}
