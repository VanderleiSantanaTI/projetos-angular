import { UtilsService } from './../../services/utils/utils.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { NavService } from 'src/app/services/nav/nav.service';


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
    marca_da_viatura: 'Marca',
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
    private navService: NavService,

  ) { }

  ngOnInit() {
    // this.validateTokenAndNavigate();
    this.carregarAberta_os();
    this.checkWindowSize();
  }


  redirectToLogin(message: string) {
    this.navService.navigateRoot('/login');
    this.utilsService.showToast(message, 'error');
  }

  // carregarAberta_os() {
  //   this.isLoading = true;

  //   from(this.dataService.getAbrir_os()).subscribe(
  //     (data) => {
  //       this.dados = data;
  //       this.isLoading = false;


  //       const fechadas = data.filter((item) => item.situacao_os === 'FECHADA');
  //       console.log('OS Fechadas:', fechadas);
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar OS:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

 async  carregarAberta_os() {
    this.isLoading = true;
    try {
      const data = await this.dataService.getAbrir_os();
      this.dados = data;
      this.isLoading = false;

      const fechadas = data.filter((item) => item.situacao_os === 'FECHADA');
      console.log('OS Fechadas:', fechadas);
    } catch (error) {
      console.error('Erro ao carregar OS:', error);
      this.isLoading = false;
    }
  }




  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
