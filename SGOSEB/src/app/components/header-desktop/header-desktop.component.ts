import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit, Output } from '@angular/core';
import { NavItem } from 'src/app/interfaces/nav';
import { NavService } from 'src/app/services/nav/nav.service';


@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  imports: [NgClass]
})
export class HeaderDesktopComponent implements OnInit {

 typeUser: 'personal' | 'business' = 'personal';
//  bankUser$: Observable<IBusinessBankUser | IPersonalBankUser | null> = this.store.select(UserSelector.user);

  menuCardVisible: boolean = false;

  protected nav: NavItem[] = [
    { title: 'Home',
      sections: [
        {
          title: 'Home',
          options:[
         { label: 'Tela principal',
              url: '/start'}
         ]
    }]
  },
    {
      title: 'Cadastrar',
      sections: [
        {
          title: 'Veiculos',
          options: [
            {
              label: 'Oderm de serviço',
              url: '/register-os'
            },
            {
              label: 'Peças e serviços',
              url: '/report-os'
            }
          ]
        }
      ]
    },
    {
      title: 'pesquisar',
      sections: [
        {
          title: 'O.S',
          options: [
            {
              label: 'Ordem de serviço',
              url: '/search'
            }
          ]
        },
        {
          title: 'Peças e Serviços',
          options: [
            {
              label: 'Peças/Serviços na OS',
              url: '/parts-and-services'
            }
          ]
        }

      ]
    },
    {
      title: 'Fechar-OS',
      sections: [
        {
          title: 'Fechar',
          options: [
            {
              label: 'Fechar Ordem de Serviço',
              url: '/close-sevice-order'
            }
          ]
        }

      ]
    },
    {
      title: 'Retirada',
      sections: [
        {
          title: 'Retirar Viatura',
          options: [
            {
              label: 'cadastrar retirada',
              url: '/vehicle-exit'
            }
          ]
        }

      ]
    },
    {
      title: 'Relatórios',
      sections: [
        {
          title: 'OS retiradas',
          options: [
            {
              label: 'Oredem de serviço-PDF',
              url: '/generate-pdf'
            }
          ]
        },
        {
          title: 'Resumo Operacional',
          options: [
            {
              label: 'Relatório de produção',
              url: ''
            },
            {
              label: 'Problemas operacionais',
              url: ''
            }
          ]
        },
      ]
    },
    {
      title: 'Mais opções',
      sections: [
        {
          title: 'Usuário',
          options: [
            {
              label: 'Perfil',
              url: '/profiles'
            },
            {
              label: 'Alterar senha',
              url: '/alter-password'
            },
            {
              label: 'Acesso de Usuários',
              url: '/user-access'
            }
          ]
      },
        {
          title: 'Outros',
          options: [
            {
              label: 'Documentos',
              url: '/document'
            },
            {
              label: 'Termos de uso',
              url: '/terms'
            }
          ]
        },
      ]
    },
  ];

  protected activeSection: number | null = null;
  userInfo: any;

  constructor(
    private navService: NavService,
    private authService: AuthServiceService
  ) {
    const payload = this.authService.getTokenPayload();
    if (payload) {
      this.userInfo = payload.data; // Acessa os dados do usuário
      console.log('Nome:', this.userInfo.nome);
      console.log('Perfil:', this.userInfo.perfil);
      console.log('Status:', this.userInfo.status);
    }
   }


  ngOnInit() {

  }
  // Se o token for válido, obtém o payload

  protected async setActiveSection(idx: number)
  {


    this.activeSection = this.activeSection === idx ? null : idx;




    if(this.activeSection === 4) {


      console.log(this.menuCardVisible);

    }
  }

  protected goTo(url: string) {

    this.navService.navigateForward(url);

  }



  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInsideDropdown = clickedElement.closest('.dropdown-options');
    const isClickInsideHeaderOption = clickedElement.closest('.header-option');

    if (!isClickInsideDropdown && !isClickInsideHeaderOption) {
      this.activeSection = null;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.navService.navigateForward('/login');
    // this.utilsService.showToast('✖ Sessão expirada. Faça login novamente.', 'error');
  }
}
