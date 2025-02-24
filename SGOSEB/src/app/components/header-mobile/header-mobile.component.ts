
import { Component, ElementRef, HostListener, inject} from '@angular/core';

import { UtilsService } from 'src/app/services/utils/utils.service';
import { IonicModule, Platform } from '@ionic/angular';
import { NgClass, NgIf } from '@angular/common';
import { NavService } from 'src/app/services/nav/nav.service';


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  imports : [NgIf, IonicModule]

})
export class HeaderMobileComponent {
  isMenuOpen: boolean = false;
  activeSubMenuIndex: number | null = null;
  activeOption: string | null = null;
  menuCardVisible: boolean = false;


 typeUser: 'personal' | 'business' = 'personal';

  screenWidth: number

  async toggleMenu() {
;
    this.isMenuOpen = !this.isMenuOpen;

  }

  toggleSubMenu(index: number) {
    if (this.activeSubMenuIndex === index) {
      this.activeSubMenuIndex = null;
    } else {
      this.activeSubMenuIndex = index;
    }
  }

  closeSubMenu() {
    this.activeSubMenuIndex = null;
    this.activeOption = null;
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

  constructor(
    private eRef: ElementRef,
    private navService: NavService,
    private platform: Platform,
    private utilsService: UtilsService,
  ) {
    this.screenWidth = this.platform.width();
  }

  goTo(page: string) {

    this.navService.navigatesimple(page);
    // this.router.navigate([page]); 
    this.closeSubMenu();
    this.closeMenu();
  }


  toggleSubOptions(option: string) {
    if (this.activeOption === option) {
      this.activeOption = null;
    } else {
      this.activeOption = option;
    }
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInsideMenu = this.eRef.nativeElement.contains(clickedElement);
    const isClickInsideMenuIcon = clickedElement.closest('.menu-icon');
    const isClickInSubsideBar = clickedElement.closest('.sub-menu');

    if (!isClickInsideMenu && !isClickInsideMenuIcon && !isClickInSubsideBar) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = this.platform.width();
  }
}
