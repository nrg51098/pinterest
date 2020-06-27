import firebase from 'firebase/app';
/** we are adding this to get the firebase module and from firebase library packages
* when we installed the dependencies, we are importing only app module becuase
* there are a lot of other modules that we dont want */
import 'firebase/auth';
/* this one we are just adding auth package on top of our firebase package
* this we need only when we need to use the sign in or signout funcitaionality
* thats the reason we dont have this line in the main.js, we only have
* the firebase/app to initialize the app. */

const authDiv = $('#auth');
const cardsDiv = $('#cards');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
  /* the onAuthStateChanged returns a logged in user otherwise no user so you are applying the logic based on if the user exists or not. */
    if (user) {
      authDiv.addClass('hide');
      cardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
    } else {
      authDiv.removeClass('hide');
      cardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
