import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { expressionType } from '@angular/compiler/src/output/output_ast';

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
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    let item = {
      value: ""
    }
    this.selectItems.push(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
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

    let newItem = {
      title: this.title,
      type: this.type,
      items: this.selectItems
    };

    this.view.dismiss(newItem);

  }

  close() {
    this.view.dismiss();
  }

}
