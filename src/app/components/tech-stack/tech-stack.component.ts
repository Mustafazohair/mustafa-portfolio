import { Component } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  standalone: false,
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css'
})
export class TechStackComponent {
  row1 = [
    { name: '.NET Core',   icon: 'devicon-dotnetcore-plain',          color: '#512bd4' },
    { name: 'Angular',     icon: 'devicon-angularjs-plain',           color: '#dd1b16' },
    { name: 'C#',          icon: 'devicon-csharp-plain',              color: '#239120' },
    { name: 'TypeScript',  icon: 'devicon-typescript-plain',          color: '#3178c6' },
    { name: 'SQL Server',  icon: 'devicon-microsoftsqlserver-plain',   color: '#cc2927' },
    { name: 'Azure',       icon: 'devicon-azure-plain',               color: '#0089d6' },
    { name: 'Git',         icon: 'devicon-git-plain',                 color: '#f05032' },
    { name: 'HTML5',       icon: 'devicon-html5-plain',               color: '#e34f26' },
  ];

  row2 = [
    { name: 'CSS3',        icon: 'devicon-css3-plain',                color: '#1572b6' },
    { name: 'Python',      icon: 'devicon-python-plain',              color: '#3776ab' },
    { name: 'Flask',       icon: 'devicon-flask-original',            color: '#ffffff' },
    { name: 'FastAPI',     icon: 'devicon-fastapi-plain',             color: '#009688' },
    { name: 'VS Code',     icon: 'devicon-vscode-plain',              color: '#007acc' },
    { name: 'Postman',     icon: 'devicon-postman-plain',             color: '#ff6c37' },
    { name: 'GitHub',      icon: 'devicon-github-original',           color: '#f0f6fc' },
    { name: 'Bootstrap',   icon: 'devicon-bootstrap-plain',           color: '#7952b3' },
  ];

  // Duplicate for seamless loop
  get track1() { return [...this.row1, ...this.row1]; }
  get track2() { return [...this.row2, ...this.row2]; }
}
