import Firebase from 'firebase';
import App from './components/app';

const config = {
  apiKey: 'AIzaSyBw0jHQteltkYoXIQmpDQVX0SkBn-32YgA',
  authDomain: 'hw3pt2.firebaseapp.com',
  databaseURL: 'https://hw3pt2.firebaseio.com',
  storageBucket: 'hw3pt2.appspot.com',
};
Firebase.initializeApp(config);

const database = Firebase.database();

// attempt to read from firebase
export function readFromFirebase() {
  database.ref('notes').on('value', (snapshot) => {
    App.componentDidMount(snapshot);
  });
}
export function deleteANote(callback) {
  database.ref('notes').child(id).remove();
}
export function updateANote(callback) {
  database.ref('notes').child(id).update();
}
export function addANote(callback) {
  const id = database.ref('notes').push();
  // somehow return the id back to the app?
}


// export function fetchNotes(callback) {}
