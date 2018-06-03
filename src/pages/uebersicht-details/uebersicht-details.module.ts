import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UebersichtDetailsPage } from './uebersicht-details';

@NgModule({
  declarations: [
    UebersichtDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UebersichtDetailsPage),
  ],
})
export class UebersichtDetailsPageModule {}
