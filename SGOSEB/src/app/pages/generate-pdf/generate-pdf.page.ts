import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.page.html',
  styleUrls: ['./generate-pdf.page.scss'],
  standalone: false
})
export class GeneratePdfPage implements OnInit {
  isMobile!: boolean;
  contatos: any[] = [];


  fieldsToShow = ['id','nome_mecanico','data_da_manutencao', 'abrir_os_id'];
  links = [];

  constructor(
        private cdr: ChangeDetectorRef,
        private dataService: DataService
  ) {
   }

  ngOnInit() {
    this.carregarOSFechada();
    this.checkWindowSize();

  }
  carregarOSFechada() {
    this.dataService.getFechada_os().subscribe(
      (data) => {
        // console.log('Contatos recebidos:', data);
        this.contatos = data; // Armazena os contatos retornados pela API
        console.log('Contatos:', this.contatos);
        // console.log('Contatos:', this.contatos);
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
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  acaoBotao(event: { row: any}) {
    console.log('Ordem de serviço:', event.row.id);
    // Aqui você pode executar qualquer ação, como abrir um modal, redirecionar, etc.
  }
}
