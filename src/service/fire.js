import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAEGrdDXWC_ieUis8gmM--7KgAlZK5Vg84",
  authDomain: "photo-stock-f3967.firebaseapp.com",
  databaseURL: "https://photo-stock-f3967.firebaseio.com",
  projectId: "photo-stock-f3967",
  storageBucket: "photo-stock-f3967.appspot.com",
  messagingSenderId: "591858191675",
  appId: "1:591858191675:web:d1d3306a89c61c1aa5fb1e"
};

export const fire = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();