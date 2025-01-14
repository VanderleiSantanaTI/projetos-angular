import { Component, HostListener, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  isMobile!: boolean;

  valueInput: { [key: string]: string } = {
    cpf: '',
    email: ''
  };

  errorColaboratorDisplayCPF: boolean = false;
  errorColaboratorDisplayEmail: boolean = false;

  erroCPFMessage: string = '';
  errorEmailMessage: string = '';

  constructor(private validationService: ValidationService) { } // Injeta a service

  ngOnInit() {
    this.checkWindowSize();
  }

  // Função para chamar quando o usuário digita
  callAction(input: string, event: Event) {
    const inputValue = ((event.target as HTMLInputElement).value);
    this.valueInput[input] = inputValue;

    if (input === 'email') {
      this.errorColaboratorDisplayEmail = false;
    }

    if (input === 'cpf') {
      this.errorColaboratorDisplayCPF = false;
    }
  }

  // Função para autenticar colaborador
  authenticateColaborator() {
    // Validação do CPF
    if (this.valueInput['cpf'] === '') {
      this.erroCPFMessage = 'Campo CPF obrigatório';
      this.errorColaboratorDisplayCPF = true;
    } else if (!this.validationService.validateCPF(this.valueInput['cpf'])) { // Usa a service de validação
      this.erroCPFMessage = 'CPF inválido';
      this.errorColaboratorDisplayCPF = true;
    }

    // Validação do e-mail
    if (this.valueInput['email'] === '') {
      this.errorEmailMessage = 'Campo e-mail obrigatório';
      this.errorColaboratorDisplayEmail = true;
    } else if (!this.validationService.validateEmail(this.valueInput['email'])) { // Usa a service de validação
      this.errorEmailMessage = 'E-mail inválido';
      this.errorColaboratorDisplayEmail = true;
    }

    // Se ambos CPF e E-mail forem válidos
    if (!this.errorColaboratorDisplayCPF && !this.errorColaboratorDisplayEmail) {
      console.log('CPF e E-mail válidos');
      // Aqui você pode fazer a autenticação ou qualquer outra ação desejada
    }
  }

  getMasks(type: string) {
    return this.validationService.getMask(type);
  }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkWindowSize();
    }

    checkWindowSize() {
      this.isMobile = window.innerWidth < 768;
    }
}
