import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-os',
  templateUrl: './register-os.page.html',
  styleUrls: ['./register-os.page.scss'],
  standalone: false,
  
})
export class RegisterOsPage {
  marca: string = '';
  modelo: string = '';
  placa: string = '';
  suCia: string = '';
  patrimonio: number | null = null;
  hodometro: number | null = null;
  problema: string = '';
  sistema: string = '';
  causa: string = '';
  manutencao: string = '';
  dateSelected: string = '';
  

  constructor(private modalController: ModalController) {}

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

  limpar() {
    this.marca = '';
    this.modelo = '';
    this.placa = '';
    this.suCia = '';
    this.patrimonio = null;
    this.hodometro = null;
    this.problema = '';
    this.sistema = '';
    this.manutencao = '';
    this.causa = '';
    this.dateSelected = '';
  }

  cadastrar() {
    const osData = {
      marca: this.marca,
      modelo: this.modelo,
      placa: this.placa,
      suCia: this.suCia,
      patrimonio: this.patrimonio,
      hodometro: this.hodometro,
      problema: this.problema,
      sistema: this.sistema,
      manutencao: this.manutencao,
      causa: this.causa,
      date: this.dateSelected,
    };
    console.log('Cadastro realizado:', osData);
    alert('Ordem de Serviço cadastrada com sucesso!');
  }

  formValido(): boolean {
    // Verifica se todos os campos obrigatórios estão preenchidos
    return (
      !!this.marca.trim() &&
      !!this.modelo.trim() &&
      !!this.placa.trim() &&
      !!this.suCia.trim() &&
      this.patrimonio !== null &&
      this.hodometro !== null &&
      !!this.problema.trim() &&
      !!this.sistema.trim() &&
      !!this.manutencao.trim() &&
      !!this.causa.trim() &&
      !!this.dateSelected 
    );
  }

  onKeyPressBlock(event: KeyboardEvent) {
    const invalidChars = ['e', 'E', '+', '-','.',','];
    
    if (invalidChars.includes(event.key)) {
      event.preventDefault(); // Bloqueia o caractere
    }

    
  }

  limitNumber(event: any) {
    const maxLength = 20; // Defina o número máximo de caracteres permitidos
    const input = event.target.value;
  
    if (input.length > maxLength) {
      event.target.value = input.slice(0, maxLength); // Limita o número de caracteres
      this.hodometro = event.target.value; // Atualiza o valor no modelo
    }
  }
  
}