import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-row-detail',
  templateUrl: 'row-detail.html',
})
export class RowDetailPage {

  row;
  items = [];
  types = [];
  values = [];
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    // if (this.navParams.get('row')) {
    //   this.row = this.navParams.get('row');
    // }
    // if (this.navParams.get('template')) {
    //   this.template = this.navParams.get('template');
    //   for (var i = 0; i < this.template.items.length; i++) {
    //     if (this.template.items[i].type == "select") {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         selectItems: this.template.items[i].items,
    //         value: this.row[i]
    //       }
    //     } else if (this.template.items[i].type == "number") {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         value: this.row[i],
    //         unit: this.template.items[i].unit
    //       }
    //     } else {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         value: this.row[i]
    //       }
    //     }
    //   }
    // }
  }

  ionViewDidLoad() {
    if (this.navParams.get('row')) {
      this.row = this.navParams.get('row');
    }
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      for (var i = 0; i < this.template.items.length; i++) {
        if (this.template.items[i].type == "select") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            selectItems: this.template.items[i].items,
            value: this.row[i]
          }
        } else if (this.template.items[i].type == "number") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            value: this.row[i],
            unit: this.template.items[i].unit
          }
        } else {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            value: this.row[i]
          }
        }
      }
    }
  }

  saveRow() {
    for (var i = 0; i < this.items.length; i++) {
      this.row[i] = this.items[i].value;
    }
    this.view.dismiss(this.values);
  }

}
