import smashData from '../../helpers/data/smashData';
import utils from '../../helpers/utils';
import singleBoard from '../singleBoard/singleBoard';
import pinData from '../../helpers/data/pinData';

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
  // actually delete this mushroom from firebase
  smashData.totallyRemovePin(pinId)
    .then(() => {
      // reprint the dom (so the lil shroomie goes away)
      // eslint-disable-next-line no-use-before-define
      buildBoards();
      // utils.printToDom('#board', '');
    })
    .catch((err) => console.error('could not delete pin', err));
};

const homePageEvent = () => {
  // ????????? how to get around the circular dependencies
  // ????????? how to get the logged in user here
  smashData.getSingleUserWithPins(currentUser)
    .then((user) => {
      let domString = `
      <h2 class="text-center">Boards</h2>
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

const detailBoardEvent = (e) => {
  const boardId = e.target.closest('.card').id;
  pinData.getPinsByBoardId(boardId)
    .then((boardPins) => {
      console.warn('sssss', boardPins);
      let domString = `
      <h2 class="text-center">Detail Board</h2>
      <div class="row d-flex justify-content-around">
      `;
      domString += singleBoard.detailBoardBuilder(boardPins);
      domString += `      
      </div>`;
      utils.printToDom('#boards', domString);
    })
    .catch((error) => console.warn(error));
  $('body').on('click', '.home-page', homePageEvent);
};

const buildBoards = () => {
  smashData.getSingleUserWithPins(currentUser)
    .then((user) => {
      let domString = `
      <h2 class="text-center">Boards</h2>
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
  $('body').on('click', '.detail-board', detailBoardEvent);
  $('body').on('click', '.delete-pin', removePinEvent);
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
