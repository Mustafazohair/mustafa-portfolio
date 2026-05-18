import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  formData = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  sending = false;
  sendError = '';

  contactInfo = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'mustuzoh53@gmail.com',
      href: 'mailto:mustuzoh53@gmail.com',
      accent: '#7c3aed'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+92 3009275322',
      href: 'tel:+923009275322',
      accent: '#2563eb'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/mustafa-zohair-726a66291',
      href: 'https://www.linkedin.com/in/mustafa-zohair-726a66291',
      accent: '#0a66c2'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/mustafa-zohair',
      href: 'https://github.com/mustafa-zohair',
      accent: '#6e40c9'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#contact .reveal, #contact .reveal-left, #contact .reveal-right')
      .forEach(el => observer.observe(el));
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.sending = true;
    this.sendError = '';

    this.http.post('/api/contact', this.formData).subscribe({
      next: () => {
        this.sending = false;
        this.submitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' };
        form.resetForm();
      },
      error: () => {
        this.sending = false;
        this.sendError = 'Something went wrong. Please try again or email me directly.';
      },
    });
  }
}
