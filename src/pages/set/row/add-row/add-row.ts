import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the AddRowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-row',
  templateUrl: 'add-row.html',
})
export class AddRowPage {

  row;
  items = [];
  types = [];
  values = [];
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      for (var i = 0; i < this.template.items.length; i++) {
        if (this.template.items[i].type == "select") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            selectItems: this.template.items[i].items,
          }
        } else if (this.template.items[i].type == "number") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            unit: this.template.items[i].unit
          }
        } else {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type
          }
        }
      }
    }
  }

  saveRow() {
    // for (var i = 0; i < this.items.length; i++) {
    //   this.values[i] = this.items[i].value;
    // }

    // 实现方式一：先将数组转换成json字符串，然后使用JSON.parse将json字符串转换成json对象
    // let rowString = "{";
    // for (var i = 0; i < this.items.length; i++) {
    //   if (i == this.items.length - 1) {
    //     rowString = rowString + "\"" + this.items[i].title + "\"" + ": " + "\"" + this.items[i].value + "\"" ;
    //   } else {
    //     rowString = rowString + "\"" + this.items[i].title + "\"" + ": " + "\"" + this.items[i].value + "\"" + ",";
    //   }
    // }
    // rowString = rowString + "}";
    // this.row = JSON.parse(rowString);

    // 实现方式二：使用[]来用变量表示json的key，此方式更简单
    this.row = {};
    for (var i = 0; i < this.items.length; i++) {
      this.row[this.items[i].title] = this.items[i].value;
    }

    this.view.dismiss(this.row);
  }

  close() {
    this.view.dismiss();
  }

}
