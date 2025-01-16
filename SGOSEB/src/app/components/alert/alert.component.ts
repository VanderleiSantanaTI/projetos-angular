import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0 }))
      ])
    ])
  ],
  imports: [NgClass, IonicModule],

})
export class AlertComponent {

  @Input() header!: string;
  private _message: string = '';
  public safeMessage!: SafeHtml;
  @Input() buttons!: any[];
  @Output() closeAlert = new EventEmitter<void>();

  @HostBinding('@fadeInOut') fadeInOut = true;

  constructor(private sanitizer: DomSanitizer) {}

  @Input() set message(msg: string) {
    this._message = msg;
    this.safeMessage = this.sanitizer.bypassSecurityTrustHtml(this._message);
  }

  buttonHandler(action: Function) {
    action();
  }

  close() {
    this.closeAlert.emit();
  }
}
