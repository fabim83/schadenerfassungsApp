import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-erfassung',
  templateUrl: 'erfassung.html',
})
export class ErfassungPage {
  sachgebiete = [];
  schadenarten = [];
  schadenmelder = [];

  erfassungForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public storage: Storage, public formBuilder: FormBuilder, private toastCtrl: ToastController, private http: HttpClient) {

    this.erfassungForm = formBuilder.group({
      sachgebiet: ['', Validators.required],
      schadenart: ['', Validators.required],
      schadendatum: ['', Validators.required],
      schadenuhrzeit: ['', Validators.required],
      schadenmelder: ['', Validators.required],
      vertragsnummer: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      nameVN: ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      schadennotizen: ['']
    });

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

    this.schadenmelder.push({
      name: 'Versicherungsnehmer',
      id: 'VN'
    });

    this.schadenmelder.push({
      name: 'Anspruchsteller',
      id: 'AS'
    });

    this.schadenmelder.push({
      name: 'Sonstiges',
      id: 'SO'
    });
  }

  ionViewWillLeave(){
    this.submitAttempt = false;
  }

  schadenErfassen() {
    this.submitAttempt = true;
    if (!this.erfassungForm.valid) {
      this.navCtrl.parent.select(1);
      return;
    }

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

      let schaden = this.erfassungForm.value;
      schaden["bestandskontonummer"] = bestandskontonummer;
      let url = 'http://192.168.2.100:3000/schaden-anlegen';
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      this.http.post(url, schaden, httpOptions)
        .subscribe(data => {
          let toast = this.toastCtrl.create({
            message: 'Schaden erfolgreich erfasst.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }, err => {
          let toast = this.toastCtrl.create({
            message: err.statusText,
            duration: 3000,
            position: 'top'
          });
          toast.present();
  
          this.storage.length().then((anzahl) => {
            this.storage.set((anzahl + 1).toString(), schaden);
          });
        });

      this.erfassungForm.reset();
      this.submitAttempt = false;
      this.navCtrl.parent.select(2);
    });
  }

  setzeSchadenarten(sachgebiet) {
    this.schadenarten = [];

    if (sachgebiet == 'H') {
      this.schadenarten.push({
        name: 'Haftpflicht-Personenschaden',
        id: 'HP'
      });

      this.schadenarten.push({
        name: 'Haftpflicht-Sachschaden',
        id: 'HS'
      });

      this.schadenarten.push({
        name: 'Haftpflicht-Vermögensschaden',
        id: 'HV'
      });
    } else if (sachgebiet == 'K') {
      this.schadenarten.push({
        name: 'KH-Personenschaden',
        id: 'KP'
      });

      this.schadenarten.push({
        name: 'TK-Glasschaden',
        id: 'TG'
      });

      this.schadenarten.push({
        name: 'TK-Tierbiss',
        id: 'TT'
      });
    } else if (sachgebiet == 'S') {
      this.schadenarten.push({
        name: 'Leitungswasser',
        id: 'LW'
      });

      this.schadenarten.push({
        name: 'Feuer',
        id: 'FE'
      });

      this.schadenarten.push({
        name: 'Einbruch-Diebstahl',
        id: 'ED'
      });
    }
  }
}
