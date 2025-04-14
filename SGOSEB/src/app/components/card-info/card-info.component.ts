import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";

interface CardInfo {
  // aberta
cadastro_login_idabrios: string;
causa_da_avaria: string;
data: string;
hodometro: string;
id: string;
manutencao: string;
marca_da_viatura: string;
modelo: string;
patrimonio: string;
perfil: string;
placa_eb: string;
problema_apresentado: string;
sistema_afetado: string;
situacao_os: string;
su_cia_da_viatura: string;
usuario: string;
//fechada
abrir_os_id: string;
cadastro_login_id: string;
data_da_manutencao: string;
modelo_veiculo: string;
nome_mecanico: string;
nome_usuario: string;
tempo_total: string
}
@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],

})
export class CardInfoComponent  implements OnInit {

  @Input() viaturas : CardInfo[] = [];

//   viaturas = [
//     { modelo: 'Fiat Toro', status: 'aberta', detalhes: 'Troca de óleo' },
//     { modelo: 'Hilux', status: 'fazendo', detalhes: 'Revisão completa' },
//     { modelo: 'Fiat Pálio', status: 'aberta', detalhes: 'Troca de óleo' },
//     { modelo: 'Renault Duster', status: 'pronto', detalhes: 'Limpeza final' },
//     { modelo: 'Strada', status: 'retirada', detalhes: 'Já entregue' }, // não será exibido
//     { modelo: 'Chevrolet S10', status: 'aberta', detalhes: 'Troca de pneus' },
//     { modelo: 'Ford Ranger', status: 'fazendo', detalhes: 'Revisão elétrica' },
//     { modelo: 'Volkswagen Amarok', status: 'pronto', detalhes: 'Lavagem completa' },
//     { modelo: 'Jeep Compass', status: 'aberta', detalhes: 'Troca de bateria' },
//     { modelo: 'Toyota Corolla', status: 'fazendo', detalhes: 'Revisão de freios' }
// ];
  constructor() { }

  ngOnInit() {}

}
