import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { NavService } from 'src/app/services/nav/nav.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  isMobile!: boolean;
  dados: any[] = [];
  isLoading: boolean = true;

  fieldsToShow: string[] = [
    'id',
    'data',
    'marca_da_viatura',
    'modelo',
    'placa_eb',
    'su_cia_da_viatura',
    'patrimonio',
    'hodometro',
    'problema_apresentado',
    'sistema_afetado',
    'causa_da_avaria',
    'manutencao',
    'usuario',
    'perfil',
    'situacao_os',
  ];

  renomearCampos: any = {
    id: 'O.S',
    data: 'Data',
    marca_da_viatura: 'Marca ',
    modelo: 'Modelo',
    placa_eb: 'Placa EB',
    su_cia_da_viatura: 'SU/Cia',
    patrimonio: 'Patrimônio',
    hodometro: 'Hodômetro',
    problema_apresentado: 'Problema Apresentado',
    sistema_afetado: 'Sistema Afetado',
    causa_da_avaria: 'Causa da Avaria',
    manutencao: 'Manutenção',
    usuario: 'Usuário',
    perfil: 'Perfil',
    situacao_os: 'Situação da OS',
  };


  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private utilsService: UtilsService,
    private navService: NavService
  ) { }

  ngOnInit() {
    this.carregarAberta_os();
    this.checkWindowSize();
    this.validateTokenAndNavigate();
  }

  validateTokenAndNavigate() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Caso não haja token, redireciona para o login
      this.navService.navigateForward('/login');
      this.utilsService.showToast('✖ Você precisa estar logado!', 'error');
      return;
    }

    // Verifique a validade do token enviando para a API
    this.dataService.validateToken(token).subscribe(
      (response) => {
        console.log('Token validado com sucesso:', response);
        // Redireciona para a página principal, caso o token seja válido
        this.navService.navigateRoot('/home');
      },
      (error) => {
        console.error('Falha na validação do token:', error);
        
        // Caso o token seja inválido, redireciona para o login
        this.navService.navigateForward('/login');
        this.utilsService.showToast('✖ Token inválido. Faça o login novamente.', 'error');
      }
    );
  }
  
  carregarAberta_os() {
    this.isLoading = true;
    this.dataService.getAberta_os().subscribe(
      (data) => {
        this.dados = data; // Armazena os contatos retornados pela API
        this.isLoading = false;
        this.cdr.detectChanges();
        for (let item of data) {
          if (item.situacao_os === 'FECHADA') {
            console.log('Contatos:', item);
          }
        }
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
        this.isLoading = false;
      }
    );
  }





  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }
  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
