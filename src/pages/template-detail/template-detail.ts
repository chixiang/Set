import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  title;
  description;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('template').title;
    this.description = this.navParams.get('template').description;
    this.items = this.navParams.get('template').items;
  }

  close() {
    this.view.dismiss();
  }

}
