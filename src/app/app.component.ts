import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'RecipeBookFrontEnd';

  ngOnInit(): void {
    var config = {
      apiKey: 'AIzaSyAQDFfaZ2U9b7rKaVyadc4HtudPcRMuiAY',
      authDomain: 'recipe-data-c9897.firebaseapp.com',
      databaseURL: 'https://recipe-data-c9897.firebaseio.com',
      projectId: 'recipe-data-c9897',
      storageBucket: 'recipe-data-c9897.appspot.com',
      messagingSenderId: '792343379979'
    };
    firebase.initializeApp(config);
  }
}
