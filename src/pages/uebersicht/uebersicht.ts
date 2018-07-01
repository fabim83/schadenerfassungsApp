import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UebersichtDetailsPage } from '../uebersicht-details/uebersicht-details';
import { CacheService } from 'ionic-cache';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-uebersicht',
  templateUrl: 'uebersicht.html',
})
export class UebersichtPage {
  schaeden: Observable<any>;
  cacheSchluessel = 'cache-uebersicht';

  constructor(public navCtrl: NavController, private storage: Storage, private http: HttpClient, private cache: CacheService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.ladeSchaeden()
      .catch(err => {
        this.zeigeFehler(err);
      });
  }

  schadenSelected(schaden) {
    this.navCtrl.push(UebersichtDetailsPage, {
      schaden: schaden
    });
  }

  refresh(refresher) {
    this.ladeSchaeden(refresher)
      .catch(err => {
        this.zeigeFehler(err);
      });
  }

  ladeSchaeden(refresher?) {
    return new Promise((resolve, reject) => {
      this.holeBestandskontonummer()
        .then(nummer => {
          this.ladeSchaedenInternal(nummer, refresher, resolve);
        })
        .catch(err => {
          if (refresher) refresher.complete();
          reject(err);
        });
    });
  }

  filterSchaeden(ev) {
    this.ladeSchaeden()
      .then(res => {
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.schaeden = this.schaeden
            .map(schaeden => schaeden
              .filter(schaden => schaden.nameVN.toLowerCase().includes(val.toLowerCase()) || schaden.erfassungsdatum.includes(val)));
        }
      })
      .catch(err => {
        this.zeigeFehler(err);
      });
  }

  private ladeSchaedenInternal(nummer: {}, refresher: any, resolve: (value?: {} | PromiseLike<{}>) => void) {
    let url = 'http://192.168.2.100:3000/schaeden-lesen?bestandskontonummer=' + nummer;
    let req = this.http.get(url)
      .map(res => {
        let toast = this.toastCtrl.create({
          message: 'Schäden geladen.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        return res;
      });
      
    if (refresher) {
      let ttl = 60 * 60 * 12;
      let delayType = 'all';
      this.schaeden = this.cache.loadFromDelayedObservable(url, req, this.cacheSchluessel, ttl, delayType);
      this.schaeden.subscribe(data => {
        refresher.complete();
      });
    } else {
      this.schaeden = this.cache.loadFromObservable(url, req, this.cacheSchluessel);
    }
    resolve();
  }

  private holeBestandskontonummer() {
    return new Promise((resolve, reject) => {
      this.storage.get('bestandskontonummer').then((val) => {
        if (val) {
          resolve(val);
        } else {
          reject('Bitte zuerst die Authentifizierungsdaten in den Einstellungen eingeben.');
        }
      });
    });
  }

  private zeigeFehler(err: any) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
