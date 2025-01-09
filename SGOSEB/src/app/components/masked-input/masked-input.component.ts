
import { NgClass } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate } from "@maskito/core";


@Component({
  selector: 'app-masked-input',
  templateUrl: './masked-input.component.html',
  styleUrls: ['./masked-input.component.scss'],
  imports: [ NgClass, IonicModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaskedInputComponent  implements OnInit {

  @Input() errorFormDisplay: boolean = false;
  @Input() errorFormessage: string = '';
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() name: string = '';
  @Input() class: string = '';
  @Input() classIcon: string = '';
  @Input() autocapitalize: string = 'none';
  @Input() placeholder: string = '';
  @Input() mask!: MaskitoOptions;
  @Input() inputmode: string = 'numeric'
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() withoutLabel: boolean = false;
  @Input() maxLength: number = 120;

  @Output() action = new EventEmitter();


  maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(SimpleChanges: SimpleChanges) {
  }

  callAction() {
    this.action.emit();
  }


}
