import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  live: string | null;
  accent: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  activeFilter = 'All';
  filters = ['All', 'Full-Stack', 'AI/ML', 'Frontend', '.NET'];

  projects: Project[] = [
    {
      title: 'HandSpire',
      subtitle: 'AI/ML Full-Stack Platform',
      description: 'An innovative computer vision platform integrating real-time hand gesture recognition using deep learning. Bridges physical interaction with digital interfaces through an Angular frontend and Python ML backend.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'Angular', 'REST API'],
      features: ['Real-time hand gesture recognition', 'CNN model with 95%+ accuracy', 'Live video stream processing', 'Angular dashboard with WebSockets'],
      github: '#',
      live: null,
      accent: '#10b981',
      icon: '🤖',
      category: 'AI/ML'
    },
    {
      title: 'Employee & Expense Management',
      subtitle: 'Enterprise .NET MVC System',
      description: 'A comprehensive enterprise management suite handling employee lifecycle, expense tracking, and multi-level approval workflows, built with clean architecture principles.',
      tech: ['ASP.NET Core MVC', 'C#', 'SQL Server', 'EF Core', 'Bootstrap'],
      features: ['Full employee CRUD lifecycle', 'Expense submission & approval flow', 'Role-based access control', 'Report generation & analytics'],
      github: '#',
      live: null,
      accent: '#7c3aed',
      icon: '🏢',
      category: '.NET'
    },
    {
      title: 'LMS',
      subtitle: 'Learning Management System',
      description: 'A full-featured e-learning platform with dynamic course management, real-time student progress tracking, and an interactive assessment engine for educational institutions.',
      tech: ['Angular', 'ASP.NET Core', 'SQL Server', 'EF Core', 'JWT'],
      features: ['Course & module management', 'Student progress analytics', 'Quiz & assessment engine', 'JWT authentication & roles'],
      github: '#',
      live: null,
      accent: '#2563eb',
      icon: '📚',
      category: 'Full-Stack'
    },
    {
      title: 'Movie Mentor',
      subtitle: 'AI Recommendation Engine',
      description: 'An AI-powered movie recommendation system that applies collaborative and content-based filtering to deliver personalized viewing suggestions tailored to user preferences.',
      tech: ['Python', 'FastAPI', 'ML/NLP', 'Angular', 'Pandas', 'Scikit-learn'],
      features: ['Collaborative filtering algorithm', 'Content-based recommendations', 'User preference profiling', 'RESTful ML API with FastAPI'],
      github: '#',
      live: null,
      accent: '#a855f7',
      icon: '🎬',
      category: 'AI/ML'
    },
    {
      title: 'Billboard Chatbot',
      subtitle: 'NLP Conversational Agent',
      description: 'An intelligent NLP-powered chatbot automating billboard advertising queries and bookings. Reduces manual workload and provides instant, accurate responses to client inquiries.',
      tech: ['Python', 'NLP', 'FastAPI', 'Angular', 'spaCy'],
      features: ['Intent recognition & NLP', 'Automated booking pipeline', 'Ad availability queries', 'Conversation history tracking'],
      github: '#',
      live: null,
      accent: '#f59e0b',
      icon: '💬',
      category: 'AI/ML'
    },
    {
      title: 'Food Application',
      subtitle: 'Angular E-Commerce Platform',
      description: 'A feature-rich food ordering platform with dynamic menu browsing, real-time cart management, and a seamless checkout experience built with Angular best practices.',
      tech: ['Angular', 'TypeScript', 'SCSS', 'REST API', 'RxJS'],
      features: ['Dynamic menu with categories', 'Real-time cart management', 'Order tracking system', 'Responsive mobile-first UI'],
      github: '#',
      live: '#',
      accent: '#f97316',
      icon: '🍔',
      category: 'Frontend'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  setFilter(f: string) {
    this.activeFilter = f;
    setTimeout(() => {
      document.querySelectorAll('#projects .project-card.reveal')
        .forEach(el => el.classList.add('visible'));
    }, 0);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('#projects .reveal')
      .forEach(el => observer.observe(el));
  }
}
