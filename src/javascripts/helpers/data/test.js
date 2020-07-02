/*
  * example return:
    * {
    *   name: 'Luke',
    *   uid: 'f789y2qh3uhf79234f7h234',
    *   id: 'userObjId',
    *   boards: {
            board1: {
                pins: [
                    { id: 'pin1', name: 'shitake', type: 'forest'  },
                    { id: 'pin2', name: 'shitake', type: 'forest'  },
                    { id: 'pin3', name: 'shitake', type: 'forest'  },
                    ]
                },
            board2: {
                pins: [
                    { id: 'pin4', name: 'shitake', type: 'forest'  },
                    { id: 'pin5', name: 'shitake', type: 'forest'  },
                    { id: 'pin6', name: 'shitake', type: 'forest'  },
                    ]
                },
            }
    }
    */

/* * example return:
    {
        name: 'Luke',
        uid: 'f789y2qh3uhf79234f7h234',
        id: 'userObjId',
        boards: [
                {
                    boardId: boardObj1,
                    boardTitle: Home,
                    pins: [
                            { id: 'pin1', name: 'shitake'  },
                            { id: 'pin2', name: 'shitake'  },
                            { id: 'pin3', name: 'shitake'  },
                        ]
                },
                {
                    boardId: boardObj2,
                    boardTitle: Furniture,
                    pins: [
                            { id: 'pin4', name: 'shitake'  },
                            { id: 'pin5', name: 'shitake'  },
                            { id: 'pin6', name: 'shitake'  },
                        ]
                },
            ]
    }
*/

/*
import userData from './userData';
import pinData from './pinData';
import userPinData from './userPinData';

const getSingleUserWithPins = (userObjId) => new Promise((resolve, reject) => {
  userData.getUserByUserObjId(userObjId)
    .then((user) => {
      // console.warn(user.data);
      const userObj = user.data;
      userObj.id = userObjId;
      userObj.pins = [];
      userPinData.getUserPinsByUid(userObj.uid)
        .then((userPins) => {
          pinData.getPins().then((allPins) => {
            console.warn(allPins);
            userPins.forEach((userPin) => {
              const pin = allPins.find((p) => p.id === userPin.pinObjId);
              userObj.pins.push(pin);
              console.warn(pin);
            });
          });
        });
      resolve(userObj);
    })
    .catch((error) => reject(error));
});

export default { getSingleUserWithPins };
*/
