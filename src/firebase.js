import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyACjko_jD77_jt4UOk_9D3rShyw4U4Rmyk",

  authDomain: "reactapp-cc78e.firebaseapp.com",

  projectId: "reactapp-cc78e",

  storageBucket: "reactapp-cc78e.appspot.com",

  messagingSenderId: "926037953537",

  appId: "1:926037953537:web:6d63ac74eba62dad7c8400",

  measurementId: "G-N841D6W4PB"

};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase