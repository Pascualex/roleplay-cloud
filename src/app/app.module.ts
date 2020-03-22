import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { LogContainerComponent } from './containers/log-container/log-container.component';
import { LogInputComponent } from './components/log-input/log-input.component';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import { LogEntryComponent } from './components/log-entry/log-entry.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { GameSearchContainerComponent } from './containers/game-search-container/game-search-container.component';
import { AuthenticationViewComponent } from './views/authentication-view/authentication-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { SessionBarContainerComponent } from './containers/session-bar-container/session-bar-container.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { SignUpContainerComponent } from './containers/sign-up-container/sign-up-container.component';
import { GameCreationContainerComponent } from './containers/game-creation-container/game-creation-container.component';

const firebaseConfig = {
  apiKey: "AIzaSyBcqC1jzBRzSyN7u6P8hG7RvmlI88gEM5M",
  authDomain: "roleplay-log.firebaseapp.com",
  databaseURL: "https://roleplay-log.firebaseio.com",
  projectId: "roleplay-log",
  storageBucket: "roleplay-log.appspot.com",
  messagingSenderId: "777508181754",
  appId: "1:777508181754:web:5dbf420bedaf8b33e49b43"
};

@NgModule({
  declarations: [
    AppComponent,
    LogViewComponent,
    LogContainerComponent,
    LogInputComponent,
    LogViewerComponent,
    LogEntryComponent,
    HomeViewComponent,
    GameSearchContainerComponent,
    AuthenticationViewComponent,
    SearchViewComponent,
    SessionBarContainerComponent,
    ImageCardComponent,
    LoginContainerComponent,
    SignUpContainerComponent,
    GameCreationContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
