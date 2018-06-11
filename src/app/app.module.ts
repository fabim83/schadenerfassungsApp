import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ErfassungPage } from "../pages/erfassung/erfassung";
import { UebersichtPage } from "../pages/uebersicht/uebersicht";
import { UebersichtDetailsPage } from "../pages/uebersicht-details/uebersicht-details";
import { EinstellungenPage } from '../pages/einstellungen/einstellungen';
import { HomePage } from '../pages/home/home';
import { AboutPage } from "../pages/about/about";
import { KontaktPage } from "../pages/kontakt/kontakt";

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { HTTP } from "@ionic-native/http";
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ErfassungPage,
    UebersichtPage,
    UebersichtDetailsPage,
    EinstellungenPage,
    HomePage,
    AboutPage,
    KontaktPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ErfassungPage,
    UebersichtPage,
    UebersichtDetailsPage,
    EinstellungenPage,
    HomePage,
    AboutPage,
    KontaktPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FingerprintAIO,
    HTTP
  ]
})
export class AppModule {}
