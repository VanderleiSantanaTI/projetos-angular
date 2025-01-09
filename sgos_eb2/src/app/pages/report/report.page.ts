import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, Platform } from '@ionic/angular/standalone';
import { HeaderDesktopComponent } from 'src/app/components/header-desktop/header-desktop.component';
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderDesktopComponent, ButtonComponent]
})
export class ReportPage implements OnInit {

  screenWidth: number;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.screenWidth = this.platform.width();
   }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = this.platform.width()
}


ngOnInit() {
}

goToServiceList(path: string) {
  this.router.navigate([path]);
}
}
