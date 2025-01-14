import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-os',
  templateUrl: './report-os.page.html',
  styleUrls: ['./report-os.page.scss'],
  standalone:false
})
export class ReportOsPage implements OnInit {
  OS!:number;
  peca: string = '';
  formatedDate: string = '';
  ficha: string = '';
  servico: string = '';
  quantidade: number = 0;
  isMobile!: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.checkWindowSize();
  }

  async onDateChange(event: any) {
    const selectedDate = event.detail.value; // Armazena o valor da data selecionada
    this.formatedDate = new Date(selectedDate).toLocaleDateString('pt-BR'); // Formata a data


    console.log(" selecionada:", this.formatedDate);

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
      formatedDate: this.formatedDate,
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
      this.quantidade > 0 &&
      this.OS > 0 &&
      !!this.formatedDate
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
