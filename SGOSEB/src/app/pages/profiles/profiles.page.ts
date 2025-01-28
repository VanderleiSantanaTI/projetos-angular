import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: false
})
export class ProfilesPage implements OnInit {
  isMobile!: boolean;
  contatos: any[] = [];


  fieldsToShow = ['id','nome','perfil'];
  links = ['nome', 'id'];


  constructor(
    // private utilsService : UtilsService,
    private cdr: ChangeDetectorRef,
    private dataService: DataService

  ) {

  }


  ngOnInit() {
    this.carregarCadastro_login();
    this.checkWindowSize();
    this.phoneMask

  }

  carregarCadastro_login() {
    this.dataService.getCadastro_login().subscribe(
      (data) => {
        // console.log('Contatos recebidos:', data);
        this.contatos = data; // Armazena os contatos retornados pela API
        // console.log('Contatos:', this.contatos);
        console.log('Contatos:', this.contatos);
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  }



    handleLinkClick(event: { row: any, field: string }) {
      console.log('ID login:', event.row.id);
      // Aqui você pode executar qualquer ação, como abrir um modal, redirecionar, etc.
    }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '5','5',' ', '(', /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  // myPhoneNumber = maskitoTransform('99999999999', this.phoneMask);
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

}
