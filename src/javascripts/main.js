import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/auth/login/login';
import logout from './components/auth/logout/logout';
import authData from './components/auth/checkLogIn/checkLogin';

import '../styles/main.scss';
import './components/singlePin/singlePin.scss';
import './components/boardList/boardList.scss';

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
  logout.logoutEvent();
};

init();
