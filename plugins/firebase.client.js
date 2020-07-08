import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/functions'
Vue.use(firestorePlugin)

// Get a Firestore instance
const config = {
  apiKey: 'AIzaSyAC0aCq1umg8bZtOuhzH8GkflqUCtInOp8',
  authDomain: 'indiemakerfr.firebaseapp.com',
  databaseURL: 'https://indiemakerfr.firebaseio.com',
  projectId: 'indiemakerfr',
  storageBucket: 'indiemakerfr.appspot.com',
  messagingSenderId: '600956995728',
  appId: '1:600956995728:web:17aacb03e66648e2d63015',
  measurementId: 'G-HCXN7ZEMJ8'
}

firebase
  .initializeApp(config)
  .firestore()
  // .enablePersistence()
  // .catch(function (err) {
  //   if (err.code === 'failed-precondition') {
  //     // Multiple tabs open, persistence can only be enabled
  //     // in one tab at a a time.
  //     // ...
  //     console.error('Multiple tabs open, persistence can only be enabled', err)
  //   } else if (err.code === 'unimplemented') {
  //     // The current browser does not support all of the
  //     // features required to enable persistence
  //     // ...
  //     console.error('The current browser does not support all of the features required to enable persistence', err)
  //   }
  // })
Vue.prototype.$firebase = firebase
// export const fb = firebase
// export const db = firebase
// .firestore()