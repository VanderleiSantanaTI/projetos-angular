import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { DataService } from 'src/app/services/data/data.service'; // Importe o serviço de dados
import { NavService } from 'src/app/services/nav/nav.service';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  userInfo: any;
  selectedDate: any;
  form: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private authService: AuthServiceService,
    private navService: NavService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private dataService: DataService // Injete o serviço de dados
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      senha: [null, Validators.required]
    });
    // this.platformActive = this.utilsService.validatePlatform();
  }

  ngOnInit() {
    this.authService.logout();


  }

  loginAccont() {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.dataService.postLogin(loginData).subscribe(
        (response) => { // O token já vem diretamente
          console.log('Login successful:', response);
          // Salva o token no localStorage para uso posterior
          localStorage.setItem('authToken', response.token);

          this.utilsService.showToast(`✔ ${response.message}`,'success');
          this.limpar();
          this.navService.navigateForward('/start');


        },
        (error) => {
          console.error('Login failed:', error);

          this.utilsService.showToast('✖ Senha ou login incorretos!', 'error');

        }
      );
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

  logout(): void {
    this.authService.logout();
    this.navService.navigateForward('/login');
    // this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }
}
