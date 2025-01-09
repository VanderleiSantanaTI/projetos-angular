import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,Platform } from '@ionic/angular/standalone';
import { HeaderDesktopComponent } from "../../components/header-desktop/header-desktop.component";
import { StandardInputComponent } from "../../components/standard-input/standard-input.component";

@Component({
  selector: 'app-register-entry',
  templateUrl: './register-entry.page.html',
  styleUrls: ['./register-entry.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderDesktopComponent, StandardInputComponent]
})
export class RegisterEntryPage implements OnInit {
  screenWidth: number;

  constructor(private platform: Platform) {
    this.screenWidth = this.platform.width();
   }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = this.platform.width()
}


ngOnInit() {
}

}
