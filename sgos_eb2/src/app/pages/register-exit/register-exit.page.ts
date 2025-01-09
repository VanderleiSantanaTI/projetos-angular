import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,Platform } from '@ionic/angular/standalone';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';

@Component({
  selector: 'app-register-exit',
  templateUrl: './register-exit.page.html',
  styleUrls: ['./register-exit.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderDesktopComponent]
})
export class RegisterExitPage implements OnInit {

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
