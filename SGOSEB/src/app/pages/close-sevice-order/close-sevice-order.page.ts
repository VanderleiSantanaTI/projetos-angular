import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IPlatformDevice } from '../../interfaces/platform-device';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-close-sevice-order',
  templateUrl: './close-sevice-order.page.html',
  styleUrls: ['./close-sevice-order.page.scss'],
  standalone: false
})
export class CloseSeviceOrderPage implements OnInit {
  isMobile!: boolean;
  isModalOpen: boolean = false;  // Variável para controlar a abertura do modal
  selectedDate: any;
  form: FormGroup;
  dados: any[] = [];


  filtro: string[] = [
    'id',
    'data',
    'modelo',
    'placa_eb',
    'patrimonio',
    'situacao_os',
  ];

  renomearCampos: any = {
    id: 'O.S',
    data: 'Data',
    modelo: 'Modelo',
    placa_eb: 'Placa EB',
    manutencao: 'Manutenção',
    situacao_os: 'Situação da OS',
  };


  constructor(
    private dataService: DataService,
    private utilsService: UtilsService,
     private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private modalController: ModalController) {
    this.form = this.fb.group({
      abrir_os_id: [null, [Validators.required, Validators.min(1)]],
      nome_mecanico: ['', Validators.required],
      data_da_manutencao: [null, Validators.required]
    });
    // this.platformActive = this.utilsService.validatePlatform();
  }
  ngOnInit() {
    this.carregarOSToClose();
    this.checkWindowSize();
  }
  carregarOSToClose() {
    this.dataService.getOS_abertas().subscribe(
      (data) => {
        this.dados = data; // Armazena os contatos retornados pela API
        console.log('Contatos:',  this.dados);
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  }
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




  async onDateChange(event: any) {
    this.selectedDate = event.detail.value; // Armazena o valor da data selecionada
    this.form.controls['data_da_manutencao'].setValue(new Date(this.selectedDate).toLocaleDateString('pt-BR')); // Formata a data e atualiza o formulário
    // this.form.controls['data_da_manutencao'].setValue(new Date(this.selectedDate))
    console.log('Data selecionada:', this.form.controls['data_da_manutencao'].value);

    // Fecha o modal após a seleção
    const modal = await this.modalController.getTop(); // Obtém o modal ativo
    if (modal) {
      await modal.dismiss(); // Fecha o modal
    }
  }


  limpar() {
    this.form.reset();
    this.dateTimeFields.forEach(date => date.value = '');
    // this.dateTimeFields.forEach(date => date.value = '');
  }

  cadastrar() {
    if (this.form.valid) {
      const osData = this.form.value;
      this.dataService.postClose_OS(osData).subscribe(
        response => {
          if (response.status !== 200){
            this.utilsService.showToast(`✖ ${response.message}.`, 'error');
            this.limpar();
            return;
          }
          this.utilsService.showToast(`✔ ${response.message}!`, 'success');
          this.modalController.dismiss();
          this.limpar();
        },
        error => {
          // console.error('Erro Fechar OS:', error.message);
          this.utilsService.showToast(`✖ ${error.message}.`, 'error');
        }
      );
    } else {
      this.utilsService.showToast('✖ Preencha todos os campos obrigatórios.', 'error');
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
      this.form.controls['abrir_os_id'].setValue(event.target.value); // Atualiza o valor no modelo
  }
}

// activeRow(event: any) {
//   console.log('Linha selecionada:', event.target);

// }

onRowSelected(row: any): void {
  console.log('Linha selecionada qt:', row.quantidade);
  this.form.patchValue({
    abrir_os_id: row.id
  });
  this.closeModal();
}

}
