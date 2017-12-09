import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AddTemplatePage } from '../template/add-template/add-template';
import { TemplateDetailPage } from '../template/template-detail/template-detail';
import { TemplateData } from '../../providers/data/data';
import { UtilsService } from '../../services/utils/utils';

import { reorderArray } from 'ionic-angular';

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
  public iconsortable = 'ios-shuffle-outline';
  public flag = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public dataService: TemplateData, public utilsService: UtilsService) {
    this.dataService.getTemplates().then((templates) => {
      if (templates) {
        this.templates = templates;
      }
    });
  }

  ionViewDidLoad() {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.dataService.getTemplates().then((templates) => {
      if (templates) {
        this.templates = templates;
      }
      if (refresher != 0) {
        refresher.complete();
      }
    });
  }

  reorderTemplates(indexes) {
    // this.templates = reorderArray(this.templates, indexes);
    let element = this.templates[indexes.from];
    this.templates.splice(indexes.from, 1);
    this.templates.splice(indexes.to, 0, element);
  }

  changeSortable() {
    if (this.iconsortable == 'ios-shuffle-outline') {
      this.iconsortable = 'ios-checkmark-outline';
      this.flag = true;
    }
    else {
      this.iconsortable = 'ios-shuffle-outline';
      this.flag = false;
      //this.storage.set('myStore1', this.items);
      // Todo - save the templates with new order.
    }
  };

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
    this.utilsService.doConfirm("", "Delete this template?", () => {
      this.dataService.deleteTemplate(template);
    },
      () => { });
  }

}
