import { NgClass } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate } from "@maskito/core";

@Component({
  selector: 'app-standard-input',
  templateUrl: './standard-input.component.html',
  styleUrls: ['./standard-input.component.scss'],
  imports: [IonicModule, NgClass, FormsModule],
})
export class StandardInputComponent implements OnInit {

  @Input() errorFormDisplay: boolean = false;
  @Input() errorFormMessage: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() name: string = '';
  @Input() class: string = '';
  @Input() classIcon: string = '';
  @Input() autocapitalize: string = 'none';
  @Input() placeholder: string = '';
  @Input() mask!: MaskitoOptions;
  @Input() inputMode: string = 'text';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() withoutLabel: boolean = false;
  @Input() maxLength: number = 120;

  @Output() action = new EventEmitter<void>();

  maskPredicate: MaskitoElementPredicate = async (el) => 
    (el as HTMLIonInputElement).getInputElement();

  
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''] // Defina os controles aqui
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  callAction() {
    this.action.emit();
  }

}
