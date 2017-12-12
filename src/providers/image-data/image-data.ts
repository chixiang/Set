import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Generated class for the ImageDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageDataProvider {

  data: any;
  db: any;
  remote: any;

  constructor() {
    this.db = new PouchDB('image');
    this.remote = 'http://198.13.44.186:5984/image';
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
    this.db.sync(this.remote, options);
  }

  getImages() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  getImage(id) {
    return new Promise(resolve => {
      this.db.get(id, {
        include_docs: true
      }).then((result) => {
        this.data = [];
        console.log(result);
        this.data.push(result);
        resolve(this.data);
        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  async createImage(image) {
    //console.log("创建image：" + JSON.stringify(image));
    // this.db.post(image).then(function(response) {
    //   console.log(JSON.stringify(response));
    //   return JSON.parse(response.id);
    // })
    return new Promise(resolve => {
      console.log("创建image：" + JSON.stringify(image));
      this.db.post(image).then((response) => {
        console.log(JSON.stringify(response));
        resolve(response.id);
      })
    })
  }

  updateImage(image) {
    console.log("修改image：" + JSON.stringify(image));
    this.db.put(image).catch((err) => {
      console.log(err);
    });
  }

  deleteImage(image) {
    console.log("删除image：" + JSON.stringify(image));
    this.db.remove(image).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });
    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {
      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }
      //A document was added
      else {
        this.data.push(change.doc);
      }
    }
  }

}
