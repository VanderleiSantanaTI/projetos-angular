import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';

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

  @ViewChildren(IonDatetime) dateTimeFields!: QueryList<IonDatetime>;

  constructor(private fb: FormBuilder, private modalController: ModalController) {
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
    this.checkWindowSize();
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
      alert('Ordem de Serviço cadastrada com sucesso!');
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
}
