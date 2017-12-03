import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

import { UtilsService } from '../../services/utils/utils';
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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public view: ViewController, public utilsService: UtilsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTemplatePage');
  }

  reorderItems(indexes) {
    console.log("reordering...");
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
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
    console.log(this.title);
    console.log(this.items.length);
    if (this.title == undefined || this.title == "") {
      this.utilsService.showToast('top', "Template can not be saved without a title!");
      return;
    }
    if (this.items.length == 0) {
      this.utilsService.showToast('top', "Template can not be saved without a item!");
      return;
    }
    let newTemplate = {
      title: this.title,
      description: this.description,
      items: this.items
    };

    this.view.dismiss(newTemplate);
  }

  deleteItem(item) {
    let isDelete = this.utilsService.doConfirm("", "Delete this item?", ()=> {
      let index = this.items.indexOf(item);
      this.items = this.items.slice(0, index).concat(this.items.slice(index + 1, this.items.length));
    }, 
    ()=>{});
  }

  close() {
    this.view.dismiss();
  }

}
