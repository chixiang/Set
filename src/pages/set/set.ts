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
    this.dataService.getTemplates().then((sets) => {
      if (sets) {
        this.sets = sets;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }

  addTemplate() {
    let addModal = this.modalCtrl.create(AddSetPage);
    addModal.onDidDismiss((set) => {
      if (set) {
        this.createTemplate(set);
      }
    });

    addModal.present();
  }

  viewTemplate(set) {
    let addModal = this.modalCtrl.create(SetDetailPage, {
      set: set
    });
    addModal.onDidDismiss((set) => {
      if (set) {
        this.saveTemplate(set);
      }
    });
    addModal.present();
  }

  createTemplate(set) {
    this.dataService.createTemplate(set);
  }

  saveTemplate(set) {
    this.dataService.updateTemplate(set);
  }

  deleteTemplate(set) {
    this.dataService.deleteTemplate(set);
  }

}
