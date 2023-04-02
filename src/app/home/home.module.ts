import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';


import { HomePageRoutingModule } from './home-routing.module';
import { jqxComboBoxModule } from 'jqwidgets-ng/jqxcombobox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    jqxComboBoxModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
