import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBWHxSADTwDGqXltZeiZ7Ftsh2vUOo-t_E",
    authDomain: "react-course-8d6e4.firebaseapp.com",
    databaseURL: "https://react-course-8d6e4.firebaseio.com"
  });

  const base = Rebase.createClass(firebaseApp.database());

  export { firebaseApp };

  export default base;