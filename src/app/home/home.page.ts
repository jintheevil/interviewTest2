import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import firebase from 'firebase';
import { firebaseConfig } from './app.firebase.config';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public platform: Platform,
    public modal: ModalController,
    public activatedRoute: ActivatedRoute,
    public nav: NavController
  ) {}

  keyword = '';

  userBooks = [{bName: ''}];

  newBook = {
    bName: '',
    bAuthor: '',
    bPages: 0,
    pagesRead: 0,
  };

  editingBook = {
    bName: '',
    bAuthor: '',
    bPages: 0,
    pagesRead: 0,
    id: '',
  };

  rounder(x) {
    return Math.floor(x);
  }

  addBookToCollection() {
    if (this.newBook['pagesRead'] > this.newBook['bPages']) {
      console.log (this.newBook)
      swal({
        title: 'Read pages exceed book pages',
        text: 'The numbers are kinda weird here...',
        icon: 'error',
        timer: 3000,
      });
    } else if (
      this.newBook['bName'] == '' ||
      this.newBook['bAuthor'] == '' ||
      this.newBook['bPages'] <= 0
    ) {
      swal({
        title: 'Information is missing!',
        text: 'Fill up everything.',
        icon: 'info',
        timer: 2000,
      });
    } else {
      let key = firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/books')
        .push(this.newBook).key;
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/books/' + key)
        .update({ id: key });
      this.newBook = {
        bName: '',
        bAuthor: '',
        bPages: 0,
        pagesRead: 0,
      }
      this.modal.dismiss();
    }
  }

  confirmEdits() {
    if (
      this.editingBook['bName'] == '' ||
      this.editingBook['bAuthor'] == '' ||
      this.editingBook['bPages'] <= 0
    ) {
      swal({
        title: 'Information is missing!',
        text: 'Fill up everything.',
        icon: 'info',
        timer: 2000,
      });
    } else if (this.editingBook['pagesRead'] > this.editingBook['bPages']) {
      swal({
        title: 'Read pages exceed book pages',
        text: 'The numbers are kinda weird here...',
        icon: 'error',
        timer: 2000,
      });
    } else if ((this.editingBook['pagesRead'] == this.editingBook['bPages'])) {
      swal({
        title: 'Congratulations on finishing the book!',
        icon: 'success',
        timer: 2000,
      }).then(() => {
        let key = firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/archive')
        .push(this.editingBook).key;
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/archive/' + key)
        .update({ id: key });
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/books/' + this.editingBook['id']).remove()
      this.modal.dismiss()
      });
    } else {
      firebase
        .database()
        .ref(
          'users/' +
            firebase.auth().currentUser.uid +
            '/books/' +
            this.editingBook['id']
        )
        .update(this.editingBook);
      this.modal.dismiss();
    }
  }

  archiveBook(x){
    swal({
      title: 'Congratulations on finishing the book!',
      icon: 'success',
      timer: 2000
    }).then(() => {
      let key = firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/archive')
        .push(x).key;
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid + '/archive/' + key)
        .update({ id: key });
      firebase.database().ref('users/' + firebase.auth(). currentUser.uid + '/books/' + x['id']).remove()
    })
  }

  returnedArray() {
    return this.lengthOf(this.userBooks)
      ? this.userBooks.filter((a) =>
          (a['bName'] + a['bAuthor'])
            .toLowerCase()
            .includes(this.keyword.toLowerCase())
        )
      : [];
  }

  lengthOf(x) {
    return x ? Object.keys(x).length : 0;
  }

  editBook(x) {
    document.getElementById('editBook').click();
    this.editingBook = x;
    console.log(1);
  }

  archives(){
    this.nav.navigateForward('archives')
  }

  logOut(){
    firebase.auth().signOut().then(() => {
      this.nav.navigateRoot('login')
    })
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((a) => {
      if (a) {
        this.activatedRoute.queryParams.subscribe((a) => {
          firebase
            .database()
            .ref('users/' + a['id'] + '/books')
            .on('value', (data) => {
              this.userBooks = Object.values(data.val());
            });
        });
      } else {
        this.nav.navigateRoot('login')
      }
    });
  }
}
