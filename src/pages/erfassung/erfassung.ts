import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-erfassung',
  templateUrl: 'erfassung.html',
})
export class ErfassungPage {
  sachgebiete = [];
  schadenarten = [];
  schadenmelder = [];
  schaden = {};

  constructor(public navCtrl: NavController, public storage: Storage) {

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

    this.schadenarten.push({
      name: 'Leitungswasser',
      id: 'LW'
    });
    this.schadenarten.push({
      name: 'Hagel',
      id: 'HG'
    });
    this.schadenarten.push({
      name: 'Glas',
      id: 'GL'
    });

    this.schadenmelder.push({
      name: 'Versicherungsnehmer',
      id: 'VN'
    });

    this.schadenmelder.push({
      name: 'Sonstiges',
      id: 'SO'
    });
  }

  schadenErfassen () {
    this.storage.length().then((anzahl) => {
      this.storage.set((anzahl + 1).toString(), this.schaden);
    });
    //this.navCtrl.parent.select('page-uebersicht');
  }

}
