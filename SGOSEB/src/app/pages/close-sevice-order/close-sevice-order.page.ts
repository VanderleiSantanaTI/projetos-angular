import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IPlatformDevice } from '../../interfaces/platform-device';

@Component({
  selector: 'app-close-sevice-order',
  templateUrl: './close-sevice-order.page.html',
  styleUrls: ['./close-sevice-order.page.scss'],
  standalone: false
})
export class CloseSeviceOrderPage implements OnInit {
  isMobile!: boolean;
  selectedDate: any;
  form: FormGroup;

  isModalOpen = false;  // Variável para controlar a abertura do modal
  listaOS = ['OS1', 'OS2', 'OS3']; // Exemplo de lista de OS(s)

  // Método para abrir o modal
  openSearchModal() {
    this.isModalOpen = true;
  }

  // Método para fechar o modal
  closeModal() {
    this.isModalOpen = false;
  }

  @ViewChildren(IonDatetime) dateTimeFields!: QueryList<IonDatetime>;
  // platformActive: IPlatformDevice;

  constructor(
    private utilsService: UtilsService,
    private fb: FormBuilder, private modalController: ModalController) {
    this.form = this.fb.group({
      OS: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      nome: ['', Validators.required],
      dateSelected: [null, Validators.required]
    });
    // this.platformActive = this.utilsService.validatePlatform();
  }

  ngOnInit() {
    this.checkWindowSize();
  }

  async onDateChange(event: any) {
    this.selectedDate = event.detail.value; // Armazena o valor da data selecionada
    // this.form.controls['dateSelected'].setValue(new Date(this.selectedDate).toLocaleDateString('pt-BR')); // Formata a data e atualiza o formulário
    this.form.controls['dateSelected'].setValue(new Date(this.selectedDate))
    console.log('Data selecionada:', this.form.controls['dateSelected'].value);

    // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
      await modal.dismiss(); // Fecha o modal
    }
  }


  limpar() {
    this.form.reset();
    this.dateTimeFields.forEach(date => date.value = '');
  }

  cadastrar() {
    if (this.form.valid) {
      const osData = this.form.value;
      console.log('Cadastro realizado:', osData);
      this.limpar();
      this.utilsService.showToast('(OS) FECHADA com sucesso!.', 'success');
      // this.utilsService.validateDate('12/13/2022');
      // window.location.reload();success
    } else {
      this.adicionarRequired();
    }
  }

  adicionarRequired() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValidators(Validators.required);
      this.form.controls[key].updateValueAndValidity();
    });
  }

  onKeyPressBlock(event: KeyboardEvent) {
    if (isNaN(Number(event.key))) {
      event.preventDefault(); // Bloqueia o caractere
    }
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  // formValido(): boolean {
  //   // Verifica se todos os campos obrigatórios estão preenchidos
  //   return (
  //     !!this.nome.trim() &&
  //     !!this.selectedDate
  //   );
  // }

  limitNumber(event: any) {
    const maxLength = 20; // Defina o número máximo de caracteres permitidos
    const input = event.target.value;
    event.target.value = input.slice(0, maxLength); // Limita o número de caracteres

    if (input.length > maxLength) {
      this.form.controls['OS'].setValue(event.target.value); // Atualiza o valor no modelo
  }
}

}
