import * as firebase from "firebase"
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVRsOQEtT1oV_uwCMwcP-3d7deJCMOjx8",
    authDomain: "mindful-team.firebaseapp.com",
    projectId: "mindful-team",
    storageBucket: "mindful-team.appspot.com",
    messagingSenderId: "118628564419",
    appId: "1:118628564419:web:54666f4be96d9504781176"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };