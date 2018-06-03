import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErfassungDetailPage } from './erfassung-detail';

@NgModule({
  declarations: [
    ErfassungDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ErfassungDetailPage),
  ],
})
export class ErfassungDetailPageModule {}
