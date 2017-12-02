import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Injectable()
export class UtilsService {

    constructor(public toastCtrl: ToastController) {
    }

    showToast(position: string, message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position
        });
        toast.present(toast);
    }
}
