import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  imports: [IonicModule],
})
export class LoadingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}