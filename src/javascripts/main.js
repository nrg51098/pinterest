import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/login/login';
import myNavbar from './components/logout/logout';
import authData from './components/checkIfLoggedIn/checkIfLoggedIn';

import '../styles/main.scss';

/**
 * Be able to login and logout to our app
 * see a login button if we are not logged in
 * see a logout button if we are logged in
 * see a list of mushrooms (like a forest!) if we are logged in
 */

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
};

init();
