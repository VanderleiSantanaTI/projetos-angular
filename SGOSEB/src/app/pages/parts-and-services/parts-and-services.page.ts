import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';



@Component({
  selector: 'app-parts-and-services',
  templateUrl: './parts-and-services.page.html',
  styleUrls: ['./parts-and-services.page.scss'],
  standalone: false,

})
export class PartsAndServicesPage implements OnInit {
  isMobile!: boolean;
  segmentValue: string = 'pecas';
  dadosPecas: any[] = [];
  dadosServicos: any[] = [];


  fieldsToPecsa: string[] = ['abrir_os_id', 'peca_utilizada', 'qtd', 'num_ficha'];
  renamedHeadersPecas: any = {abrir_os_id: 'O.S', peca_utilizada: 'Peça Utilizada', qtd: 'Quantidade', num_ficha: 'Número da Ficha'};
  fieldsToServicos: string[] = ['abrir_os_id', 'servico_realizado','tempo_de_servico_realizado'];
  renamedHeadersServicos = {abrir_os_id: 'O.S', servico_realizado: 'Serviço Realizado', tempo_de_servico_realizado: 'Tempo de Serviço'};
  constructor(
        private dataService: DataService,
        private cdr: ChangeDetectorRef,
  ) {
  }


  ngOnInit() {
    this.carregarServicos();
    this.carregarPecas();
    this.checkWindowSize();
  }


  carregarPecas() {
    this.dataService.getPecas().subscribe(
      (data) => {
        this.dadosPecas = data;
        console.log('Contatos:', this.dadosPecas);
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  }

  carregarServicos() {
    this.dataService.getServicos().subscribe(
      (data) => {
        this.dadosServicos = data;
        console.log('Contatos:', this.dadosServicos);
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
