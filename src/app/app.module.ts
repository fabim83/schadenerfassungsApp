import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ErfassungPage } from "../pages/erfassung/erfassung";
import { UebersichtPage } from "../pages/uebersicht/uebersicht";
import { EinstellungenPage } from '../pages/einstellungen/einstellungen';
import { HomePage } from '../pages/home/home';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ErfassungPage,
    UebersichtPage,
    EinstellungenPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ErfassungPage,
    UebersichtPage,
    EinstellungenPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FingerprintAIO
  ]
})
export class AppModule {}
