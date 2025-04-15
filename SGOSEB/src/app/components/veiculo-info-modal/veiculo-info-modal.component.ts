import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-veiculo-info-modal',
  templateUrl: './veiculo-info-modal.component.html',
  styleUrls: ['./veiculo-info-modal.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class VeiculoInfoModalComponent implements OnInit {
  // Recebe os dados da viatura como input
  @Input() viatura: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('Dados da viatura recebidos:', this.viatura);
  }

  // Método para fechar a modal
  fecharModal() {
    this.modalController.dismiss();
  }
}
