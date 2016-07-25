import Firebase from 'firebase';
// import App from './components/app'; DO WE NEED THIS?

const config = {
  apiKey: 'AIzaSyBw0jHQteltkYoXIQmpDQVX0SkBn-32YgA',
  authDomain: 'hw3pt2.firebaseapp.com',
  databaseURL: 'https://hw3pt2.firebaseio.com',
  storageBucket: 'hw3pt2.appspot.com',
};
Firebase.initializeApp(config);

const database = Firebase.database();

// attempt to read from firebase
export function onNewNoteChange(callback) {
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
export function deleteANote(id) {
  database.ref('notes').child(id).remove();
}
export function updateANote(id, x, y, title, isEditing, text, zIndex, editIcon) {
  database.ref('notes').child(id).update({ x, y, title, isEditing, text, zIndex, editIcon });
}
export function addANote(newnote) {
  const id = database.ref('notes').push().key;
  database.ref('notes').child(id).set(newnote);
  // somehow return the new note?
}
