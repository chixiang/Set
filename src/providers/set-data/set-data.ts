import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
/*
  Generated class for the SetDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetData {

  data: any;
  db: any;
  remote: any;

  constructor() {
    this.db = new PouchDB('set');
    this.remote = 'http://45.76.243.236:5984/set';
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
    this.db.sync(this.remote, options);
  }

  getTemplates() {
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

  createSet(set) {
    this.db.post(set);
  }

  updateSet(set) {
    this.db.put(set).catch((err) => {
      console.log(err);
    });
  }

  deleteSet(set) {
    this.db.remove(set).catch((err) => {
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
