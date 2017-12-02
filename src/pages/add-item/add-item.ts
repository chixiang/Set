import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public toastCtrl: ToastController) {
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
    if (this.title == undefined || this.title == "") {
      this.showToast('top', "Item couldn't be saved without a title!");
      return;
    }
    if (this.type == undefined || this.type == "") {
      this.showToast('top', "Item couldn't be saved without a type!");
      return;
    }
    this.selectItems.pop();
    let newItem = {
      title: this.title,
      type: this.type,
      items: this.selectItems
    };

    this.view.dismiss(newItem);

  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  close() {
    this.view.dismiss();
  }

}
