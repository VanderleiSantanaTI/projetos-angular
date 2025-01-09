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
    {
      title: 'Cadastrar',
      sections: [
        {
          title: 'Veiculos',
          options: [
            {
              label: 'OS',
              url: '/register-os'
            },
            {
              label: 'Novo veiculo',
              url: '/register-vehicle'
            }
          ]
        }
      ]
    },
    {
      title: 'pesquisar',
      sections: [
        {
          title: 'Veiculos',
          options: [
            {
              label: 'Entradas',
              url: '/home'
            },
            {
              label: 'Saídas',
              url: '/home'
            },
          ]
        }
      ,
        {
          title: 'Status',
          options: [
            {
              label: 'Aberta',
              url: '/home'
            },
            {
              label: 'Fechada',
              url: '/home'
            },
            {
              label: 'Retirada',
              url: '/home'
            }
          ]
        },
      ]
    },
    {
      title: 'PIX',
      sections: [
        {
          title: 'Transferir',
          options: [
            {
              label: 'Transferir PIX',
              url: '/pix'
            },
            {
              label: 'Copia e Cola',
              url: '/copy-paste-pix'
            }
          ]
        },
        {
          title: 'PIX',
          options: [
            {
              label: 'Extrato PIX',
              url: '/statement-pix'
            },
            {
              label: 'Ajuste de limite',
              url: '/limits-pix'
            },
            {
              label: 'Minhas chaves',
              url: '/payment-keys-pix'
            },
            {
              label: 'Cadastro de chave',
              url: '/new-payment-key-pix'
            }
          ]
        }
      ]
    },
    {
      title: 'Transferências',
      sections: [
        {
          title: 'Transferir',
          options: [
            {
              label: 'TED',
              url: '/new-wire-transfer'
            },
            {
              label: 'Comprovantes',
              url: '/receipt-desktop/wire-transfer'
            },
            {
              label: 'Ajuste de limite',
              url: '/limits-wire-transfer'
            }
          ]
        }
      ]
    },
    {
      title: 'Cartões',
      sections: [
        {
          title: 'Meu cartão',
          options: [
            {
              label: 'Ver Cartões',
              url: '/card'
            },
            {
              label: 'Extrato cartão',
              url: '/card-statement'
            },
            {
              label: 'Solicitar novo cartão',
              url: '/request-card'
            }
          ]
        },
        // {
        //   title: 'Configurar',
        //   options: [
        //     {
        //       label: 'Bloqueio',
        //       url: '/cartao/bloqueio',
        //       action: () => this.handleOpenBlockCard(),
        //     },
        //     {
        //       label: 'Cancelamento',
        //       url: '/cartao/cancelamento',
        //       action: () => this.handleOpenCancelCard(),
        //     },
        //     {
        //       label: 'Ajuste de limite',
        //       url: '/card-limit'
        //     }
        //   ]
        // },
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
              url: '/profile-details'
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

  constructor(
    private navService: NavService


  ) { }

  ngOnInit() {
  }



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
}
