import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddRowPage } from '../add-row/add-row';

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
  template;
  rows = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController) {
    if (this.navParams.get('set')) {
      this.set = this.navParams.get('set');
      this.template = this.set.template;
      this.rows = this.set.rows;
    }
  }

  ionViewDidLoad() {
    // if (this.navParams.get('set')) {
    //   this.set = this.navParams.get('set');
    //   this.template = this.set.tempalte;
    //   this.rows = this.set.rows;
    // }
  }

  addRow() {
    let addModal = this.modalCtrl.create(AddRowPage, 
    {
      template: this.template
    });
    addModal.onDidDismiss((row) => {
      if (row) {
        this.addRowData(row);
      }
    });

    addModal.present();
  }

  addRowData(row) {

  }

  // close() {
  //   this.view.dismiss();
  // }

}
