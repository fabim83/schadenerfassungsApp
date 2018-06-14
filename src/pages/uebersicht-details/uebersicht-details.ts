import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-uebersicht-details',
  templateUrl: 'uebersicht-details.html',
})
export class UebersichtDetailsPage {
  schaden: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.schaden = this.navParams.get('schaden');
  }

}
