import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AddTemplatePage } from '../add-template/add-template';
import { TemplateDetailPage } from '../template-detail/template-detail';
import { Data } from '../../providers/data/data';

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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: Data) {
    this.dataService.getData().then((templates) => {
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
        this.saveTemplate(template);
      }

    });

    addModal.present();
  }

  saveTemplate(template) {
    this.templates.push(template);
    this.dataService.save(this.templates);
  }

  viewTemplate(template) {
    let addModal = this.modalCtrl.create(TemplateDetailPage, {
      template: template
    });
    // this.navCtrl.push(TemplateDetailPage, {
    //   template: template
    // });
    addModal.onDidDismiss((template) => {
      if (template) {
        this.saveTemplate(template);
      }
    });
    addModal.present();
  }

  deleteTemplate(template) {
    //TODO
  }

}
