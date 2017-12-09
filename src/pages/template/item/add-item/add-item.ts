import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilsService } from '../../../../services/utils/utils';
import { AppConstant } from '../../../../app/app.constant';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  title: string;
  type: string;
  selectItems = [];
  itemTypes = AppConstant.getItemTypes();
  item;
  unit;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public utilsService: UtilsService) {
    let item = {
      value: ""
    }
    this.selectItems.push(item);
  }

  ionViewDidLoad() {
  }

  reorderSelectItems(indexes) {
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.selectItems[indexes.from];
    this.selectItems.splice(indexes.from, 1);
    this.selectItems.splice(indexes.to, 0, element);
  }

  addNullSelectItem(value) {
    for (var i = 0; i < this.selectItems.length; i++) {
      if (this.selectItems[i].value == "") {
        return;
      } else {
        continue;
      }
    }
    let item = {
      value: ""
    }
    this.selectItems.push(item);
  }

  saveItem() {
    if (this.title == undefined || this.title == "") {
      this.utilsService.showToast('top', "Item can not be saved without a title!");
      return;
    }
    if (this.type == undefined || this.type == "") {
      this.utilsService.showToast('top', "Item can not be saved without a type!");
      return;
    }
    this.selectItems.pop();
    let newItem = {
      title: this.title,
      type: this.type,
      items: this.selectItems,
      unit: this.unit
    };

    this.view.dismiss(newItem);

  }

  close() {
    this.view.dismiss();
  }

}
