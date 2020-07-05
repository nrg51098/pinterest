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
      // console.warn(selectedBoards);
      resolve(selectedBoards);
    })
    .catch((error) => reject(error));
});

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`).then((response) => {
    const allBoards = response.data;
    const boards = [];
    Object.keys(allBoards).forEach((boardObjId) => {
      allBoards[boardObjId].id = boardObjId;
      boards.push(allBoards[boardObjId]);
    });
    resolve(boards);
  }).catch((error) => reject(error));
});

const getBoardTitleByBoardObjId = (boardObjId) => new Promise((resolve, reject) => {
  getAllBoards()
    .then((boards) => {
      const singleBoard = boards.find((board) => board.boardId === boardObjId);
      resolve(singleBoard.boardTitle);
    })
    .catch((error) => reject(error));
});

const deleteBoard = (boardObjId) => axios.delete(`${baseUrl}/boards/${boardObjId}.json`);

export default {
  getBoardsByUid, getAllBoards, deleteBoard, getBoardTitleByBoardObjId,
};
