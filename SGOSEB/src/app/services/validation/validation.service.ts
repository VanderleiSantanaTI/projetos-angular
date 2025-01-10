import { Injectable } from '@angular/core';
import { masks } from '../validators/masks.validator';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // Validação de CPF
  validateCPF(cpf: string): boolean {
    const cpfClean = cpf.replace(/\D/g, '');  // Remove tudo que não for número

    if (cpfClean.length !== 11) {
      return false;
    }

    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfClean.charAt(i - 1)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpfClean.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfClean.charAt(i - 1)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpfClean.charAt(10))) {
      return false;
    }

    return true;
  }

  // Validação de e-mail
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }


  getMask(type: string): any {
    switch(type) {
      case 'cpf':
        return masks.cpfMask;
      case 'cnpj':
        return masks.cnpjMask;
      default:
        return null;
    }
  }
}
