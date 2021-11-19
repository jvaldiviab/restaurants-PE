import firebase from 'firebase/app'
import 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfGfq3y2pyMMEabyLBxxHbyugHHNmawms",
    authDomain: "restaurants-finalproject.firebaseapp.com",
    projectId: "restaurants-finalproject",
    storageBucket: "restaurants-finalproject.appspot.com",
    messagingSenderId: "317480008733",
    appId: "1:317480008733:web:f9a73e0642c0857eab5af4"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)