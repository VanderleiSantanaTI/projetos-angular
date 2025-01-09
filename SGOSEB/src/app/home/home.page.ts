import { Component } from '@angular/core';
import { masks } from '../services/validators/masks.validator';
import { MaskitoOptions } from '@maskito/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators/validators.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  errorColaboratorDisplayEmail: boolean = false;
  errorColaboratorDisplayCPF: boolean = false;
  errorEmailMessage: string ="";
  erroCPFMessage: string ="";
  constructor(private validatorService: ValidatorsService,) {}


  public masks: MaskitoOptions[] = [
    masks.cpfMask,
    masks.account,
    masks.agency,
    masks.phoneMask,
    masks.dateMask,
    masks.emailMask
  ];

  formControlConfig = {
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, this.validatorService.validateCPF()]),
    email: new FormControl('', [Validators.required, this.validatorService.validateEmail()]),
  };

  valueInput: { [key: string]: string } = {
    name: '',
    cpf: '',
    email: ''
  };

  callAction(input: string, event: Event = new Event("click")) {
    const inputValue =  ((event.target as HTMLInputElement).value);
    this.valueInput[input] = inputValue;

        if(input === 'email') {
          this.errorColaboratorDisplayEmail = false;
        }
        if(input === 'cpf') {
          this.errorColaboratorDisplayCPF = false;
        }
      }


      authenticateColaborator() {
        if(this.valueInput['email'] === '') {
          this.errorEmailMessage = 'Campo Email obrigatório';
          this.errorColaboratorDisplayEmail = true;
        } else {
          const emailValid = this.validatorService.validateEmail();
          if(!emailValid) {
            this.errorEmailMessage = 'Email inválido';
            this.errorColaboratorDisplayEmail = true;
            return
          }
          console.log(this.valueInput['email']);
        }

        if(this.valueInput['cpf'] === '') {
          this.erroCPFMessage = 'Campo CPF obrigatório';
          this.errorColaboratorDisplayCPF = true;
        } else {
          const CPFValid = this.validatorService.validateCPF(this.valueInput['cpf']);
          if(!CPFValid) {
            this.erroCPFMessage = 'CPF  inválido';
            this.errorColaboratorDisplayCPF = true;
          }
        }

      }

    }
