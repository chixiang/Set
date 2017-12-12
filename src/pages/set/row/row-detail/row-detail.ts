import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImageDataProvider } from '../../../../providers/image-data/image-data';


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
  images = [];
  template;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private camera: Camera, private imagePicker: ImagePicker, private actionSheetCtrl: ActionSheetController, private transfer: FileTransfer, private file: File, private imageDataService: ImageDataProvider) {
  }

  async ionViewDidLoad() {
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
        } else if (this.template.items[i].type == "image") {
          let id = this.row[this.template.items[i].title];
          let value = await this.imageDataService.getImage(id);
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            value: value,
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

  async saveRow() {
    // for (var i = 0; i < this.items.length; i++) {
    //     this.row[this.items[i].title] = this.items[i].value;
    //   }
    // this.view.dismiss(this.values);
    for (var i = 0; i < this.template.items.length; i++) {
      if (this.template.items[i].type != "image") {
        this.row[this.items[i].title] = this.items[i].value;
      } else {
        this.row[this.items[i].title] = await this.imageDataService.createImage({
          "b64str": this.items[i].value
        })
      }
    }
    this.view.dismiss(this.row);
  }

  getImageMethod(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.startCamera(item);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.openImgPicker(item);
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

  startCamera(item) {
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

  openImgPicker(item) {
    let imagePickerOpt = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };
    this.imagePicker.getPictures(imagePickerOpt).then((results) => {
      for (var i = 0; i < results.length; i++) {
        var imagePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
        var imageName = results[i].substr(results[i].lastIndexOf('/') + 1);
        this.file.readAsDataURL(imagePath, imageName).then((b64str) => {
          item.value = b64str;
        }).catch(err => {
          console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
        })
      }
    }, (err) => { });
  }

  upload(item, filename) {
    let options: FileUploadOptions = {
      fileKey: 'smfile',
      headers: {}
    }

    this.fileTransfer.upload(filename, 'https://sm.ms/api/upload', options)
      .then((data) => {
        console.log(JSON.stringify(data));
        item.url = JSON.parse(data.response).data.url;
      }, (err) => {
        console.log("Oh, no!" + err.toString);
      })
  }

}
