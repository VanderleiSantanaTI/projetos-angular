import { DataService } from 'src/app/services/data/data.service';
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
        private utilsService: UtilsService,
        private dataService: DataService
      ) {
    this.form = this.fb.group({
      data: [null, Validators.required],
      marca_da_viatura: ['', Validators.required],
      modelo: ['', Validators.required],
      placa_eb: ['', Validators.required],
      su_cia_da_viatura: ['', Validators.required],
      patrimonio: [null, [Validators.required, Validators.min(1)]],
      hodometro: [null, [Validators.required, Validators.min(1)]],
      problema_apresentado: ['', Validators.required],
      sistema_afetado: ['', Validators.required],
      causa_da_avaria: ['', Validators.required],
      manutencao: ['', Validators.required],
    });


  }

  ngOnInit() {
    this.checkWindowSize();
  }
  submitForm() {
    if (this.form.valid) {
      const osData = this.form.value;
      this.dataService.postOpenOS(osData).subscribe(
        response => {
          console.log('OS aberta com sucesso:', response);
          this.utilsService.showToast('✔ OS aberta com sucesso!', 'success');
          this.modalController.dismiss();
          this.limpar();
        },
        error => {
          console.error('Erro ao abrir OS:', error);
          this.utilsService.showToast('✖ Erro ao abrir OS. Tente novamente.', 'error');
        }
      );
    } else {
      this.utilsService.showToast('✖ Preencha todos os campos obrigatórios.', 'error');
    }
  }

  async onDateChange(event: any) {
    this.selectedDate = event.detail.value; // Armazena o valor da data selecionada
    this.form.controls['data'].setValue(new Date(this.selectedDate).toLocaleDateString('pt-BR')); // Formata a data e atualiza o formulário
    // this.form.controls['dateSelected'].setValue(new Date(this.selectedDate))
    console.log('Data selecionada:', this.form.controls['data'].value);

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

  // cadastrar() {
  //   if (this.form.valid) {
  //     const osData = this.form.value;
  //     console.log('Cadastro realizado:', osData);

  //     this.utilsService.showToast('✔ Ordem de Serviço cadastrada com sucesso!', 'success');
  //     this.limpar();
  //     // window.location.reload();
  //   } else {
  //     this.adicionarRequired();
  //   }
  // }
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
