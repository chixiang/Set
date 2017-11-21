import { Component } from '@angular/core';

import { SetPage } from '../set/set';
import { TemplatePage } from '../template/template';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SetPage;
  tab2Root = TemplatePage;

  constructor() {

  }
}
