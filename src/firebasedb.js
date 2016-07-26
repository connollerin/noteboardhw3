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
export function editANote(id, isEditing, zIndex, editIcon) {
  database.ref('notes').child(id).update({ isEditing, zIndex, editIcon });
}
export function moveANote(id, x, y) {
  console.log('firebase');
  console.log(x, y);
  database.ref('notes').child(id).update({ x, y });
}
export function changeAText(id, text) {
  database.ref('notes').child(id).update({ text });
}
export function addANote(newnote) {
  const id = database.ref('notes').push().key;
  database.ref('notes').child(id).set(newnote);
  // somehow return the new note?
}
