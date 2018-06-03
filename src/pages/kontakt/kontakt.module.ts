import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KontaktPage } from './kontakt';

@NgModule({
  declarations: [
    KontaktPage,
  ],
  imports: [
    IonicPageModule.forChild(KontaktPage),
  ],
})
export class KontaktPageModule {}
