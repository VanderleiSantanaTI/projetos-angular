import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-vehicle-exit',
  templateUrl: './vehicle-exit.page.html',
  styleUrls: ['./vehicle-exit.page.scss'],
  standalone: false
})
export class VehicleExitPage implements OnInit {
  isMobile!: boolean;
  selectedDate: any;
  form: FormGroup;
  dados: any[] = [];
  isModalOpen = false;  // Variável para controlar a abertura do modal
  isLoading: boolean = true;

  filtro = ['abrir_os_id', 'data_da_manutencao', 'nome_mecanico', 'situacao_os']; // Filtros disponíveis
  renomearCampos ={
    abrir_os_id: 'O.S',
    data_da_manutencao: 'Data',
    nome_mecanico: 'Mecânico',
    situacao_os: 'Situação'
  };

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
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private utilsService: UtilsService,

    private fb: FormBuilder, private modalController: ModalController) {
    this.form = this.fb.group({
      OS: [null, [Validators.required, Validators.min(1)]],
      nome: ['', Validators.required],
      dateSelected: [null, Validators.required]
    });
    // this.platformActive = this.utilsService.validatePlatform();
  }

  ngOnInit() {
    this.carregarRetirada();
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

  carregarRetirada() {
    this.isLoading = true;
    this.dataService.getFechada_os().subscribe(
      (data) => {
        this.dados = data; // Armazena os contatos retornados pela API
        this.isLoading = false;
        console.log('Contatos:',  this.dados);
        // localStorage.setItem('nome', data[0].id);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
        this.isLoading = false;
      }
    );
  }

  limpar() {
    this.form.reset();
    this.dateTimeFields.forEach(date => date.value = '');
    // this.dateTimeFields.forEach(date => date.value = '');
  }

  cadastrar() {
    if (this.form.valid) {
      const osData = this.form.value;
      console.log('Cadastro realizado:', osData);
      this.limpar();
      this.utilsService.showToast('(OS) RETIRADA com sucesso!.', 'success');

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

// activeRow(event: any) {
//   console.log('Linha selecionada:', event.target);

// }

onRowSelected(row: any): void {
  console.log('Linha selecionada qt:', row.quantidade);
  this.form.patchValue({
    OS: row.id
  });
  this.closeModal();
}

}

