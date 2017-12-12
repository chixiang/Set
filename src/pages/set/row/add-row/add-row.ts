import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImageDataProvider } from '../../../../providers/image-data/image-data';

/**
 * Generated class for the AddRowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-row',
  templateUrl: 'add-row.html',
})
export class AddRowPage {

  row;
  items = [];
  types = [];
  values = [];
  template;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private actionSheetCtrl: ActionSheetController, private imagePicker: ImagePicker, private camera: Camera, private file: File, private imageDataService: ImageDataProvider) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('template')) {
      this.template = this.navParams.get('template');
      for (var i = 0; i < this.template.items.length; i++) {
        if (this.template.items[i].type == "select") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            selectItems: this.template.items[i].items,
          }
        } else if (this.template.items[i].type == "number") {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type,
            unit: this.template.items[i].unit
          }
        } else {
          this.items[i] = {
            title: this.template.items[i].title,
            type: this.template.items[i].type
          }
        }
      }
    }
  }

  async saveRow() {
    this.row = {};
    // for (var i = 0; i < this.items.length; i++) {
    //   this.row[this.items[i].title] = this.items[i].value;
    // }

    // 循环中有异步操作，头疼，闭包没实现
    for (var i = 0; i < this.template.items.length; i++) {
      // (function (i) {
      //   if (this.template.items[i].type != "image") {
      //     this.row[this.items[i].title] = this.items[i].value;
      //   } else {
      //     this.imageDataService.createImage({
      //       "b64str": this.items[i].value
      //     }).then((id) => {
      //       this.row[this.items[i].title] = id;
      //     })
      //   }
      // })(i)

      // 使用 async 和 await 实现
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

  close() {
    this.view.dismiss();
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

}
