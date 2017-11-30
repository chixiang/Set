import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { SetData } from '../../providers/set-data/set-data';

import { AddSetPage } from '../add-set/add-set';
import { SetDetailPage } from '../set-detail/set-detail';

/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  public sets = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: SetData) {
    this.dataService.getSets().then((sets) => {
      if (sets) {
        this.sets = sets;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  addSet() {
    let addModal = this.modalCtrl.create(AddSetPage);
    addModal.onDidDismiss((set) => {
      if (set) {
        this.createSet(set);
      }
    });

    addModal.present();
  }

  viewSet(set) {

    this.navCtrl.push(SetDetailPage, {
      set: set
    });

  }

  createSet(set) {
    this.dataService.createSet(set);
  }

  saveSet(set) {
    this.dataService.updateSet(set);
  }

  deleteSet(set) {
    this.dataService.deleteSet(set);
  }

}
