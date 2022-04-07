import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { firebaseConfig } from '../home/app.firebase.config';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.page.html',
  styleUrls: ['./archives.page.scss'],
})
export class ArchivesPage implements OnInit {

  constructor(public nav: NavController) { }

  keyword = ''

  archive = []

  returnedArchive(){
    return this.lengthOf(this.archive) ? this.archive.filter(a => (a['bName'] + a['bAuthor']).toLowerCase().includes(this.keyword.toLowerCase())) : [];
  }

  lengthOf(x){
    return x ? Object.keys(x).length : 0;
  }

  back(){
    this.nav.pop()
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(a => {
      if (a){
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/archive').once('value', data => {
          this.archive = Object.values(data.val())
          console.log(this.archive)
        })
      } else {
        this.nav.navigateRoot('login')
      }
    })
  }

}
