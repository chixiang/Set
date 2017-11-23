import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('item')) {
      this.item = this.navParams.get('item');
      this.title = this.navParams.get('item').title;
      this.type = this.navParams.get('item').type;
    }
  }

  saveItem() {
    this.item.title = this.title;
    this.item.type = this.type;

    this.view.dismiss(this.item);
  }

  close() {
    this.view.dismiss();
  }

}
