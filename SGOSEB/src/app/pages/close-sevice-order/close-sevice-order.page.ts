import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-close-sevice-order',
  templateUrl: './close-sevice-order.page.html',
  styleUrls: ['./close-sevice-order.page.scss'],
  standalone: false
})
export class CloseSeviceOrderPage implements OnInit {
  isMobile!: boolean;
  encerrar: string = '';
  formatedDate: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.checkWindowSize();
  }

  async onDateChange(event: any) {
    const selectedDate = event.detail.value; // Armazena o valor da data selecionada
    this.formatedDate = new Date(selectedDate).toLocaleDateString('pt-BR'); // Formata a data

    console.log("Data selecionada:", this.formatedDate);

    // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
      await modal.dismiss(); // Fecha o modal
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  formValidoEncerrar(): boolean {
    // Verifica se todos os campos obrigatórios estão preenchidos
    return (
      !!this.encerrar.trim() &&
      !!this.formatedDate
    );
  }

  cadastrarEncerrar() {
    const osData = {
      encerrar: this.encerrar,
      formatedDate: this.formatedDate
    };
    console.log('Cadastro realizado:', osData);
    alert('Ordem de Serviço encerrada com sucesso!');

    window.location.reload();
  }
}
