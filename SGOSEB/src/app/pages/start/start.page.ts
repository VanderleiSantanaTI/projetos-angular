
import { Component, HostListener, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { DataService } from 'src/app/services/data/data.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false,

})
export class StartPage implements OnInit{
  isMobile!: boolean;
  userInfo: any;
  dadosOS: any[] = [];
  isLoading: boolean = true;

  constructor(
    private platform: Platform,
    private authService: AuthServiceService,
    private navService: NavService,
    private utilsService: UtilsService,
    private dataService: DataService
  ) {
  }



  ngOnInit() {
        // Detecta se é mobile baseado na largura da tela
        this.checkIfMobile();

        // Monitora mudanças de tamanho da tela
        // this.platform.resize.subscribe(() => {
        //   this.checkIfMobile();
        // });



    this.carregarAberta_os()
    this.authService.startTokenValidation();
    // this.checkWindowSize();

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
    // this.checkWindowSize();
    this.checkIfMobile();
  }
  // checkWindowSize() {
  //   this.isMobile = window.innerWidth < 768;
  // }
  checkIfMobile() {
    this.isMobile = this.platform.width() < 768; // md breakpoint do Ionic
  }

  async  carregarAberta_os() {
    this.isLoading = true;
    try {
      const data = await this.dataService.getALL_os();
   
      this.dadosOS = data;
      
      console.log('Dados pesquisa:', this.dadosOS);
      
      this.isLoading = false;
      // console.log('Dados pesquisa:',  [
      //   { modelo: 'Fiat Toro', status: 'aberta', detalhes: 'Troca de óleo' },
      //   { modelo: 'Hilux', status: 'fazendo', detalhes: 'Revisão completa' }]);

    // const fechadas = data.filter((item) => item.situacao_os === 'ABERTA');
    //   console.log('OS Fechadas:', fechadas);
    } catch (error) {
      console.error('Erro ao carregar OS:', error);
      this.isLoading = false;
    }
  }


}
