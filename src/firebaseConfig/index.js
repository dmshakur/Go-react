import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
   apiKey: "AIzaSyA3adSr3gKePH7J07FjS_SZVvpXAjyYQno",
   authDomain: "go-react-alphabeta.firebaseapp.com",
   databaseURL: "https://go-react-alphabeta.firebaseio.com",
   projectId: "go-react-alphabeta",
   storageBucket: "go-react-alphabeta.appspot.com",
   messagingSenderId: "947800282985",
   appId: "1:947800282985:web:05d213de6ecf7202"
 }

firebase.initializeApp(config)

export default firebase
