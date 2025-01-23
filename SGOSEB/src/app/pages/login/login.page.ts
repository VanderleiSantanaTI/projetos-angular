import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {
  selectedDate: any;
  form: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

    constructor(
      private utilsService: UtilsService,
      private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        login: ['', Validators.required],
        password: [null, Validators.required]
      });
      // this.platformActive = this.utilsService.validatePlatform();
    }

  ngOnInit() {
  }

  cadastrar() {
    if (this.form.valid) {
      const osData = this.form.value;
      console.log('Cadastro realizado:', osData);
      this.limpar();
      this.utilsService.showToast('✔ Login com sucesso!.', 'success');

    } else {
      this.adicionarRequired();
    }
  }




  adicionarRequired() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValidators(Validators.required);
      this.form.controls[key].updateValueAndValidity();
    });
  }



  limpar() {
    this.form.reset();
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }


}
