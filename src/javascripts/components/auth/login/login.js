import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../../helpers/utils';

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider(); /* google api services used to log in */
  firebase.auth().signInWithPopup(googleProvider);
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-warning"><i class="fab fa-google-plus"></i> LOG ME IN!!!</button>';
  utils.printToDom('#auth', domString);
  $('#google-auth').click(signMeIn); /* event listner when the login button is clicked and used to log in to the app */
};

export default { loginButton };
