import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

// import { HomePageRoutingModule } from './home-routing.module';
import { ButtonComponent } from "../../components/button/button.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // HomePageRoutingModule,
    ButtonComponent
],
  declarations: [HomePage]
})
export class HomePageModule {}
