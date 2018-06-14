import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UebersichtDetailsPage } from '../uebersicht-details/uebersicht-details';

@IonicPage()
@Component({
  selector: 'page-uebersicht',
  templateUrl: 'uebersicht.html',
})
export class UebersichtPage {
  schaeden = [];

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ionViewDidLoad() {
    this.schaeden = [];
    this.storage.forEach((value, key, iteration) => {
      this.schaeden.push(value);
    })
  }

  schadenSelected(schaden){
    this.navCtrl.push(UebersichtDetailsPage, {
      schaden: schaden
    })
  }

  refresh(refresher) {
    this.schaeden = [];
    this.storage.forEach((value, key, iteration) => {
      this.schaeden.push(value);
    });

    refresher.complete();
  }

}
