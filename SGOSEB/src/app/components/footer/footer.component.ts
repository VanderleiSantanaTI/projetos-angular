// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class FooterComponent {
  selectedTab = 'home';

  tabs = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'search', label: 'Buscar', icon: 'search' },
    { id: 'cart', label: 'Carrinho', icon: 'cart' },
    { id: 'heart', label: 'Favoritos', icon: 'heart' },
    { id: 'person', label: 'Conta', icon: 'person' }
  ];

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
}
