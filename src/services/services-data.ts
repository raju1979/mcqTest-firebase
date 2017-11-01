import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the ServicesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesDataProvider {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  categoryDoc: AngularFirestoreDocument<any>;
  category$: Observable<any>;

  constructor(public http: Http, private _afs: AngularFirestore, private _http: Http) {
    this.itemsCollection = this._afs.collection<any>('/categories');

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    this.items.subscribe(
      (data) => {
        console.log(data);
      }
    )

  }

  getCategoriesList() {
    return this.items;
  }

  getCategoryDocument(categoryId) {

    this.categoryDoc = this._afs.doc<any>('categories/' + categoryId);
    return this.category$ = this.categoryDoc.valueChanges()

  }

  getMcqJsonFromFirebase(url: string) {
    return this._http.get(url);
  }

}
