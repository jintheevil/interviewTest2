import { Component } from '@angular/core';
import firebase from 'firebase';
import { firebaseConfig } from './home/app.firebase.config';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    firebase.initializeApp(firebaseConfig)
  }
}
