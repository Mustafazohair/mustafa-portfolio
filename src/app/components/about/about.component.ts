import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  highlights = [
    { icon: '🏗️', title: 'Clean Architecture', desc: 'Building maintainable, layered systems that scale with business needs.' },
    { icon: '⚡', title: 'Performance First', desc: 'Optimizing APIs and frontends for speed — from query tuning to lazy loading.' },
    { icon: '🔗', title: 'API Design', desc: 'Designing RESTful APIs that are intuitive, secure, and well-documented.' },
    { icon: '🤖', title: 'AI Integration', desc: 'Bridging classic web systems with ML models and intelligent automation.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    const els = document.querySelectorAll('#about .reveal, #about .reveal-left, #about .reveal-right');
    els.forEach(el => observer.observe(el));

    // Fallback: force visible after 2s in case observer never fires
    setTimeout(() => {
      els.forEach(el => el.classList.add('visible'));
    }, 2000);
  }
}
