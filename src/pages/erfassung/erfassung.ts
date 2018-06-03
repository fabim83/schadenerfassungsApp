import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErfassungDetailPage } from '../erfassung-detail/erfassung-detail';

@IonicPage()
@Component({
  selector: 'page-erfassung',
  templateUrl: 'erfassung.html',
})
export class ErfassungPage {
  sachgebiete: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sachgebiete = [];

    this.sachgebiete.push({
      name: 'Kraftfahrt',
      id: 'K'
    });

    this.sachgebiete.push({
      name: 'Sach',
      id: 'S'
    });

    this.sachgebiete.push({
      name: 'Haftpflicht',
      id: 'H'
    });

  }

  sachgebietSelected(sachgebiet) {
    this.navCtrl.push(ErfassungDetailPage, {
      sachgebiet: sachgebiet
    });
  }

}
