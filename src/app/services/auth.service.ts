import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection('users');
  }

  public async login(email: string, password: string): Promise<boolean> {
    return await this.afa.auth.signInWithEmailAndPassword(email, password).then(
      _ => true,
      _ => false
    );
  }

  public async loginWithGoogle(): Promise<boolean> {
    return await this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      _ => true,
      _ => false
    );
  }

  public async register(email: string, password: string): Promise<void> {
    await this.afa.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  public async sendEmailVerification(): Promise<void> {
    await this.afa.auth.currentUser.sendEmailVerification();
  }

  public async sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
    await this.afa.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  public async logout(): Promise<void> {
    await this.afa.auth.signOut();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.afa.authState.pipe(
      map((authUser) => authUser == null)
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.afa.authState.pipe(
      // AuthUser to RawUserSnapshot
      switchMap((authUser) => {
        const userDocument: AngularFirestoreDocument<any> = this.usersCollection.doc(authUser.uid);
        return userDocument.snapshotChanges();
      }),
      map((rawUserSnapshot) => {
        return new User(
          rawUserSnapshot.payload.id,
          rawUserSnapshot.payload.data().username
        );
      })
    );
  }
}
