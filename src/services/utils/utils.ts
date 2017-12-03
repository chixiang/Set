import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular';

@Injectable()
export class UtilsService {

  constructor(public toastCtrl: ToastController, public alerCtrl: AlertController) {
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  showToastWithCloseButton(position: string, message: string, closeButtonText: string) {
    const toast = this.toastCtrl.create({
      position: position,
      message: message,
      showCloseButton: true,
      closeButtonText: closeButtonText
    });
    toast.present();
  }

  doConfirm(title: string, message: string, okHandler: any, cancelHandler: any) {
    let confirm = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          handler: cancelHandler
        },
        {
          text: 'OK',
          handler: okHandler
        }
      ]
    });
    confirm.present()
  }
}
