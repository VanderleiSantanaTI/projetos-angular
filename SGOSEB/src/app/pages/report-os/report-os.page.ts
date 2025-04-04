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
      quantidade: [null, [ Validators.min(1)]],
      time: [null, Validators.required],
      servico: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.carregarOSAbreta();
    this.checkWindowSize();
  }

  async carregarOSAbreta() {
    try {
      const dados = await this.dataService.getOs_abertas();
      this.dados = dados;
    } catch (error) {
      console.error('Erro ao carregar os contatos:', error);
    }
  }





  limpar() {
    this.form.reset();
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
