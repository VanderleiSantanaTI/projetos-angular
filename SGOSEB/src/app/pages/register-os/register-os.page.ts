import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-register-os',
  templateUrl: './register-os.page.html',
  styleUrls: ['./register-os.page.scss'],
  standalone: false
})
export class RegisterOsPage implements OnInit {
  form: FormGroup;
  isMobile!: boolean;
  selectedDate: any;

  @ViewChildren(IonDatetime) dateTimeFields!: QueryList<IonDatetime>;

  constructor(
        private fb: FormBuilder,
        private modalController: ModalController,
        private utilsService: UtilsService
      ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      suCia: ['', Validators.required],
      patrimonio: [null, [Validators.required, Validators.min(1)]],
      hodometro: [null, [Validators.required, Validators.min(1)]],
      problema: ['', Validators.required],
      sistema: ['', Validators.required],
      causa: ['', Validators.required],
      manutencao: ['', Validators.required],
      dateSelected: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.checkWindowSize();
  }

  async onDateChange(event: any) {
    this.selectedDate = event.detail.value; // Armazena o valor da data selecionada
    this.form.controls['dateSelected'].setValue(new Date(this.selectedDate).toLocaleDateString('pt-BR')); // Formata a data e atualiza o formulário
    // this.form.controls['dateSelected'].setValue(new Date(this.selectedDate))
    console.log('Data selecionada:', this.form.controls['dateSelected'].value);

    // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
      await modal.dismiss(); // Fecha o modal
    }
  }

  // clearDate() {
  //   this.form.controls['dateSelected'].setValue(null);
  // }

  limpar() {
    this.form.reset();
    this.dateTimeFields.forEach(date => date.value = '');
  }

  adicionarRequired() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValidators(Validators.required);
      this.form.controls[key].updateValueAndValidity();
    });
  }
  
  cadastrar() {
    if (this.form.valid) {
      const osData = this.form.value;
      console.log('Cadastro realizado:', osData);

      this.utilsService.showToast('Ordem de Serviço cadastrada com sucesso!', 'success');
      this.limpar();
      // window.location.reload();
    } else {
      this.adicionarRequired();
    }
  }
  onKeyPressBlock(event: KeyboardEvent) {
    if (isNaN(Number(event.key))) {
      event.preventDefault(); // Bloqueia o caractere
    }
  }

  limitNumber(event: any, field: 'hodometro' | 'patrimonio') {
    const maxLength = 20; // Defina o número máximo de caracteres permitidos
    const input = event.target.value;
    event.target.value = input.slice(0, maxLength); // Limita o número de caracteres

    if (input.length > maxLength && field === 'hodometro') {
      this.form.controls['hodometro'].setValue(event.target.value); // Atualiza o valor no modelo

    } else if (input.length > maxLength && field === 'patrimonio') {
      this.form.controls['patrimonio'].setValue(event.target.value); // Atualiza o valor no modelo
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
