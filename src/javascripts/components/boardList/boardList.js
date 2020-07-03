import smashData from '../../helpers/data/smashData';
import utils from '../../helpers/utils';
import singleBoard from '../singleBoard/singleBoard';

const buildBoards = () => {
  smashData.getSingleUserWithPins('user1')
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
