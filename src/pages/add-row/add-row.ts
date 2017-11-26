import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
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
            selectItems: this.template.items[i].items
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
    for (var i = 0; i < this.items.length; i++) {
      this.values[i] = this.items[i].value;
    }
    this.view.dismiss(this.values);
  }

  close() {
    this.view.dismiss();
  }

}
