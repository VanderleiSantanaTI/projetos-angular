import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-os',
  templateUrl: './report-os.page.html',
  styleUrls: ['./report-os.page.scss'],
  standalone:false
})
export class ReportOsPage implements OnInit {
  encerrar: string = '';
  OS!:number;
  peca: string = '';
  dateSelected: string = '';
  dateSelectedEnd: string = '';
  ficha: string = '';
  servico: string = '';
  quantidade: number = 0;
  isMobile!: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.checkWindowSize();
  }

  async onDateChange(event: any, dateType: 'startDate' | 'endDate') {
    const selectedDate = event.detail.value; // Armazena o valor da data selecionada
    const formattedDate = new Date(selectedDate).toLocaleDateString('pt-BR'); // Formata a data
    if (dateType === 'startDate') {

      this.dateSelected = formattedDate;
    } else if (dateType === 'endDate') {

      this.dateSelectedEnd = formattedDate;
    }

    console.log(`${dateType} selecionada:`, formattedDate);

    // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
      await modal.dismiss(); // Fecha o modal
    }
  }

  cadastrar() {
    const osData = {
      peca: this.peca,
      ficha: this.ficha,
      servico: this.servico,
      quantidade: this.quantidade,
      dateSelected: this.dateSelected,
      OS: this.OS
    };

    console.log('Cadastro realizado:', osData);
    alert('Ordem de Serviço cadastrada com sucesso!');

    window.location.reload();
  }

  formValido(): boolean {
    // Verifica se todos os campos obrigatórios estão preenchidos
    return (
      !!this.servico.trim() &&
      !!this.quantidade &&
      this.quantidade > 0 &&
      this.OS > 0 &&
      !!this.dateSelected
    );
  }

  formValidoEncerrar(): boolean {
    // Verifica se todos os campos obrigatórios estão preenchidos
    return (
      !!this.encerrar.trim() &&
      !!this.dateSelectedEnd

    );
  }

  cadastrarEncerrar() {
    const osData = {
      encerrar: this.encerrar,
      date: this.dateSelectedEnd
    };
    console.log('Cadastro realizado:', osData);
    alert('Ordem de Serviço encerrada com sucesso!');

    window.location.reload();
  }


    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkWindowSize();
    }

    checkWindowSize() {
      this.isMobile = window.innerWidth < 768;
    }
}
