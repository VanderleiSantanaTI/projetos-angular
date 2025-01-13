import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-os',
  templateUrl: './report-os.page.html',
  styleUrls: ['./report-os.page.scss'],
  standalone:false
})
export class ReportOsPage implements OnInit {
  dateSelected: string = '';
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async onDateChange(event: any) {

    this.dateSelected = event.detail.value; // Armazena o valor da data selecionada
    this.dateSelected = new Date(this.dateSelected).toLocaleDateString('pt-BR'); // Formata a data
    console.log('Data selecionada:', this.dateSelected);

       // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
         await modal.dismiss(); // Fecha o modal
       }
  }
}
