import Firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBw0jHQteltkYoXIQmpDQVX0SkBn-32YgA',
  authDomain: 'hw3pt2.firebaseapp.com',
  databaseURL: 'https://hw3pt2.firebaseio.com',
  storageBucket: 'hw3pt2.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database();

// export function fetchNotes(callback) {}
