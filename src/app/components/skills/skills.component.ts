import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  level: number;
  color: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  accent: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements AfterViewInit {
  categories: SkillCategory[] = [
    {
      category: 'Frontend',
      icon: '🎨',
      accent: '#06b6d4',
      skills: [
        { name: 'Angular',     icon: 'devicon-angularjs-plain',    level: 85, color: '#dd1b16' },
        { name: 'TypeScript',  icon: 'devicon-typescript-plain',   level: 82, color: '#3178c6' },
        { name: 'HTML5',       icon: 'devicon-html5-plain',        level: 90, color: '#e34f26' },
        { name: 'CSS3/SCSS',   icon: 'devicon-css3-plain',         level: 85, color: '#1572b6' },
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      accent: '#7c3aed',
      skills: [
        { name: 'ASP.NET Core', icon: 'devicon-dotnetcore-plain',  level: 88, color: '#512bd4' },
        { name: 'C#',           icon: 'devicon-csharp-plain',      level: 88, color: '#239120' },
        { name: 'Web API',      icon: 'devicon-dotnetcore-plain',  level: 85, color: '#512bd4' },
        { name: 'Flask',        icon: 'devicon-flask-original',    level: 65, color: '#ffffff' },
        { name: 'FastAPI',      icon: 'devicon-fastapi-plain',     level: 62, color: '#009688' },
      ]
    },
    {
      category: 'Database',
      icon: '🗄️',
      accent: '#f97316',
      skills: [
        { name: 'SQL Server',   icon: 'devicon-microsoftsqlserver-plain', level: 82, color: '#cc2927' },
        { name: 'EF Core',      icon: 'devicon-dotnetcore-plain',         level: 80, color: '#512bd4' },
      ]
    },
    {
      category: 'Tools & Cloud',
      icon: '🛠️',
      accent: '#10b981',
      skills: [
        { name: 'Git',          icon: 'devicon-git-plain',         level: 88, color: '#f05032' },
        { name: 'Azure DevOps', icon: 'devicon-azure-plain',       level: 72, color: '#0089d6' },
        { name: 'Postman',      icon: 'devicon-postman-plain',     level: 85, color: '#ff6c37' },
        { name: 'VS Code',      icon: 'devicon-vscode-plain',      level: 90, color: '#007acc' },
      ]
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#skills .reveal, #skills .reveal-left')
      .forEach(el => observer.observe(el));
  }
}
