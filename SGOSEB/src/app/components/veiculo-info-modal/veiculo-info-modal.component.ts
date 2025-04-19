import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ICardInfo } from 'src/app/interfaces/cardInfo';


@Component({
  selector: 'app-veiculo-info-modal',
  templateUrl: './veiculo-info-modal.component.html',
  styleUrls: ['./veiculo-info-modal.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class VeiculoInfoModalComponent implements OnInit {
  
  @Input() viatura!: ICardInfo; 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('Dados da viatura recebidos:', this.viatura);
  }

  // Método para fechar a modal
  fecharModal() {
    this.modalController.dismiss();
  }
}
