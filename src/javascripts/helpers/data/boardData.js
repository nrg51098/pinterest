import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;
const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
  // to make the line above working you need to add rules to your database as shown below
  // otherwise it will give 404 error basically you are adding the rule to boards.json file
  // {
  // "rules": {
  // ".read": true,
  // ".write": true,
  //   "boards": {
  //    ".indexOn": "uid"
  //   }
  //  }
  // }
    .then((response) => {
      const selectedBoardsObj = response.data;
      const selectedBoards = [];
      Object.keys(selectedBoardsObj).forEach((boardObjId) => {
        selectedBoardsObj[boardObjId].id = boardObjId;
        selectedBoards.push(selectedBoardsObj[boardObjId]);
      });
      console.warn(selectedBoards);
      resolve(selectedBoards);
    })
    .catch((error) => reject(error));
});

export default { getBoardsByUid };
