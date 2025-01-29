import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  isMobile!: boolean;
  dados: any[] = [];

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
  ) { }

  ngOnInit() {
    this.carregarAberta_os();
    this.checkWindowSize();
  }

  carregarAberta_os() {
    this.dataService.getAberta_os().subscribe(
      (data) => {
        // console.log('Contatos recebidos:', data);
        this.dados = data; // Armazena os contatos retornados pela API
        // console.log('Contatos:', this.contatos);
        for (let item of data) {
          if (item.situacao_os === 'FECHADA') {
            console.log('Contatos:', item);
          }
        }
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
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
