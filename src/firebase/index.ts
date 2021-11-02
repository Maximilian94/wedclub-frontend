// https://www.youtube.com/watch?v=8r1Pb6Ja90o
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAu5tuPnjBY8gAARDjHfZJ1hDOrBttAEp0',
  authDomain: 'wedclub-bb5b6.firebaseapp.com',
  projectId: 'wedclub-bb5b6',
  storageBucket: 'wedclub-bb5b6.appspot.com',
  messagingSenderId: '1058446335270',
  appId: '1:1058446335270:web:53f3041fc54c4925a3f5e7',
  measurementId: 'G-SGFMB8ETPC',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
