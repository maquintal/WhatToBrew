import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDc3dlmBSn8IB8qqa9ncuINiZtvRN7YLvM",
  authDomain: "whattobrew.firebaseapp.com",
  databaseURL: "https://whattobrew.firebaseio.com",
  projectId: "whattobrew",
  storageBucket: "whattobrew.appspot.com",
  messagingSenderId: "213377212858",
  appId: "1:213377212858:web:08fc3878df2fceb01a7d83",
  measurementId: "G-E200CE2QMB"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;