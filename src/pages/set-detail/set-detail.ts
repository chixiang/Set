import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddRowPage } from '../add-row/add-row';

import { SetData } from '../../providers/set-data/set-data';

/**
 * Generated class for the SetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-detail',
  templateUrl: 'set-detail.html',
})
export class SetDetailPage {

  set;
  title;
  template;
  rows = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController, public dataService: SetData) {
    if (this.navParams.get('set')) {
      this.set = this.navParams.get('set');
      this.title = this.set.title;
      this.template = this.set.template;
      this.rows = this.set.rows;
    }
  }

  ionViewDidLoad() {
  }

  addRow() {
    let addModal = this.modalCtrl.create(AddRowPage, 
    {
      template: this.template
    });
    addModal.onDidDismiss((row) => {
      if (row) {
        this.set.rows.push(row);
        this.updateRowData();
        // 因为上一步更新了set，id和rev发生变化，需要重新获取set。否则不能继续增加或修改row
        this.refreshSetData();
      }
    });

    addModal.present();
  }

  updateRowData() {
    this.dataService.updateSet(this.set);
  }

  refreshSetData() {
    this.dataService.getSet(this.set._id).then((sets) => {
      if (sets) {
        this.set = sets[0];
      }
    });
    this.rows = this.set.rows;
    // this.dataService.getSets().then((sets) => {
    //   if (sets) {
    //     for(var i = 0; i < sets.length; i++) {
    //       if (this.set._id == sets[i]._id) {
    //         this.set = sets[i];
    //         break;
    //       } else {
    //         continue;
    //       }
    //     }
    //   }
    // });
    // this.rows = this.set.rows;
  }

  // close() {
  //   this.view.dismiss();
  // }

}
