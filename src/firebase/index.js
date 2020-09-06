import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const app = firebase.initializeApp({
    apiKey: "AIzaSyAkRXDeBeuq3UHIq0B6JMvF5Aa08BD02os",
    authDomain: "reactjs-coderhouse.firebaseapp.com",
    databaseURL: "https://reactjs-coderhouse.firebaseio.com",
    projectId: "reactjs-coderhouse",
    storageBucket: "reactjs-coderhouse.appspot.com",
    messagingSenderId: "960364926080",
    appId: "1:960364926080:web:c81e8f5c02a99167f04265",
    measurementId: "G-M3L58RCK41"
})


export function getFirebase(){
    return app
}

export function getFirestore(){
    return firebase.firestore(app)
}

export function fireAuth(){
   return app.auth()
}

// export function googleAuthProvider(){
//     const google = firebase.auth.GoogleAuthProvider()
//     return google
//  }
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();