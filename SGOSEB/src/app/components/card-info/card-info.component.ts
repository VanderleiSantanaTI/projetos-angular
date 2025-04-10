import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],

})
export class CardInfoComponent  implements OnInit {

  @Input() viaturas: any[] = [];

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
