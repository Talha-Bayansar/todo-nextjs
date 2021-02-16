import firebase from "firebase/app";
import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_API_KEY,
//     authDomain: process.env.NEXT_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PROJECT_ID,
//     storageBucket: process.env.NEXT_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyCLgO7GFY2MnxKwpgdJJFAHHjW_nAuQA78",
    authDomain: "todo-9b159.firebaseapp.com",
    projectId: "todo-9b159",
    storageBucket: "todo-9b159.appspot.com",
    messagingSenderId: "154421333172",
    appId: "1:154421333172:web:c19eec4d670cb583499be1",
};

export default function firebaseInit() {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (err) {
        // we skip the "already exists" message which is
        // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
            console.error("Firebase initialization error", err.stack);
        }
    }
    return firebase;
}
