import { Injectable, inject } from "@angular/core";

import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UtilsService } from "../utils/utils.service";

interface IErrorForm<T> {
  [fieldName: string]: {
    display: boolean;
    message: string;
  }
};

@Injectable({
  providedIn: "root"
})
export class ValidatorsService {
  utilsService = inject(UtilsService);

  validateCellphone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone: string = control.value;

      if (!phone) {
        return null;
      }

      const regExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
      const isValid = regExp.test(phone);

      return isValid ? null : { invalidCellphone: true };
    };
  }

  validateFullName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let name: string = control.value;

      if (!name) {
        return null;
      }

      const needsCapitalization = name.length > 0 && name.charAt(0) !== name.charAt(0).toUpperCase();
      if (needsCapitalization) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        control.setValue(name);
      }

      const pattern = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
      const validateName = name.match(pattern);
      if(name) {
        name = name.trim().replace(/\s+/g, ' ');
      }
      const nameSplit = name.split(" ");

      if (!validateName) {
        return { invalidName: true };
      } else if (!nameSplit[0] || nameSplit[0] === "" || !nameSplit[1] || nameSplit[1] === "") {
        return { incompleteName: true };
      }

      if (nameSplit[1].length < 1) {
        return { invalidLastNameLength: true };
      }

      return null;
    };
  }

  validateCPF(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const formatted: string =  value ?? control.value;

      if (!formatted) {
        return null;
      }

      const cpf: string = formatted.replace(/\D/g, "");
      let sum = 0;
      let remainder: number;

      if (cpf === "00000000000") {
        return { invalidCPF: true };
      }

      for (let index = 1; index <= 9; index++) {
        sum += parseInt(cpf.substring(index - 1, index), 10) * (11 - index);
      }

      remainder = (sum * 10) % 11;
      remainder = remainder === 10 || remainder === 11 ? 0 : remainder;

      if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
        return { invalidCPF: true };
      }

      sum = 0;

      for (let index = 1; index <= 10; index++) {
        sum += parseInt(cpf.substring(index - 1, index), 10) * (12 - index);
      }

      remainder = (sum * 10) % 11;
      remainder = remainder === 10 || remainder === 11 ? 0 : remainder;

      if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
        return { invalidCPF: true };
      }

      return null;
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && value.length === 10) {
        const parts = value.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);

        if ((day >= 1 && day <= 31) && (month >= 1 && month <= 12)) {
          return null;
        } else {
          return { invalidDate: true };
        }
      } else {
        if(value.length > 0) {
          return { invalidDate: true };
        } else {
          return null;}
      }
    }
  }

  validateDateOfBirthRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateOfBirthControl = this.utilsService.convertDate(control.value, true);
      if (!dateOfBirthControl) {
        return null;
      }

      const dateOfBirth = new Date(dateOfBirthControl);
      if (dateOfBirth.getFullYear() > 2200 || dateOfBirth.getFullYear() < 1900) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  validateMinimumAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateOfBirthControl = this.utilsService.convertDate(control.value, true);
      if (!dateOfBirthControl) {
        return null;
      }

      const dateOfBirth = new Date(dateOfBirthControl);
      const today = new Date();
      let age = today.getFullYear() - dateOfBirth.getFullYear();

      if (
        today.getMonth() < dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        return { invalidAge: true };
      }

      return null;
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;

      if (!email) {
        return null;
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email) ? null : { invalidEmail: true };
    };
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value;

      if (!password) {
        return null;
      }

      const pattern = /^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/;

      return pattern.test(password) ? null : { invalidPassword: true };
    };
  }

  validateConfirmedPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmedPassword: string = control.value;
      const formGroup = control.parent;
      const passwordControl = formGroup?.get('password');
      const password = passwordControl?.value;

      return password === confirmedPassword ? null : { passwordMismatch: true };
    };
  }

  isPasswordConfirmed(formGroup: FormGroup): boolean {
    const password = formGroup.get('password')?.value;
    const confirmedPassword = formGroup.get('confirmedPassword')?.value;

    return password === confirmedPassword;
  }

  validateZipCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const zipCode: string = control.value;

      if (!zipCode) {
        return null;
      }

      const pattern = /^\d{5}-?\d{3}$/;
      const isValid = pattern.test(zipCode);

      if (!isValid) {
        return { invalidZipCode: true };
      }

      return null;
    };
  }

  validateTermsAccepted(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const termsAccepted: boolean = control.value;
      return termsAccepted ? null : { termsNotAccepted: true };
    };
  }

  validateAddressNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addressNumber: string = control.value;

      const pattern = /^[0-9]+$/;

      if (!addressNumber) {
        return null;
      }

      const isValid = pattern.test(addressNumber);

      return isValid ? null : { invalidAddressNumber: true };
    };
  }

  validateCardNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cardNumber: string = control.value;

      const pattern = /^[0-9]{16}$/;

      if (!cardNumber) {
        return null;
      }

      const sanitizedCardNumber = cardNumber.replace(/\s/g, '');

      const isValid = pattern.test(sanitizedCardNumber);

      return isValid ? null : { invalidCardNumber: true };
    };
  }

  validateExpirationDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const expirationDate: string = control.value;
      const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

      if (!expirationDate) {
        return null;
      }

      const isValidFormat = pattern.test(expirationDate);

      if (!isValidFormat) {
        return { invalidExpirationDate: true };
      };

      const [expMonth, expYear] = expirationDate.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;

      const currentMonth = new Date().getMonth() + 1;

      const isExpired = expYear < currentYear || (expYear === currentYear && expMonth < currentMonth);

      return isExpired ? { invalidExpirationDate: true } : null;
    };
  }

  validateCVV(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cvv: string = control.value;
      const pattern = /^[0-9]{3}$/;

      if (!cvv) {
        return null;
      }

      const isValid = pattern.test(cvv);

      return isValid ? null : { invalidCVV: true };
    };
  }

  cleanInputForm<T>(errorForm: IErrorForm<T>, fieldName: string) {
    if (errorForm[fieldName].display) {
      errorForm[fieldName].display = false;
      errorForm[fieldName].message = "";
    }
  }

  validateRG(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rg: string = control.value;
      const pattern = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;

      if (!rg) {
        return null;
      }

      const isValid = pattern.test(rg);

      return isValid ? null : { invalidRG: true };
    };
  }

  validateCNH(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cnh: string = control.value;
      const pattern = /^\d{11}$/;

      if (!cnh) {
        return null;
      }

      const isValid = pattern.test(cnh);

      return isValid ? null : { invalidCNH: true };
    };
  }

  validateCNPJ(value?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cnpj: string = value ?? control.value;
      const pattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

      if (!cnpj) {
        return null;
      }

      const isValid = pattern.test(cnpj);

      return isValid ? null : { invalidCNPJ: true };
    };
  }

  validateMonthlyBilling(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const monthlyBilling: number = parseFloat(control.value);

      if (monthlyBilling < 100) {
        return { invalidMonthlyBilling: true, minimumValue: true };
      }

      return null;
    };
  }

  validateAgency(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const agency: string = control.value;
      const pattern = /^[0-9]{4}$/;

      if (!agency) {
        return null;
      }

      const isValid = pattern.test(agency);

      return isValid ? null : { invalidAgency: true };
    };
  }

  validateAccount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const account: string = control.value.replace(/\D/g, '');
      const pattern = /^[0-9]{9}$/;

      if (!account) {
        return null;
      }

      const isValid = pattern.test(account);

      return isValid ? null : { invalidAccount: true };
    };
  }

  validateDateConstitution(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateConstitution: string = control.value;
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;

      if (!dateConstitution) {
        return null;
      }

      const isValidFormat = pattern.test(dateConstitution);

      if (!isValidFormat) {
        return { invalidDateConstitution: true };
      }


      const [day, month, year] = dateConstitution.split('/');
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const isFutureDate = parseInt(year, 10) > currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) > currentMonth);
      if(isFutureDate) {
        return { invalidDateConstitution: true };
      }

      const minDate = new Date(currentYear - 100, currentMonth - 1, 1);

      if (new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)) < minDate) {
        return { invalidDateConstitution: true };
      }

      return null;
    };
  }

  validateMonthAndYear(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const pattern = /^\d{2}\/\d{4}$/;

      if (!value) {
        return null;
      }

      const isValid = pattern.test(value);
      if (!isValid) {
        return { invalidMonthAndYear: true };
      }

      const [month, year] = value.split('/');
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10);

      if (parsedMonth < 1 || parsedMonth > 12 || parsedYear === 0) {
        return { invalidMonthAndYear: true };
      }

      return null;
    };
  }

  validateCPFAndCNPJ(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      if (!value) {
        return null;
      }

      const cpfErrors = this.validateCPF()(control);
      const cnpjErrors = this.validateCNPJ()(control);

      if (!cpfErrors || !cnpjErrors) {
        return null;
      }

      return { invalidCPFAndCNPJ: true };
    };
  }

  validateDueDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dueDate: string = control.value;
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;

      if (!dueDate) {
        return null;
      }

      const isValidFormat = pattern.test(dueDate);

      if (!isValidFormat) {
        return { dateInvalid: true };
      }

      const [day, month, year] = dueDate.split('/');
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const minDate = new Date(currentYear, currentMonth - 1, 1);      

      if (new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)) < minDate) {
        return { invalidDueDate: true };
      }

      return null;
    };
      
  }
}
