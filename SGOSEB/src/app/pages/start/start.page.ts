import { Component, HostListener, OnInit} from '@angular/core';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit{
  isMobile!: boolean;
  userInfo: any;


  constructor(
    private authService: AuthServiceService,
    private navService: NavService,
    private utilsService: UtilsService
  ) {
  }



  ngOnInit() {
    this.authService.startTokenValidation();
    this.checkWindowSize();

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

  logout(): void {
    // Chama o método de logout do AuthService
    this.authService.logout();
    // Navega para a página de login após o logout
    this.navService.navigateForward('/login');
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }
  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  viaturasDashboard = [
    { modelo: 'Fiat Toro', status: 'aberta', detalhes: 'Troca de óleo' },
    { modelo: 'Hilux', status: 'fazendo', detalhes: 'Revisão completa' },
    { modelo: 'Fiat Pálio', status: 'aberta', detalhes: 'Troca de óleo' },
    { modelo: 'Renault Duster', status: 'pronto', detalhes: 'Limpeza final' },
    { modelo: 'Strada', status: 'retirada', detalhes: 'Já entregue' }, // não será exibido
    { modelo: 'Chevrolet S10', status: 'aberta', detalhes: 'Troca de pneus' },
    { modelo: 'Ford Ranger', status: 'fazendo', detalhes: 'Revisão elétrica' },
    { modelo: 'Volkswagen Amarok', status: 'pronto', detalhes: 'Lavagem completa' },
    { modelo: 'Jeep Compass', status: 'aberta', detalhes: 'Troca de bateria' },
    { modelo: 'Toyota Corolla', status: 'fazendo', detalhes: 'Revisão de freios' }
  ];


}
