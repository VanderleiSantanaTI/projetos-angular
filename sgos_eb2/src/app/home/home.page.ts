import { Component } from '@angular/core';
import {IonContent } from '@ionic/angular/standalone';
import { HeaderDesktopComponent } from "../components/header-desktop/header-desktop.component";

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
        // IonContent,
        HeaderDesktopComponent,
        IonicModule, 
        FormsModule],
  
})
export class HomePage  {
  inputValue: string = '';  // Valor do input
  errorMessage: string = '';  // Mensagem de erro

  handleInputChange(value: string) {
    this.inputValue = value;
    if (this.inputValue.length < 3) {
      this.errorMessage = 'O valor deve ter pelo menos 3 caracteres.';
    } else {
      this.errorMessage = 'válido';
    }
  }
}
