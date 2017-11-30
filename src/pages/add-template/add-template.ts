import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

/**
 * Generated class for the AddTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-template',
  templateUrl: 'add-template.html',
})
export class AddTemplatePage {

  public title: string;
  public description: string;
  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTemplatePage');
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
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  saveItem(item) {
    this.items.push(item);
  }

  saveTemplate() {
    let newTemplate = {
      title: this.title,
      description: this.description,
      items: this.items
    };

    this.view.dismiss(newTemplate);
  }

  deleteItem(item) {
    let index = this.items.indexOf(item);
    this.items = this.items.slice(0, index).concat(this.items.slice(index + 1, this.items.length));
  }

  close() {
    this.view.dismiss();
  }

}
