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

  items = [];
  types = [];
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      for (var i = 0; i < this.template.items.length; i++) {
        this.items[i] = {
          title: this.template.items[i].title,
          type: this.template.items[i].type
        }
      }
    }
  }

  close() {
    this.view.dismiss();
  }

}
