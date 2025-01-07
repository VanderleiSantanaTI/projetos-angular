import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    NgStyle,
    NgClass,
    NgIf
  ],
})
export class HomePage {
  size : 12 | undefined;
  font : string = "Arial";
  classes = ['font', 'size', 'color'];
  show : boolean = true || null;


  constructor() {}
}
