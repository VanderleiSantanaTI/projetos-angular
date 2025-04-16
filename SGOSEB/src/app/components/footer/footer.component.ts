import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class FooterComponent {
  selectedTab = '';

  tabs = [
    { id: 'start', label: 'Início', icon: 'home', route: '/start' },
    { id: 'register-os', label: 'Registrar OS', icon: 'create', route: '/register-os' },
    { id: 'search', label: 'Buscar', icon: 'search', route: '/search' },
    { id: 'profiles', label: 'Perfil', icon: 'person', route: '/profiles' },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const current = this.router.url.split('?')[0];
        const match = this.tabs.find((tab) => current.startsWith(tab.route));
        this.selectedTab = match?.id || '';
      });
  }

  navigate(tabId: string) {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab) {
      this.router.navigateByUrl(tab.route);
    }
  }
}
