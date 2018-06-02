import { Component } from '@angular/core';

import { ErfassungPage } from '../erfassung/erfassung';
import { UebersichtPage } from '../uebersicht/uebersicht';
import { EinstellungenPage } from '../einstellungen/einstellungen';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ErfassungPage;
  tab3Root = UebersichtPage;
  tab4Root = EinstellungenPage;

  constructor() {

  }
}
