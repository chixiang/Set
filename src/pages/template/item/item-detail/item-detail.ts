import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilsService } from '../../../../services/utils/utils';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {

  item;
  title;
  type;
  selectItems = [];
  unit;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public utilsService: UtilsService) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('item')) {
      this.item = this.navParams.get('item');
      this.title = this.navParams.get('item').title;
      this.type = this.navParams.get('item').type;
      //if (this.type == "select") {
        this.selectItems = this.navParams.get('item').items;
        this.addNullSelectItem();
      //}
      this.unit = this.navParams.get('item').unit;
    }
  }

  reorderSelectItems(indexes) {
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.selectItems[indexes.from];
    this.selectItems.splice(indexes.from, 1);
    this.selectItems.splice(indexes.to, 0, element);
  }

  addNullSelectItem() {
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
    this.item.title = this.title;
    this.item.type = this.type;

    // 保存前，删除最后一个空列表项
    this.selectItems.pop();
    this.item.items = this.selectItems;
    this.item.unit = this.unit;

    this.view.dismiss(this.item);
  }

  close() {
    // 关闭前，删除最后一个空列表项
    this.selectItems.pop();
    this.view.dismiss();
  }

}
