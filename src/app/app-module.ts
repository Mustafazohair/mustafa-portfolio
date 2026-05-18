import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { LoadingComponent }    from './components/loading/loading.component';
import { NavbarComponent }     from './components/navbar/navbar.component';
import { HeroComponent }       from './components/hero/hero.component';
import { AboutComponent }      from './components/about/about.component';
import { SkillsComponent }     from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent }   from './components/projects/projects.component';
import { TechStackComponent }  from './components/tech-stack/tech-stack.component';
import { ContactComponent }    from './components/contact/contact.component';
import { FooterComponent }     from './components/footer/footer.component';

@NgModule({
  declarations: [
    App,
    LoadingComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechStackComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [App]
})
export class AppModule { }
