import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit, OnDestroy {
  isMobile!: boolean;
  userInfo: any;
  private tokenCheckInterval: any;

  constructor(
    private authService: AuthServiceService,
    private navService: NavService,
    private utilsService: UtilsService
  ) {
  }



  ngOnInit() {
    this.authService.startTokenValidation();

  
  }

  ngOnDestroy() {
    // Limpar o intervalo quando o componente for destruído
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  }

  checkTokenValidity() {
    if (!this.authService.isTokenValid()) {
      this.logout();
      this.utilsService.showToast('✖ Token expirado. Faça o Login novamente!', 'error');
      return;
    }

    // Se o token for válido, obtém o payload
    const payload = this.authService.getTokenPayload();
    if (payload) {
      this.userInfo = payload.data; // Acessa os dados do usuário
      console.log('Nome:', this.userInfo.nome);
      console.log('Perfil:', this.userInfo.perfil);
      console.log('Status:', this.userInfo.status);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  logout(): void {
    // Chama o método de logout do AuthService
    this.authService.logout();
    // Navega para a página de login após o logout
    this.navService.navigateForward('/login');
  }
}
