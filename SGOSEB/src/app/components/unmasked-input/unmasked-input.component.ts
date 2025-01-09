import { NgClass} from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilsService, IPasswordFields } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-unmasked-input',
  templateUrl: './unmasked-input.component.html',
  styleUrls: ['./unmasked-input.component.scss'],
  imports: [NgClass, IonicModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UnmaskedInputComponent  implements OnInit {

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
  @Input() maxLength: number = 0;
  @Input() mask: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() action = new EventEmitter();

  public passwordFields: IPasswordFields = {
    password: {
        type: "password",
        icon: "eye-off-outline"
    },
    confirmedPassword: {
      type: "password",
      icon: "eye-off-outline"
    },
    actualPassword: {
      type: "password",
      icon: "eye-off-outline"
    },
  };

  constructor(
    private utils: UtilsService,
  ) {
   }

  ngOnInit() {}

  togglePassword(fieldName: string) {
    this.utils.togglePasswordVisibility(this.passwordFields, fieldName);
  }

  callAction() {
    this.action.emit();
  }

}
