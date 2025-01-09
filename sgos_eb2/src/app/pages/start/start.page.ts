import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Platform } from '@ionic/angular/standalone';
import { HeaderDesktopComponent } from "../../components/header-desktop/header-desktop.component";
import { IonContent} from '@ionic/angular/standalone';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
    imports: [IonContent, CommonModule, FormsModule, HeaderDesktopComponent]
})
export class StartPage implements OnInit {

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