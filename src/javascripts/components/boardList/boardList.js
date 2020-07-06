import smashData from '../../helpers/data/smashData';
import utils from '../../helpers/utils';
import singleBoard from '../singleBoard/singleBoard';
import pinData from '../../helpers/data/pinData';
import pinList from '../pinList/pinList';
import singlePin from '../singlePin/singlePin';

const currentUser = 'user1';

const removeBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  console.warn(boardId);
  // actually delete this mushroom from firebase
  smashData.totallyRemoveBoard(boardId)
    .then(() => {
      // reprint the dom (so the lil shroomie goes away)
      // eslint-disable-next-line no-use-before-define
      buildBoards();
      // utils.printToDom('#board', '');
    })
    .catch((err) => console.error('could not delete board', err));
};

const removePinEvent = (e) => {
  const pinId = e.target.closest('.card').id;
  console.warn(pinId);
  pinData.getPinByPinObjId(pinId) // this one is just to get the board Id so we can print the same board again
    .then((pin) => {
      console.warn(pin);
      smashData.totallyRemovePin(pinId)
        .then(() => {
          pinData.getPinsByBoardId(pin.boardId)
            .then((boardPins) => {
              console.warn(boardPins.length);
              if (boardPins.length === 0) {
              // eslint-disable-next-line no-use-before-define
                buildBoards();
              } else {
              // eslint-disable-next-line no-use-before-define
                buildPinsByBoardId(pin.boardId);
              }
            });
        // eslint-disable-next-line no-use-before-define
        // buildBoards();
        // utils.printToDom('#board', '');
        });
    })
    .catch((err) => console.error('could not delete pin', err));
};

const homePageEvent = () => {
  // ????????? how to get around the circular dependencies
  // ????????? how to get the logged in user here
  // ????????? how to call event functions from other functions
  smashData.getSingleUserWithPins(currentUser)
    .then((user) => {
      let domString = `
      <div class="row d-flex justify-content-center">      
      `;
      user.pins.forEach((pinsByBoard) => {
        domString += singleBoard.boardBuilder(pinsByBoard);
      });
      domString += `      
      </div>`;
      utils.printToDom('#boards', domString);
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.delete-board', removeBoardEvent);
};

const buildPinsByBoardId = (boardId) => {
  pinData.getPinsByBoardId(boardId)
    .then((boardPins) => {
      let domString = `
    <div class="row d-flex justify-content-around">
    `;
      domString += singleBoard.detailBoardBuilder(boardPins);
      domString += `      
    </div>`;
      utils.printToDom('#boards', domString);
      const myBoardBtn = document.querySelector('.myBoardBtn');
      myBoardBtn.classList.remove('active');
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.home-page', homePageEvent);
};

const detailBoardEvent = (e) => {
  const boardId = e.target.closest('.board').id;
  buildPinsByBoardId(boardId);
};

const boardBtnClickEvent = () => {
  const myBoardBtn = document.querySelector('.myBoardBtn');
  myBoardBtn.classList.add('active');
  const myPinBtn = document.querySelector('.myPinBtn');
  myPinBtn.classList.remove('active');
  // eslint-disable-next-line no-use-before-define
  buildBoards();
};

const pinBtnClickEvent = () => {
  const myBoardBtn = document.querySelector('.myBoardBtn');
  myBoardBtn.classList.remove('active');
  const myPinBtn = document.querySelector('.myPinBtn');
  myPinBtn.classList.add('active');
  pinList.buildPins();
  $('.myBoardBtn').click(boardBtnClickEvent);
};

const backBtnClickEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  buildPinsByBoardId(boardId);
};

const pinShowDetailEvent = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.getPinByPinObjId(pinId)
    .then((pinParam) => {
      console.warn(pinParam);
      const pin = pinParam;
      pin.id = pinId;
      console.warn(pin);
      const domString = singlePin.pinDetailBuilder(pin);
      utils.printToDom('#boards', domString);
      $('body').on('click', '.home-page', homePageEvent);
      $('.myPinBtn').click(pinBtnClickEvent);
      $('.backButton').click(backBtnClickEvent);
    })
    .catch((error) => console.warn(error));
};

const buildBoards = () => {
  smashData.getSingleUserWithPins(currentUser)
    .then((user) => {
      let domString = `      
      <div class="row d-flex justify-content-around">      
      `;
      user.pins.forEach((pinsByBoard) => {
        domString += singleBoard.boardBuilder(pinsByBoard);
      });
      domString += `      
      </div>`;
      utils.printToDom('#boards', domString);
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.delete-board', removeBoardEvent);
  $('body').on('click', '.board', detailBoardEvent);
  $('body').on('click', '.delete-pin', removePinEvent);
  $('.myPinBtn').click(pinBtnClickEvent);
  $('body').on('click', '.pinDetail', pinShowDetailEvent);
};

export default { buildBoards };

/*
{
id: "user1",
name: "Name goes here",
pins: [
 {boardId: "1", description: "This is description for this pin", imgURL: "image url goes here", pinTitle: "Chair", pinURL: "page url goes here"},
 {boardId: "1", description: "This is description for this pin", imgURL: "image url goes here", pinTitle: "Desk", pinURL: "page url goes here"},
 {boardId: "2", description: "This is description for this pin", imgURL: "image url goes here", pinTitle: "TV", pinURL: "page url goes here"},
 {boardId: "2", description: "This is description for this pin", imgURL: "image url goes here", pinTitle: "Photoframe", pinURL: "page url goes here"}
],
uid: "1"
}
*/
