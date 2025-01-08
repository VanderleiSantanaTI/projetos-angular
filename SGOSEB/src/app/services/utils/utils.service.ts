import { Injectable, inject, Type, HostListener } from "@angular/core";
import { AbstractControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController, ToastController, NavController, AnimationController} from "@ionic/angular";
import { Observable } from "rxjs";
import { Platform } from "@ionic/angular";
import { IPlatformDevice } from "src/app/interfaces/platform-device";
import { HomePage } from "src/app/home/home.page";





export interface IPasswordFields {
  password: {
    type: "text" | "password";
    icon: "eye-off-outline" | "eye-outline";
  };
  confirmedPassword?: {
    type: "text" | "password";
    icon: "eye-off-outline" | "eye-outline";
  };
  actualPassword?: {
    type: "text" | "password";
    icon: "eye-off-outline" | "eye-outline";
  };
}

type TUrlParams<T> = {
  [P in keyof T]: string;
};

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  private storage?: Storage = window.localStorage;
  // protected store = inject(Store);
  navController = inject(NavController);
  alertController = inject(AlertController);
  toastController = inject(ToastController);
  modalController = inject(ModalController);
  animationCtrl = inject(AnimationController);
  platform = inject(Platform);

  screenWidth: number = this.platform.width();

  async showAlert<T>(
    message: string,
    header?: string,
    onFunctionConfirm?: () => Promise<T> | void,
    onFunctionCancel?: () => Promise<T> | void
  ) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: async () => {
            if(onFunctionCancel) {
              await onFunctionCancel();
            }
          },
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            if (onFunctionConfirm) {
              await onFunctionConfirm();
            }
          },
        },
      ],
    });

    await alert.present();

    return await alert.onDidDismiss().then((data) => {
      return data.role === "cancel";
    });
  }

  async showToast(
    message: string,
    status: "success" | "error",
    duration?: number
  ) {
    const toast = await this.toastController.create({
      position: "top",
      message: message,
      cssClass: "toast-" + status,
      duration: duration ?? 3000,
    });

    return await toast.present();
  }

  togglePasswordVisibility(passwordFields: IPasswordFields, fieldName: string) {
    if (fieldName === "password") {
      passwordFields.password.type = passwordFields.password.type === "password" ? "text" : "password";
      passwordFields.password.icon = passwordFields.password.icon === "eye-off-outline" ? "eye-outline" : "eye-off-outline";
    }

    if (fieldName === "confirmedPassword" && passwordFields.confirmedPassword) {
      passwordFields.confirmedPassword.type = passwordFields.confirmedPassword.type === "password" ? "text" : "password";
      passwordFields.confirmedPassword.icon = passwordFields.confirmedPassword.icon === "eye-off-outline" ? "eye-outline" : "eye-off-outline";
    }

    if(fieldName === "actualPassword" && passwordFields.actualPassword) {
      passwordFields.actualPassword.type = passwordFields.actualPassword.type === "password" ? "text" : "password";
      passwordFields.actualPassword.icon = passwordFields.actualPassword.icon === "eye-off-outline" ? "eye-outline" : "eye-off-outline";
    }
  }

  getParamsFromUrl<T>(url: string): TUrlParams<T> | undefined {
    const queryString = url.split("?")[1];

    if (!queryString) {
      return undefined;
    }

    const paramsObject = {} as TUrlParams<T>;
    const paramsArray = queryString.split("&");

    paramsArray.forEach(param => {
      const [key, value] = param.split("=");
      paramsObject[key as keyof T] = decodeURIComponent(value);
    });

    return paramsObject;
  }

  deleteProperties<T extends object>(obj?: T, ...keysToDelete: (keyof T)[]): T | undefined {
    if (obj) {
      keysToDelete.forEach(key => {
        if (key in obj) {
          delete obj[key];
        }
      });

      return obj;
    }

    return undefined;
  }

  compareObjects<T extends object>(
    obj1: T,
    obj2: T,
    propertiesToCompare: (keyof T)[] = Object.keys(obj1) as (keyof T)[]
  ): boolean {
    for (const key of propertiesToCompare) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  cleanString(string: string): string {
    return string.replace(/[-./\s#$()]/g, "");
  }

  async getObservableValue<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve) => {
      observable.subscribe((value) => {
        resolve(value);
      });
    });
  }

  public validateForm(
    form: FormGroup,
    errors: { [key: string]: { message: string; display: boolean } },
    step: number = 0,
    type: "client" | "clientPJ" = "client",
  ): boolean {
    if (form.valid) {
      return true;
    }

    const errorMappings: { [errorType: string]: (control: AbstractControl) => string } = {
      required: () => "Campo obrigatório",
      invalidName: () => "Nome inválido",
      incompleteName: () => "Sobrenome é obrigatório",
      invalidLastNameLength: () => "Sobrenome é obrigatório",
      invalidAge: () => "A idade mínima permitida é de 18 anos!",
      invalidCPF: () => "CPF inválido",
      email: () => "E-mail inválido!",
      invalidCellphone: () => "Celular inválido!",
      invalidRange: () => "Data de nascimento inválida!",
      invalidDate: () => "Data de nascimento inválida!",
      invalidEmail: () => "E-mail inválido!",
      invalidPassword: () => "Sua senha deve conter no mínimo 8 caracteres, pelo menos 1 letra e 1 número!",
      passwordMismatch: () => "As senhas não coincidem!",
      invalidZipCode: () => "CEP inválido!",
      invalidAddressNumber: () => "Número inválido!",
      termsNotAccepted: () => "Você precisa aceitar os termos para continuar!",
      minlength: (control: AbstractControl) => `O campo precisa ter no mínimo ${control.errors?.["minlength"].requiredLength} caracteres`,
      invalidCardNumber: () => "Número de cartão inválido",
      invalidExpirationDate: () => "Data de expiração inválida",
      invalidCVV: () => "CVV inválido",
      invalidRG: () => "RG inválido",
      invalidCNH: () => "CNH inválida",
      invalidCNPJ: () => "CNPJ inválido",
      invalidBusinessName: () => "Nome da empresa inválido",
      invalidMonthlyBilling: () => "Faturamento mensal inválido",
      invalidDateConstitution: () => "Data de fundação inválida",
      minimumValue: () => "Valor mínimo não atingido",
    };

    const validateStep = (controls: { [key: string]: AbstractControl }) => {
      for (const key in controls) {
        if (errors[key]) {
          const control = controls[key];
          for (const errorType in control.errors) {
            const errorMessageFn = errorMappings[errorType];
            if (errorMessageFn) {
              const errorMessage = errorMessageFn(control);
              errors[key].message = errorMessage;
              errors[key].display = true;
            }
          }
        }
      }

      return Object.values(errors).some(error => error.display);
    };

    const clientControls: { [key: number]: { [key: string]: AbstractControl } } = {
      1: {
        name: form.controls['name'],
        birthDate: form.controls['birthDate'],
        cpf: form.controls['cpf'],
        email: form.controls['email'],
        phone: form.controls['phone'],
        motherName: form.controls['motherName']
      },
      2: {
        password: form.controls['password'],
        confirmedPassword: form.controls['confirmedPassword'],
      },
      3: {
        zipCode: form.controls['zipCode'],
        street: form.controls['street'],
        addressNumber: form.controls['addressNumber'],
        addressComplement: form.controls['addressComplement'],
        neighborhood: form.controls['neighborhood'],
        city: form.controls['city'],
        stateInitials: form.controls['stateInitials'],
      },
      4: {
        businessName: form.controls['businessName'],
        typeBusiness: form.controls['typeBusiness'],
        cnpj: form.controls['cnpj'],
      }
    };

    const clientPJControls: { [key: number]: { [key: string]: AbstractControl } } = {
      1: {
        businessName: form.controls['businessName'],
        businessType: form.controls['businessType'],
        cnpj: form.controls['cnpj'],
        monthlyBilling: form.controls['monthlyBilling'],
        dateConstitution: form.controls['dateConstitution'],
        email: form.controls['email'],
        phone: form.controls['phone'],
      },
      2: {
        password: form.controls['password'],
        confirmedPassword: form.controls['confirmedPassword'],
      },
      3: {
        zipCode: form.controls['zipCode'],
        street: form.controls['street'],
        addressNumber: form.controls['addressNumber'],
        addressComplement: form.controls['addressComplement'],
        neighborhood: form.controls['neighborhood'],
        city: form.controls['city'],
        stateInitials: form.controls['stateInitials'],
      },
    };

    const controls = type === 'client' ? clientControls : clientPJControls;

    return !validateStep(controls[step]);
  }

  formatPhoneNumber(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  formatZipCode(zipCode: string) {
    zipCode = zipCode.replace(/\D/g, '');
    return zipCode.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  formatPrice(price: string | number) {
    if(typeof price === 'number') {
      price = price.toFixed(2);
      price = price.toString();
    } else {
      price = parseFloat(price).toFixed(2);
    }
    return price.replace(".", ",");
  }

  formatCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  formatAccount(account: string) {
    account = account.replace(/\D/g, '');
    return account.replace(/(\d{8})(\d{1})/, '$1-$2');
  }

  async openModal<T>(
    page: Type<T>,
    cssClass: string = '',
    props?: object,
    callback?: Function,
    backdropDismiss: boolean = true,
    id: string = ''
    ) {
      const modal = await this.modalController.create({
          component: page,
          cssClass,
          mode: 'ios',
          componentProps: props,
          animated: true,
          backdropDismiss,
          keyboardClose: true,
          id: id
      });

      modal.onDidDismiss().then((props) => {
          if (callback) {
              callback(props);
          }
      });

      await modal.present();

      return modal;
  }

  async closeModal() {
    await this.modalController.dismiss();
  };

  getCurrentDayAndTime(): { currentDay: number, currentTime: string } {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toTimeString().split(' ')[0];
    return { currentDay, currentTime };
  }

  validatePlatform(): IPlatformDevice {
    let platformDevice: IPlatformDevice = {
        device: 'desktop',
        platform: 'desktop'
    };

    if (this.platform.is('mobile')) platformDevice.device = 'mobile';

    if (this.platform.is('android')) platformDevice.platform = 'android';
    if (this.platform.is('ios')) platformDevice.platform = 'ios';
    if (this.platform.is('mobileweb')) platformDevice.platform = 'web';

    return platformDevice;
  }

  isEmpty(obj: object | null) {

    if (obj === null || obj === undefined) {
      return true;
    }

    if (Array.isArray(obj)) {
      return obj.length === 0;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).length === 0;
    }

    return false;
  };

  // IsUserLogged() : boolean {
  //   const user = this.getStorage<IUserReduced>('user');
  //   if(user && user.jwt) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

    /**
   * Converte uma data no formato "dd/mm/yyyy" para "yyyy-mm-dd" ou vice-versa.
   * @param {string} dateString A string contendo a data a ser convertida.
   * @param {boolean} isConvert Um booleano indicando se a conversão deve ser feita de "dd/mm/yyyy" para "yyyy-mm-dd" (true) ou vice-versa (false).
   * @returns {string} A data convertida no formato especificado.
  */
    convertDate(dateString: string, isConvert: boolean): string {
      if (!dateString) {
        return "";
      }

      if (isConvert) {
        const parts = dateString.split("/");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else {
        const parts = dateString.split("-");
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }



  convertToFloat(value: string): number {
    const cleanedValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
    return parseFloat(cleanedValue);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = this.platform.width();
  }

  validateDate(date: string): boolean {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(date)) {
      this.showToast('Por favor, insira uma data válida.', 'error');
      return false;
    }

    const [day, month, year] = date.split('/').map(Number);

    const dateObj = new Date(year, month - 1, day);
    if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
      this.showToast('Por favor, insira uma data válida.', 'error');
      return false;
    }

    const today = new Date();
    if (dateObj > today) {
      this.showToast('A data selecionada não pode ser posterior à data atual.', 'error');
      return false;
    }

    if (year < 2022) {
      this.showToast('Por favor, insira um ano a partir de 2022 para consultar o extrato.', 'error');
      return false;
    }

    return true;
  }

  validateCNPJ(cnpj: string): boolean {

    const cnpjFormatted = cnpj.replace(/\D/g, '');

    if (cnpjFormatted === "00000000000000") {
      return false;
    }

    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!cnpjPattern.test(cnpj)) {
      return false;
    }

    return true;
  }

  validateCPF(cpf: string): boolean {
    const cpfFormatted = cpf.replace(/\D/g, '');
    let sum = 0;
    let remainder: number;

    if (cpfFormatted === "00000000000") {
      return false;
    }

    for (let index = 1; index <= 9; index++) {
      sum += parseInt(cpfFormatted.substring(index - 1, index), 10) * (11 - index);
    }

      remainder = (sum * 10) % 11;
      remainder = remainder === 10 || remainder === 11 ? 0 : remainder;

    if (remainder !== parseInt(cpfFormatted.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;

    for (let index = 1; index <= 10; index++) {
      sum += parseInt(cpfFormatted.substring(index - 1, index), 10) * (12 - index);
    }

    remainder = (sum * 10) % 11;
    remainder = remainder === 10 || remainder === 11 ? 0 : remainder;

    if (remainder !== parseInt(cpfFormatted.substring(10, 11), 10)) {
      return false;
    }

    return true;
  }

  dateNow(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}/${hour}:${minute}:${second}`;
    return formattedDate;
  }

  showLoading() {
    this.openModal(
      HomePage,
      'loading',
      {},
      (props: ()=>{}) => {},
      false
    );
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  calculateTotalValue(principalValue: number, interestValue: number): string {
    const totalValue = principalValue + interestValue;
    return this.formatCurrency(totalValue);
  }

  formatMaskedPhoneNumber(phone: string): string {
    const match = phone.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) XXXXX-${match[3]}`;
    }
    return phone;
  }

  isSequential(password: string, ascending: boolean): boolean {
    const sequence = ascending ? '0123456789' : '9876543210';

    for (let i = 0; i <= sequence.length - password.length; i++) {
      if (sequence.substring(i, i + password.length) === password) {
        return true;
      }
    }

    return false;
  }

  isPasswordValid(password: string): boolean {
    if (!/^\d{4}$/.test(password)) {
      this.showToast('A senha deve conter 6 dígitos.', 'error');
      return false;
    }

    if (this.isSequential(password, true)) {
      this.showToast('A senha não pode ser sequencial.', 'error');
      return false;
    }

    if (this.isSequential(password, false)) {
      this.showToast('A senha não pode ser sequencial.', 'error');
      return false;
    }

    if (/^(\d)\1{5}$/.test(password)) {
      this.showToast('A senha não pode ser composta por um único dígito.', 'error');
      return false;
    }

    return true;
  }

}
