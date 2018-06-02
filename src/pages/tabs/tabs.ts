import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErfassungPage } from '../erfassung/erfassung';
import { UebersichtPage } from '../uebersicht/uebersicht';
import { EinstellungenPage } from '../einstellungen/einstellungen';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ErfassungPage;
  tab3Root = UebersichtPage;
  tab4Root = EinstellungenPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
