import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { firebaseConfig } from '../home/app.firebase.config';
import swal from 'sweetalert';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public nav: NavController) { }

  user = {
    email: '',
    password: ''
  }

  emailValidator(email) {
    if (email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } else {
      return false;
    }
  }

  login(){
    if (this.emailValidator(this.user.email) == true) {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.user['email'], this.user['password'])
      .then(() => {
        this.nav.navigateForward('home?id=' + firebase.auth().currentUser.uid);
      })
      .catch((error) => {
        swal({
          title: 'Unable to login.',
          icon: 'error',
          text: 'Please check your credentials.',
          timer: 3000,
        });
      });
    } else if (this.emailValidator(this.user.email) == false) {
      swal({
        title: 'Invalid format!',
        icon: 'error',
        text: 'Please enter a valid email.',
        timer: 3000,
      })
    }
  }

  ngOnInit() {
  }

}
