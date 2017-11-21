import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SetPage } from '../pages/set/set';
import { TemplatePage } from '../pages/template/template';
import { AddTemplatePage } from '../pages/add-template/add-template';
import { AddItemPage } from '../pages/add-item/add-item';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    SetPage,
    TemplatePage,
    TabsPage,
    AddTemplatePage,
    AddItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SetPage,
    TemplatePage,
    TabsPage,
    AddTemplatePage,
    AddItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data
  ]
})
export class AppModule {}
