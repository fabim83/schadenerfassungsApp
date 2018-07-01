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
      vertragsnummer: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*'), Validators.required])],
      nameVN: ['', Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required])],
      schadennotizen: ['']
    });

    this.sachgebiete.push({
      name: 'Kraftfahrt',
      id: 'Kraftfahrt'
    });

    this.sachgebiete.push({
      name: 'Sach',
      id: 'Sach'
    });

    this.sachgebiete.push({
      name: 'Haftpflicht',
      id: 'Haftplicht'
    });

    this.schadenmelder.push({
      name: 'Versicherungsnehmer',
      id: 'Versicherungsnehmer'
    });

    this.schadenmelder.push({
      name: 'Anspruchsteller',
      id: 'Anspruchsteller'
    });

    this.schadenmelder.push({
      name: 'Sonstiger',
      id: 'Sonstiger'
    });
  }

  ionViewWillLeave() {
    this.submitAttempt = false;
  }

  schadenErfassen() {
    this.submitAttempt = true;
    if (!this.erfassungForm.valid) {
      this.navCtrl.parent.select(1);
      return;
    }

    this.holeBestandskontonummer()
    .then(nummer => {
      this.schadenErfassenInternal(nummer);
    })
    .catch(err => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    })
  }

  setzeSchadenarten(sachgebiet) {
    this.schadenarten = [];

    if (sachgebiet == 'Haftplicht') {
      this.schadenarten.push({
        name: 'Haftpflicht-Personenschaden',
        id: 'Haftpflicht-Personenschaden'
      });

      this.schadenarten.push({
        name: 'Haftpflicht-Sachschaden',
        id: 'Haftpflicht-Sachschaden'
      });

      this.schadenarten.push({
        name: 'Haftpflicht-Vermögensschaden',
        id: 'Haftpflicht-Vermögensschaden'
      });
    } else if (sachgebiet == 'Kraftfahrt') {
      this.schadenarten.push({
        name: 'KH-Personenschaden',
        id: 'KH-Personenschaden'
      });

      this.schadenarten.push({
        name: 'TK-Glasschaden',
        id: 'TK-Glasschaden'
      });

      this.schadenarten.push({
        name: 'TK-Tierbiss',
        id: 'TK-Tierbiss'
      });
    } else if (sachgebiet == 'Sach') {
      this.schadenarten.push({
        name: 'Leitungswasser',
        id: 'Leitungswasser'
      });

      this.schadenarten.push({
        name: 'Feuer',
        id: 'Feuer'
      });

      this.schadenarten.push({
        name: 'Einbruch-Diebstahl',
        id: 'Einbruch-Diebstahl'
      });
    }
  }

  private schadenErfassenInternal(nummer: {}) {
    let schaden = this.erfassungForm.value;
    schaden["bestandskontonummer"] = nummer;
    schaden["erfassungsdatum"] = this.ermittleTagesdatum();
    schaden["schadendatum"] = this.formatiereSchadendatum(schaden["schadendatum"]);
    let url = 'http://192.168.2.100:3000/schaden-anlegen';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
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
          this.storage.set('Schaden ' + (anzahl + 1).toString(), schaden);
        });
      });

    this.erfassungForm.reset();
    this.submitAttempt = false;
    this.navCtrl.parent.select(2);
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

  private ermittleTagesdatum(): String {
    let tagesdatum = new Date();
    let jahr = tagesdatum.getFullYear();
    let monat = (tagesdatum.getMonth() + 1) < 10 ? '0' + (tagesdatum.getMonth() + 1) : (tagesdatum.getMonth() + 1);
    let tag = tagesdatum.getDate() < 10 ? '0' + tagesdatum.getDate() : tagesdatum.getDate();
    return tag + '.' + monat + '.' + jahr;
  }

  private formatiereSchadendatum(schadendatum: String): String {
    let datum = schadendatum.split("-");
    return datum[2] + '.' + datum[1] + '.' + datum[0];
  }
}
