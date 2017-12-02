import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TemplateData } from '../../providers/data/data';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the AddSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-set',
  templateUrl: 'add-set.html',
})
export class AddSetPage {

  templates = [];
  types  = [];
  title;
  description;
  type;
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TemplateData, public view: ViewController, public toastCtrl: ToastController) {
    this.dataService.getTemplates().then((templates) => {
      if (templates) {
        this.templates = templates;
        for (var i = 0; i < templates.length; i++) {
          this.types[i] = templates[i].title;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSetPage');
  }

  saveSet() {
    if (this.title == undefined || this.title == "") {
      this.showToast('top', "Set couldn't be saved without a title!");
      return;
    }
    for (var i = 0; i < this.templates.length; i++) {
      if (this.type == this.templates[i].title) {
        this.template = this.templates[i];
        break;
      }
    }
    let newSet = {
      title: this.title,
      description: this.description,
      type: this.type,
      template: this.template,
      rows: []
    };

    this.view.dismiss(newSet);
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
