import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { SetData } from '../../providers/set-data/set-data';

import { AddSetPage } from '../add-set/add-set';
import { EditSetPage } from '../edit-set/edit-set';
import { SetDetailPage } from '../set-detail/set-detail';
import { UtilsService } from '../../services/utils/utils';

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
  public iconsortable = 'ios-shuffle-outline';
  public flag = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: SetData, public utilsService: UtilsService) {
    this.dataService.getSets().then((sets) => {
      if (sets) {
        this.sets = sets;
      }
    });
  }

  ionViewDidLoad() {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.dataService.getSets().then((sets) => {
      if (sets) {
        this.sets = sets;
      }
      if (refresher != 0) {
        refresher.complete();
      }
    });
  }

  reorderSets(indexes) {
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.sets[indexes.from];
    this.sets.splice(indexes.from, 1);
    this.sets.splice(indexes.to, 0, element);
  }

  changeSortable() {
    if (this.iconsortable == 'ios-shuffle-outline') {
      this.iconsortable = 'ios-checkmark-outline';
      this.flag = true;
    }
    else {
      this.iconsortable = 'ios-shuffle-outline';
      this.flag = false;
      //this.storage.set('myStore1', this.items);
      // Todo - save the templates with new order.
    }
  };

  addSet() {
    let addModal = this.modalCtrl.create(AddSetPage);
    addModal.onDidDismiss((set) => {
      if (set) {
        this.createSet(set);
      }
    });

    addModal.present();
  }

  editSet(set) {
    let addModal = this.modalCtrl.create(EditSetPage, {
      set: set
    });
    addModal.onDidDismiss((set) => {
      if (set) {
        this.saveSet(set);
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
    let isDelete = this.utilsService.doConfirm("", "Delete this set?", ()=> {
      this.dataService.deleteSet(set);
    }, 
    ()=>{});
  }

}
