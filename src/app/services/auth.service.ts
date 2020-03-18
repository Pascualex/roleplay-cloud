import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

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
      map((user: User) => user == null)
    );
  }

  public getUser(): Observable<User> {
    return this.afa.authState;
  }
}
