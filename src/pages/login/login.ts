import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private faio: FingerprintAIO, private platform: Platform) {
  }

  login() {
    this.faio.show({
      clientId: 'SchadenerfassungsApp',
      clientSecret: 'password'
    })
    .then(result => {
      this.navCtrl.setRoot('TabsPage');
    })
    .catch(err => {
      this.platform.exitApp();
    });
  }

  ionViewDidEnter() {
    this.login();
  }
}
