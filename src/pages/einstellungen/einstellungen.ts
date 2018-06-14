import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-einstellungen',
  templateUrl: 'einstellungen.html',
})
export class EinstellungenPage {
  anzeigedauer: any;
  kennung: any;
  passwort: any;
  bestandskontonummer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewWillLeave(){
    this.storage.set('anzeigedauer', this.anzeigedauer);
    this.storage.set('kennung', this.kennung);
    this.storage.set('passwort', this.passwort);
    this.storage.set('bestandskontonummer', this.bestandskontonummer);
  }

  ionViewWillEnter(){
    this.storage.get('anzeigedauer').then((val) => {
      this.anzeigedauer = val;
    });

    this.storage.get('kennung').then((val) => {
      this.kennung = val;
    });

    this.storage.get('passwort').then((val) => {
      this.passwort = val;
    });

    this.storage.get('bestandskontonummer').then((val) => {
      this.bestandskontonummer = val;
    });
  }

}
