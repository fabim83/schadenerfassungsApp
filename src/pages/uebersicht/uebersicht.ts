import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UebersichtDetailsPage } from '../uebersicht-details/uebersicht-details';
import { CacheService } from 'ionic-cache';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-uebersicht',
  templateUrl: 'uebersicht.html',
})
export class UebersichtPage {
  schaeden: Observable<any>;
  cacheSchluessel = 'cache-uebersicht';

  constructor(public navCtrl: NavController, private storage: Storage, private http: Http, private cache: CacheService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.ladeSchaeden();
  }

  schadenSelected(schaden) {
    this.navCtrl.push(UebersichtDetailsPage, {
      schaden: schaden
    })
  }

  refresh(refresher) {
    this.ladeSchaeden(refresher);
  }

  ladeSchaeden(refresher?) {
    this.storage.get('bestandskontonummer').then((val) => {
      let bestandskontonummer = val;
      if (!bestandskontonummer) {
        let toast = this.toastCtrl.create({
          message: 'Bitte zuerst die Authentifizierungsdaten in den Einstellungen eingeben.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        return;
      }

      let url = 'http://192.168.2.100:3000/schaeden-lesen?bestandskontonummer=' + bestandskontonummer;
      let req = this.http.get(url)
        .map(res => {
          let toast = this.toastCtrl.create({
            message: 'Schäden geladen.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          return res.json();
        });

      if (refresher) {
        let ttl = 60 * 60 * 12;
        let delayType = 'all';
        this.schaeden = this.cache.loadFromDelayedObservable(url, req, this.cacheSchluessel, ttl, delayType);

        this.schaeden.subscribe(data => {
          refresher.complete();
        })
      } else {
        this.schaeden = this.cache.loadFromObservable(url, req, this.cacheSchluessel);
      }
    });


  }

}
