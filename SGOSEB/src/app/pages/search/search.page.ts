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
        console.log('Contatos:', this.dados);
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
