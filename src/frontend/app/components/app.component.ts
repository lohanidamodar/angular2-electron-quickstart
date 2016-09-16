import { Component } from '@angular/core';
let PouchDB = require('pouchdb');
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private db:any;
  constructor(){
    this.db = new PouchDB('gaming');
    this.db.put({
      _id:'gg',
      name: 'GAMINGMANIAC'
    }).then((gg)=>{
      console.log(gg);
    });
    console.log(this.db);
  }

}
