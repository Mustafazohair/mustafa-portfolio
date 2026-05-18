import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year = new Date().getFullYear();

  navLinks = [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Contact',    href: '#contact'    },
  ];

  socials = [
    { label: 'GitHub',   href: 'https://github.com/mustafa-zohair',                          icon: 'github'   },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-zohair-726a66291',       icon: 'linkedin' },
    { label: 'Email',    href: 'mailto:mustuzoh53@gmail.com',                                icon: 'email'    },
  ];

  scrollTo(href: string) {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
