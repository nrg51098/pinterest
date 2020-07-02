import userData from './userData';
import pinData from './pinData';
import boardData from './boardData';

const getSingleUserWithPins = (userObjId) => new Promise((resolve, reject) => {
  userData.getUserByUserObjId(userObjId) // get single User by userObjId
    .then((user) => {
      console.warn(user.data);
      const userObj = user.data; // gives us user object
      userObj.id = userObjId; // add the id field in to the object
      userObj.pins = [];
      // add the empty arrary in to user object this will be our pins
      boardData.getBoardsByUid(userObj.uid) // get boards by uid which we have in the user obj this will give only boards belongs to this user
        .then((boards) => { // boards belongs to this user
        // get all the pins no logic here
          // console.warn(allPins);
          boards.forEach((board) => { // iterate through the boards that we got which belongs to this user
            pinData.getPinsByBoardId(board.boardId)
              .then((pins) => {
                console.warn(pins);
                pins.forEach((pin) => {
                  userObj.pins.push(pin);
                  console.warn(pin);
                });
              })
              .catch((error) => reject(error));
            console.warn(userObj);
          });
        });
      // console.warn(userObj);
      resolve(userObj); // pass the entire userObj in following format

      /* * example return:
          {
              name: 'Nikhil',
              uid: 'f789y2qh3uhf79234f7h234',
              id: 'userObjId',
              pins: [
                { id: 'pin1', name: 'shitake' boardId: "1", boardTitle: "Board Title" },
                { id: 'pin2', name: 'shitake' boardId: "1", boardTitle: "Board Title" },
                { id: 'pin3', name: 'shitake' boardId: "2", boardTitle: "Board Title" },
                { id: 'pin4', name: 'shitake' boardId: "2", boardTitle: "Board Title" }
              ]
          }
      */
    })
    .catch((error) => reject(error));
});

export default { getSingleUserWithPins };
