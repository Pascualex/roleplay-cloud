import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }

  public getUser(uid: string): Observable<User> {
    const userDocument: AngularFirestoreDocument<any> = this.usersCollection.doc(uid);
    return userDocument.snapshotChanges().pipe(
      map((rawUserSnapshot) => {
        return new User(
          rawUserSnapshot.payload.data().username,
          rawUserSnapshot.payload.id
        );
      })
    );
  }

  public async addUser(user: User): Promise<boolean> {
    return this.usersCollection.doc(user.uid).set({
      username: user.username
    }).then(
      _ => true,
      _ => false
    );
  }
}
