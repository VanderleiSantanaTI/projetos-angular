
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavService {



  constructor(
    private navController: NavController,
    private router: Router
  ) { }

  async navigatesimple(page: string): Promise<void> {
    await this.router.navigate([page]);
  }

  async navigateForward(
    page: string,
    queryParams: object = {},
    animation: boolean = true
  ): Promise<void> {
    await this.navController.navigateForward(page, {
      animated: animation,
      queryParams
    });
  }

  async navigateRoot(
    page: string,
    queryParams: object = {},
    animation: boolean = true
  ): Promise<void> {
    await this.navController.navigateRoot(page, {
      animated: animation,
      queryParams,
      replaceUrl: true
    });
  }

  async navigateBack(
    page: string,
    queryParams: object = {},
    animation: boolean = true
  ): Promise<void> {
    this.navController.navigateBack(page, {
      animated: animation,
      queryParams
    });
  }

  async back(animation: boolean = true): Promise<void> {
    this.navController.back({ animated: animation });
  }
}
