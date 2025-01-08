import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

  // public masks: MaskitoOptions[] = [
  //   masks.cpfMask,
  //   masks.account,
  //   masks.agency
  // ];

  // formControlConfig = {
  //   agency: new FormControl('', [Validators.required, this.validatorService.validateAgency()]),
  //   account: new FormControl('', [Validators.required, this.validatorService.validateAccount()]),
  //   bank: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required]),
  //   cpf: new FormControl('', [Validators.required, this.validatorService.validateCPF()]),
  //   accountType: new FormControl('', [Validators.required]),
  // };

  // valueInput: { [key: string]: string } = {
  //   agency: '',
  //   account: '',
  //   bank: '',
  //   name: '',
  //   cpf: '',
  //   accountType: '',
  // };

}
