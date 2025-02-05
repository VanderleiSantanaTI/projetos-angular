import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-report-os',
  templateUrl: './report-os.page.html',
  styleUrls: ['./report-os.page.scss'],
  standalone: false
})
export class ReportOsPage implements OnInit {
  form: FormGroup;
  isMobile!: boolean;
  selectedDate: any;
  isModalOpen = false;
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

  @ViewChildren(IonDatetime) dateTimeFields!: QueryList<IonDatetime>;

  constructor(
        private dataService: DataService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private modalController: ModalController,
        private utilsService: UtilsService
      ) {
    this.form = this.fb.group({
      OS: [null, [Validators.required, Validators.min(1)]],
      peca: [''],
      ficha: [''],
      servico: ['', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      dateSelected: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.carregarOSAbreta();
    this.checkWindowSize();
  }

  carregarOSAbreta() {
    this.dataService.getAbrir_os().subscribe(
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

  async onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.form.controls['dateSelected'].setValue(new Date(this.selectedDate).toLocaleDateString('pt-BR'));
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
      this.utilsService.showToast(' ✔ cadastrado com sucesso', 'success');
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

  limitNumber(event: any, field: 'quantidade' | 'OS') {
    const maxLength = 20; // Defina o número máximo de caracteres permitidos
    const input = event.target.value;
    event.target.value = input.slice(0, maxLength); // Limita o número de caracteres
     if (input.length > maxLength && field === 'quantidade') {
      this.form.controls['quantidade'].setValue(event.target.value); // Atualiza o valor no modelo
    } else if (input.length > maxLength && field === 'OS') {
      this.form.controls['OS'].setValue(event.target.value); // Atualiza o valor no modelo
    }


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  onRowSelected(row: any): void {
    console.log('Linha selecionada qt:', row.quantidade);
    this.form.patchValue({
      OS: row.id
    });
    this.closeModal();
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
