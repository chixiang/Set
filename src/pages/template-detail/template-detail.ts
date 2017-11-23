import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

/**
 * Generated class for the TemplateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-template-detail',
  templateUrl: 'template-detail.html',
})
export class TemplateDetailPage {

  template;
  title;
  description;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTemplatePage');
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      this.title = this.navParams.get('template').title;
      this.description = this.navParams.get('template').description;
      this.items = this.navParams.get('template').items;
    }
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  viewItem(item) {
    let addModal = this.modalCtrl.create(ItemDetailPage, {
      item: item
    });
    addModal.onDidDismiss((item) => {
      if (item) {
        //this.saveItem(item);
      }
    });
    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
  }

  saveTemplate() {
    this.template.title = this.title;
    this.template.description = this.description;
    this.template.items = this.items;

    this.view.dismiss(this.template);
  }

  close() {
    this.view.dismiss();
  }

}
