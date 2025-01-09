import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header-desktop',
  standalone: true,
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  imports: [IonicModule,RouterModule, NgFor, NgIf],
})
export class HeaderDesktopComponent {
  menuOpen: boolean = false; // Controla o estado do menu hambúrguer
  activeSubMenu: string | null = null; // Controla o submenu atualmente aberto

  navLinks = [
    { name: 'Home', path: '/home', subMenu: null },
    {
      name: 'Registrar',
      subMenu: [
        { name: 'Registrar veículos', path: '/register-vehicle' },
        { name: 'Registrar entrada', path: '/register-entry' },
        { name: 'Registrar saída', path: '/register-exit' },
      ]},
    { name: 'Relatório',
       subMenu: [
      { name: 'Lista de serviçoes', path: 'service-list' }
    ]},

    { name: 'Login', path: '/start', subMenu: null },
  ];

  constructor(private router: Router) {}

  // Alterna o menu responsivo (hambúrguer)
  toggleMenu() {
    if (this.menuOpen) {
        this.menuOpen = !this.menuOpen;
    } else {
      this.menuOpen = !this.menuOpen;
    }
  }

  // Alterna o submenu
  toggleSubMenu(name: string) {
    this.activeSubMenu = this.activeSubMenu === name ? null : name;
  }

  // Navega para a rota e fecha os menus
  navigateTo(path: string) {
    this.router.navigate([path]);
    this.activeSubMenu = null; 
  }
}
