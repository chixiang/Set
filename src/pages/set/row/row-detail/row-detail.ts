import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/**
 * Generated class for the RowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-row-detail',
  templateUrl: 'row-detail.html',
})
export class RowDetailPage {

  row;
  items = [];
  types = [];
  values = [];
  template;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private camera: Camera, private imagePicker: ImagePicker, private actionSheetCtrl: ActionSheetController, private transfer: FileTransfer) {
    // if (this.navParams.get('row')) {
    //   this.row = this.navParams.get('row');
    // }
    // if (this.navParams.get('template')) {
    //   this.template = this.navParams.get('template');
    //   for (var i = 0; i < this.template.items.length; i++) {
    //     if (this.template.items[i].type == "select") {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         selectItems: this.template.items[i].items,
    //         value: this.row[i]
    //       }
    //     } else if (this.template.items[i].type == "number") {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         value: this.row[i],
    //         unit: this.template.items[i].unit
    //       }
    //     } else {
    //       this.items[i] = {
    //         title: this.template.items[i].title,
    //         type: this.template.items[i].type,
    //         value: this.row[i]
    //       }
    //     }
    //   }
    // }
  }

  ionViewDidLoad() {
    if (this.navParams.get('row')) {
      this.row = this.navParams.get('row');
    }
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      for (var i = 0; i < this.template.items.length; i++) {
        if (this.template.items[i].type == "select") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            selectItems: this.template.items[i].items,
            value: this.row[this.template.items[i].title]
          }
        } else if (this.template.items[i].type == "number") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            value: this.row[this.template.items[i].title],
            unit: this.template.items[i].unit
          }
        } else {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            value: this.row[this.template.items[i].title]
          }
        }
      }
    }
  }

  saveRow() {
    // for (var i = 0; i < this.items.length; i++) {
    //   this.row[i] = this.items[i].value;
    // }
    // 实现方式二：使用[]来用变量表示json的key，此方式更简单
    for (var i = 0; i < this.items.length; i++) {
      this.row[this.items[i].title] = this.items[i].value;
    }
    this.view.dismiss(this.values);
  }

  useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.startCamera();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.openImgPicker();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  startCamera() {
    let cameraOpt = {
      quality: 50,
      destinationType: 1, // Camera.DestinationType.FILE_URI,
      sourceType: 1, // Camera.PictureSourceType.CAMERA,
      encodingType: 0, // Camera.EncodingType.JPEG,
      mediaType: 0, // Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    };
    this.camera.getPicture(cameraOpt).then((imageData) => {
      console.log("Yeah!" + imageData);
    }, (err) => {
      //this.noticeSer.showToast('ERROR:' + err); //错误：无法使用拍照功能！
      console.log("Oh, no!" + err);
    });
  }

  openImgPicker() {
    let imagePickerOpt = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };
    console.log("selectImage...");
    this.imagePicker.getPictures(imagePickerOpt).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.upload(results[0]);
      }
    }, (err) => { });
  }

  upload(filename) {
    let options: FileUploadOptions = {
       fileKey: 'smfile',
       headers: {}
    }
  
    this.fileTransfer.upload(filename, 'https://sm.ms/api/upload', options)
     .then((data) => {
       console.log(JSON.stringify(data));
       this.items[0].value = JSON.parse(data.response).data.url;
     }, (err) => {
       console.log("Oh, no!" + err.toString);
     })
  }

}
