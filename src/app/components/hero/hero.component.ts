import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentRole = '';
  showCursor = true;

  private roles = [
    'Full-Stack Developer',
    '.NET Specialist',
    'Angular Developer',
    'API Architect',
    'Problem Solver'
  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeText();
    }
  }

  private typeText() {
    const current = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.currentRole = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentRole = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? 60 : 110;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }

    this.timer = setTimeout(() => this.typeText(), speed);
  }

  scrollToProjects() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }
}
