import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {
  isMobile!: boolean;
  contatos: any[] = [];
  dataTest: any[] = [];

  fieldsToShow = ['id','nome','celular', 'profissao'];
  fieldsTest = ['userId','id','title', 'body'];
  links = ['id'];

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) {

    // console.log('datas:', this.datas);
    // console.log('contatos:', this.contatos);
  }


  ngOnInit() {
    this.carregarContatos();
    this.checkWindowSize();
    this.carregarTest();
  }

  carregarContatos() {
    this.dataService.getContatos().subscribe(
      (data) => {
        // console.log('Contatos recebidos:', data);
        this.contatos = data; // Armazena os contatos retornados pela API
        // console.log('Contatos:', this.contatos);
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  }

  carregarTest() {
    this.dataService.getTest().subscribe(
      (data) => {
        // console.log('Contatos recebidos:', data);
        this.dataTest = data; // Armazena os contatos retornados pela API
        // console.log('Contatos:', this.dataTest);
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
    }

    handleLinkClick(event: { row: any, field: string }) {
      console.log('Evento recebido no componente pai:', event.row.profissao);
      // Aqui você pode executar qualquer ação, como abrir um modal, redirecionar, etc.
    }



  datas = [
    {
      marca: 'Toyota', modelo: 'Corolla', placa: 'ABC-1234', suCia: 'SU-123',
      patrimonio: '123456', hodometro: '12000', problema: 'Problema X', sistemaAfetado: 'Sistema Y',
      data: '2025-01-01', manutencao: 'Manutenção Z', os: 'OS123',
      peca: 'Peça A', ficha: 'Ficha1', servico: 'Serviço B',
      quantidade: 2, retiradoPor: 'Fulano', usuario: 'Beltrano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'DEF-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '25000', problema: 'Problema Y', sistemaAfetado: 'Sistema X',
      data: '2025-02-10', manutencao: 'Manutenção A', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço C',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Beltrano'
    }
  ];



  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
