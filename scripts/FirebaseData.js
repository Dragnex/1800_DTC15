var firebaseConfig = {
    apiKey: "AIzaSyBsrMyojW_l_SDXaPG_OHOjPWbt0-4efwM",
    authDomain: "skillstreaks.firebaseapp.com",
    projectId: "skillstreaks",
    storageBucket: "skillstreaks.appspot.com",
    messagingSenderId: "270412540189",
    appId: "1:270412540189:web:2f48fb470f8a69db66d9f4"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();