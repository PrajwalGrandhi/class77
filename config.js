import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyC3etQX3xj_JILe3mHmE_KpFXrux1v-GDg",
    authDomain: "booksanta-32fce.firebaseapp.com",
    projectId: "booksanta-32fce",
    storageBucket: "booksanta-32fce.appspot.com",
    messagingSenderId: "563189520223",
    appId: "1:563189520223:web:8b8e3a4a6320e593bac8ea"
  };
  // Initialize Firebase
  if(!firebase.apps.length){ 
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase.firestore();