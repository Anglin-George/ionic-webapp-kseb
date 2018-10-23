import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtipsPage } from './addtips';

@NgModule({
  declarations: [
    AddtipsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddtipsPage),
  ],
})
export class AddtipsPageModule {}
