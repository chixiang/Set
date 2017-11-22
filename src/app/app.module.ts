import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SetPage } from '../pages/set/set';
import { TemplatePage } from '../pages/template/template';
import { AddTemplatePage } from '../pages/add-template/add-template';
import { TemplateDetailPage } from '../pages/template-detail/template-detail';
import { AddItemPage } from '../pages/add-item/add-item';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { TemplateData } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    SetPage,
    TemplatePage,
    TabsPage,
    AddTemplatePage,
    TemplateDetailPage,
    AddItemPage
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
    AddItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TemplateData
  ]
})
export class AppModule {}
