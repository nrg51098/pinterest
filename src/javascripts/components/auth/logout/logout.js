import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    console.warn('clicked logged out');
    firebase.auth().signOut(); // this gets the logout logic working
  });
};

export default { logoutEvent };
