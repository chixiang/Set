import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SetPage } from '../pages/set/set';
import { TemplatePage } from '../pages/template/template';
import { AddTemplatePage } from '../pages/add-template/add-template';
import { TemplateDetailPage } from '../pages/template-detail/template-detail';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { TabsPage } from '../pages/tabs/tabs';

import { AddSetPage } from '../pages/add-set/add-set';
import { SetDetailPage } from '../pages/set-detail/set-detail';
import { EditSetPage } from '../pages/edit-set/edit-set';
import { AddRowPage } from '../pages/add-row/add-row';
import { RowDetailPage } from '../pages/row-detail/row-detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { TemplateData } from '../providers/data/data';
import { SetData } from '../providers/set-data/set-data';

import { UtilsService } from '../services/utils/utils';
import { AutosizeDirective } from '../directives/autosize/autosize';

@NgModule({
  declarations: [
    MyApp,
    SetPage,
    TemplatePage,
    TabsPage,
    AddTemplatePage,
    TemplateDetailPage,
    AddItemPage,
    ItemDetailPage,
    AddSetPage,
    SetDetailPage,
    AddRowPage,
    RowDetailPage,
    EditSetPage,
    AutosizeDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SetPage,
    TemplatePage,
    TabsPage,
    AddTemplatePage,
    TemplateDetailPage,
    AddItemPage,
    ItemDetailPage,
    AddSetPage,
    SetDetailPage,
    AddRowPage,
    RowDetailPage,
    EditSetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TemplateData,
    SetData,
    UtilsService
  ]
})
export class AppModule {}
