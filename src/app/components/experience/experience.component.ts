import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements AfterViewInit {
  experiences = [
    {
      company: 'Centegy Technologies',
      logo: 'C',
      role: 'Junior .NET Developer',
      period: 'June 2024 – Present',
      duration: 'On Board',
      type: 'Full-Time',
      location: 'Karachi',
      description: 'Currently building and maintaining enterprise web applications using .NET and Angular in a fast-paced, collaborative environment.',
      achievements: [
        'Developing and maintaining RESTful APIs with ASP.NET Core for business-critical applications',
        'Building responsive Angular frontend components and integrating with backend services',
        'Writing clean, maintainable C# code following SOLID principles and best practices',
        'Collaborating with cross-functional teams in an agile development workflow',
        'Participating in code reviews to ensure quality standards across the codebase',
      ],
      tech: ['ASP.NET Core', 'Angular', 'C#', 'SQL Server', 'EF Core', 'Git'],
      color: '#7c3aed',
      current: true
    },
    {
      company: 'Dream Beyond',
      logo: 'D',
      role: 'Full-Stack .NET Developer',
      period: 'Oct 2023 – Oct 2024',
      duration: '13 Months',
      type: 'Full-Time',
      location: 'Karachi',
      description: 'Worked as a full-stack developer delivering scalable web applications using the Microsoft tech stack across multiple client projects.',
      achievements: [
        'Delivered multiple end-to-end web application features from design to production deployment',
        'Built and optimized RESTful APIs using ASP.NET Core with Entity Framework Core',
        'Developed Angular SPA components with a mobile-first, responsive design approach',
        'Optimized SQL Server queries and stored procedures improving performance by 30%',
        'Participated in daily standups, sprint planning, and agile retrospective meetings',
      ],
      tech: ['ASP.NET Core', 'Angular', 'C#', 'SQL Server', 'EF Core', 'HTML/CSS', 'Git'],
      color: '#2563eb',
      current: false
    },
    {
      company: 'Bench Matrix Pvt. Ltd.',
      logo: 'B',
      role: 'Full-Stack Developer Intern',
      period: 'Jul 2023 – Sep 2023',
      duration: '3 Months',
      type: 'Internship',
      location: 'Karachi',
      description: 'Kickstarted my professional career with a focused internship, gaining real-world exposure to full-stack web development workflows.',
      achievements: [
        'Contributed to production features under the guidance of senior developers',
        'Gained hands-on experience with ASP.NET Core and Angular frameworks',
        'Built and tested UI components and API endpoints in a real client project',
        'Learned industry best practices including Git workflows, code review, and agile ceremonies',
      ],
      tech: ['Angular', '.NET Core', 'C#', 'SQL Server', 'HTML/CSS', 'Git'],
      color: '#10b981',
      current: false
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('#experience .reveal, #experience .reveal-left, #experience .reveal-right')
      .forEach(el => observer.observe(el));
  }
}
