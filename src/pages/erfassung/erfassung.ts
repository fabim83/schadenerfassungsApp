import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http";

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

  constructor(public navCtrl: NavController, public storage: Storage, private toastCtrl: ToastController, private http: HTTP) {

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
    this.http.post('http://192.168.2.100:3000/schaden-anlegen', this.schaden, {
      'Content-Type': 'application/json'
    })
    .then(data => {
      let toast = this.toastCtrl.create({
        message: 'Schaden erfolgreich erfasst.',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      this.storage.length().then((anzahl) => {
        this.storage.set((anzahl + 1).toString(), this.schaden);
      });
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: err.error,
        duration: 20000,
        position: 'top'
      });
      toast.present();
    })  

    this.schaden = {};
    this.navCtrl.parent.select(2);
  }

}
