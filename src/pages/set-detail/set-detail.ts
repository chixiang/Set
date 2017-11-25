import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the SetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-detail',
  templateUrl: 'set-detail.html',
})
export class SetDetailPage {

  set;
  template;
  rows = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    if (this.navParams.get('set')) {
      this.set = this.navParams.get('set');
      this.template = this.set.tempalte;
      this.rows = this.set.rows;
    }
  }

  ionViewDidLoad() {
    // if (this.navParams.get('set')) {
    //   this.set = this.navParams.get('set');
    //   this.template = this.set.tempalte;
    //   this.rows = this.set.rows;
    // }
  }

  // close() {
  //   this.view.dismiss();
  // }

}
