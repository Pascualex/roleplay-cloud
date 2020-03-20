import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from './user.service';

export enum RegisterResponse {
  OK,
  EMAIL_COLLISION,
  UNKNOWN
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private userService: UserService) { }

  public async login(email: string, password: string): Promise<boolean> {
    return this.afa.auth.signInWithEmailAndPassword(email, password).then(
      _ => true,
      _ => false
    );
  }

  public async loginWithGoogle(): Promise<boolean> {
    return this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      _ => true,
      _ => false
    );
  }

  public async register(email: string, password: string, user: User): Promise<RegisterResponse> {
    return this.afa.auth.createUserWithEmailAndPassword(email, password).then(
      (authUser: firebase.auth.UserCredential) => {
        user.uid = authUser.user.uid;
        this.userService.addUser(user);
        this.sendEmailVerification();
        return RegisterResponse.OK;
      },
      (error) => {
        if (error.code == 'auth/email-already-in-use') {
          return RegisterResponse.EMAIL_COLLISION;
        } else {
          return RegisterResponse.UNKNOWN;
        }
      }
    );     
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
      map((authUser: firebase.User) => authUser == null)
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.afa.authState.pipe(
      // AuthUser to User
      switchMap((authUser: firebase.User) => this.userService.getUser(authUser.uid))
    );
  }
}
