import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { VeiculoInfoModalComponent } from '../veiculo-info-modal/veiculo-info-modal.component';

interface CardInfo {
  // aberta
  cadastro_login_idabrios?: string;
  causa_da_avaria?: string;
  data?: string;
  hodometro?: string;
  id: string;
  manutencao?: string;
  marca_da_viatura?: string;
  modelo?: string;
  patrimonio?: string;
  perfil?: string;
  placa_eb?: string;
  problema_apresentado?: string;
  sistema_afetado?: string;
  situacao_os: string;
  su_cia_da_viatura?: string;
  usuario?: string;
  // fechada
  abrir_os_id?: string;
  cadastro_login_id?: string;
  data_da_manutencao?: string;
  modelo_veiculo?: string;
  nome_mecanico?: string;
  nome_usuario?: string;
  tempo_total?: string;
}
@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],

})
export class CardInfoComponent  implements OnInit {

  @Input() viaturas : CardInfo[] = [];


  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  async abrirDetalhesViatura(viatura: CardInfo) {
    const modal = await this.modalController.create({
      component: VeiculoInfoModalComponent,
      componentProps: {
        viatura: viatura
      },
      cssClass: 'viatura-modal-centralizado', // Classe para centralizar o modal
      backdropDismiss: true,
      showBackdrop: true
    });

    return await modal.present();
  }
}
