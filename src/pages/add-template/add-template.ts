import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { AddItemPage } from '../add-item/add-item';

/**
 * Generated class for the AddTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-template',
  templateUrl: 'add-template.html',
})
export class AddTemplatePage {

  public title: string;
  public description: string;
  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,  public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTemplatePage');
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);
    
        addModal.onDidDismiss((item) => {
    
          if (item) {
            this.saveItem(item);
          }
    
        });
    
        addModal.present();
  }

  viewItem(item) {

  }

  saveItem(item) {
    this.items.push(item);
  }

  saveTemplate() {
    let newTemplate = {
      title: this.title,
      description: this.description,
      items: this.items
    };

    this.view.dismiss(newTemplate);
  }

  close() {
    this.view.dismiss();
  }

}
