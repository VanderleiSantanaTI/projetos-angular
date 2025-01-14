import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {
  isMobile!: boolean;
  constructor() { }

  ngOnInit() {
    this.checkWindowSize();
  }


      @HostListener('window:resize', ['$event'])
      onResize(event: Event) {
        this.checkWindowSize();
      }

      checkWindowSize() {
        this.isMobile = window.innerWidth < 768;
      }
}
