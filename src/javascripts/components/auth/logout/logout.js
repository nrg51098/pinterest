import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    console.warn('clicked logged out');
    firebase.auth().signOut();
  });
};

export default { logoutEvent };
