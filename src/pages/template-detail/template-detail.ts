import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';

import { TemplateData } from '../../providers/data/data';
import { SetData } from '../../providers/set-data/set-data';
import { UtilsService } from '../../services/utils/utils';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public modalCtrl: ModalController, public dataService: TemplateData, public utilsService: UtilsService, public setDataService: SetData) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      this.title = this.navParams.get('template').title;
      this.description = this.navParams.get('template').description;
      this.items = this.navParams.get('template').items;
    }
  }

  reorderItems(indexes) {
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.items.push(item);
      }
    });
    addModal.present();
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  deleteItem(item) {
    let isDelete = this.utilsService.doConfirm("", "Delete this item?", ()=>{
      let index = this.items.indexOf(item);
      this.items = this.items.slice(0, index).concat(this.items.slice(index + 1, this.items.length));
    }, 
    ()=>{});
  }

  saveTemplate() {
    if (this.title == undefined || this.title == "") {
      this.utilsService.showToast('top', "Template can not be saved without a title!");
      return;
    }
    if (this.items.length == 0) {
      this.utilsService.showToast('top', "Template can not be saved without a item!");
      return;
    }
    this.template.title = this.title;
    this.template.description = this.description;
    this.template.items = this.items;

    this.dataService.updateTemplate(this.template);

    // 更新已有set的template
    this.updateSetTemplate(this.template);

    this.view.dismiss();
  }

  updateSetTemplate(template) {
    this.setDataService.getSets().then((sets) => {
      if (sets) {
        for (var i = 0; i < sets.length; i++) {
          if (sets[i].template._id == this.template._id) {
            console.log("更新" + sets[i].title + "模板...");
            sets[i].template = this.template;
            this.setDataService.updateSet(sets[i]);
          }
        }
      }
    });
  }

}
