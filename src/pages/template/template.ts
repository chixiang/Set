import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AddTemplatePage } from '../add-template/add-template';
import { TemplateDetailPage } from '../template-detail/template-detail';
import { TemplateData } from '../../providers/data/data';

/**
 * Generated class for the TemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-template',
  templateUrl: 'template.html',
})
export class TemplatePage {

  public templates = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: TemplateData) {
    this.dataService.getTemplates().then((templates) => {
      if (templates) {
        this.templates = templates;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemplatePage');
  }

  addTemplate() {
    let addModal = this.modalCtrl.create(AddTemplatePage);
    addModal.onDidDismiss((template) => {
      if (template) {
        this.createTemplate(template);
      }
    });

    addModal.present();
  }

  viewTemplate(template) {
    // let addModal = this.modalCtrl.create(TemplateDetailPage, {
    //   template: template
    // });
    // addModal.onDidDismiss((template) => {
    //   if (template) {
    //     this.saveTemplate(template);
    //   }
    // });
    // addModal.present();
    this.navCtrl.push(TemplateDetailPage, {
      template: template
    });
  }

  createTemplate(template) {
    this.dataService.createTemplate(template);
  }

  saveTemplate(template) {
    this.dataService.updateTemplate(template);
  }

  deleteTemplate(template) {
    this.dataService.deleteTemplate(template);
  }

}
