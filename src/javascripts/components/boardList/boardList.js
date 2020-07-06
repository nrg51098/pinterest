import smashData from '../../helpers/data/smashData';
import utils from '../../helpers/utils';
import singleBoard from '../singleBoard/singleBoard';
import pinData from '../../helpers/data/pinData';
import pinList from '../pinList/pinList';
import singlePin from '../singlePin/singlePin';

const currentUser = 'user1';

const removeBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  smashData.totallyRemoveBoard(boardId)
    .then(() => {
      // reprint the dom (so all the remaining boards shows up if no boards, show empty)
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not delete board', err));
};

const removePinEvent = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.getPinByPinObjId(pinId) // this one is just to get the board Id before we delete the pin so we can print the same board again with rest pins
    .then((pin) => {
      smashData.totallyRemovePin(pinId)
        .then(() => {
          pinData.getPinsByBoardId(pin.boardId) // gets the pins by boardId
            .then((boardPins) => {
              if (boardPins.length === 0) { // this if is just to take to home page if all the pins for that board are deleted
              // eslint-disable-next-line no-use-before-define
                buildBoards();
              } else { // otherwise show the rest of the pins for that board
              // eslint-disable-next-line no-use-before-define
                buildPinsByBoardId(pin.boardId);
              }
            });
        });
    })
    .catch((err) => console.error('could not delete pin', err));
};

const homePageEvent = () => { // this is to reprint the dom back and forth from home page to boardDetail Page
  // ????????? how to get around the circular dependencies
  // ????????? how to get the logged in user here
  // ????????? how to call event functions from other functions
  smashData.getSingleUserWithPins(currentUser)
    .then((user) => {
      let domString = `
      <div class="row d-flex justify-content-center">      
      `;
      user.pins.forEach((pinsByBoard) => {
        domString += singleBoard.boardBuilder(pinsByBoard); // prints one by one pin per each board, this shows multiple boards with multiple pins
      });
      domString += `      
      </div>`;
      utils.printToDom('#boards', domString);
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.delete-board', removeBoardEvent); // btn click event to delete board and associated pins
};

const buildPinsByBoardId = (boardId) => { // function to build the pins by board Id gets run from the detailBoardEvent
  pinData.getPinsByBoardId(boardId)
    .then((boardPins) => {
      let domString = `
    <div class="row d-flex justify-content-around">
    `;
      domString += singleBoard.detailBoardBuilder(boardPins);
      domString += `      
    </div>`;
      utils.printToDom('#boards', domString);
      const myBoardBtn = document.querySelector('.myBoardBtn'); // making the myboard button deactive, so user can select again
      myBoardBtn.classList.remove('active');
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.home-page', homePageEvent); // going back to home page
};

const detailBoardEvent = (e) => { // event listner function to show the single detail board with all the pins
  const boardId = e.target.closest('.board').id;
  buildPinsByBoardId(boardId);
};

const myBoardBtnClickEvent = () => { // event listener function to go back to the home page with multiple board
  const myBoardBtn = document.querySelector('.myBoardBtn');
  myBoardBtn.classList.add('active');
  const myPinBtn = document.querySelector('.myPinBtn');
  myPinBtn.classList.remove('active');
  // eslint-disable-next-line no-use-before-define
  buildBoards();
};

const pinBtnClickEvent = () => { // event listner function to show all the pins, I need to put the logic to show all pins belong to this user
  const myBoardBtn = document.querySelector('.myBoardBtn');
  myBoardBtn.classList.remove('active');
  const myPinBtn = document.querySelector('.myPinBtn');
  myPinBtn.classList.add('active');
  pinList.buildPins();
  $('.myBoardBtn').click(myBoardBtnClickEvent); // this one is event handler to go back to the home page, the btn name should be myBoardsBtn
};

const backBtnClickEvent = (e) => { // this is event handler function to go back to the same board from pinShowDetailEvent to previous page
  const boardId = e.target.closest('.card').id;
  buildPinsByBoardId(boardId); // reprint the dom
};

const pinShowDetailEvent = (e) => { // this is to show the detail view of the pin with title and description
  const pinId = e.target.closest('.card').id; // getting the pinId
  pinData.getPinByPinObjId(pinId) // getting the pin object from the pinId
    .then((pin) => {
      const domString = singlePin.pinDetailBuilder(pin); // passing the pin object to the pinDetailBuilder function
      utils.printToDom('#boards', domString);
      $('body').on('click', '.home-page', homePageEvent); // adding all the event listners back
      $('.myPinBtn').click(pinBtnClickEvent);
      $('.backButton').click(backBtnClickEvent);
    })
    .catch((error) => console.warn(error));
};

const buildBoards = () => { // this is the initial entry function shows the boards and pins associated with this user
  smashData.getSingleUserWithPins(currentUser) // gets the pins for this user, pin has the boardId inside pin object to seperate the pins by board
    .then((user) => { // print the user to see the user object structure
      let domString = `      
      <div class="row d-flex justify-content-around">      
      `;
      user.pins.forEach((pinsByBoard) => { // user.pins has multiple boards array inside the multiple pins array,
        domString += singleBoard.boardBuilder(pinsByBoard); // here passing the pins by board, this will iterate multiple times if there are multiple boards
      });
      domString += `      
      </div>`;
      utils.printToDom('#boards', domString); // printing it to the dom
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.delete-board', removeBoardEvent); // attaching all the event listners
  $('body').on('click', '.board', detailBoardEvent);
  $('body').on('click', '.delete-pin', removePinEvent);
  $('.myPinBtn').click(pinBtnClickEvent);
  $('body').on('click', '.pinDetail', pinShowDetailEvent);
};

export default { buildBoards };
