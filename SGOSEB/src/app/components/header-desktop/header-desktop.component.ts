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
      title: 'Comprovantes',
      sections: [
        {
          title: 'PDF',
          options: [
            {
              label: 'Retirada de OS',
              url: '/new-wire-transfer'
            },
            {
              label: 'Relatorio de OS',
              url: '/limits-wire-transfer'
            }
          ]
        }
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
