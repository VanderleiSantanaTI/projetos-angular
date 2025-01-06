import { Component } from '@angular/core';
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public screenWidth: number;
 

  constructor(
    private platform: Platform,
  ) {
    this.screenWidth = this.platform.width();
  }

}
