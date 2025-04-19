import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";
import { VeiculoInfoModalComponent } from '../veiculo-info-modal/veiculo-info-modal.component';

interface ICardInfo {
  id_os: string;
  data: string;
  marca_da_viatura: string;
  modelo: string;
  placa_eb: string;
  su_cia_da_viatura: string;
  patrimonio: string;
  hodometro: string;
  problema_apresentado: string;
  sistema_afetado: string;
  causa_da_avaria: string;
  manutencao: 'PREVENTIVA' | 'CORRETIVA' | string;
  usuario: string;
  perfil: 'ADMINISTRADOR' | 'USUARIO' | string;
  situacao_os_aberta: 'ABERTA' | 'FECHADA' | 'RETIRADA' | string;
  cadastro_login_idabrios: string;
  id_encerramento: string;
  nome_mecanico: string;
  data_da_manutencao: string;
  situacao_os_encerrada: 'ABERTA' | 'FECHADA' | 'RETIRADA' | string;
  tempo_total: string; 
  cadastro_login_id: string;
}


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],

})
export class CardInfoComponent  implements OnInit {

  @Input() viaturas : ICardInfo[] = [];


  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  async abrirDetalhesViatura(viatura: ICardInfo) {
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
