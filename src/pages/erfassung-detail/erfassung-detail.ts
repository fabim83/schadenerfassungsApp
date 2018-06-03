import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-erfassung-detail',
  templateUrl: 'erfassung-detail.html',
})
export class ErfassungDetailPage {
  sachgebiet: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sachgebiet = navParams.get('sachgebiet');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErfassungDetailPage');
  }

}
