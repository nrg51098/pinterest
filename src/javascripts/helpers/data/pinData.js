import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    const allPins = response.data;
    const pins = [];
    Object.keys(allPins).forEach((pinObjId) => {
      allPins[pinObjId].id = pinObjId;
      pins.push(allPins[pinObjId]);
    });
    resolve(pins);
  }).catch((error) => reject(error));
});

const getPinByPinObjId = (pinObjId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinObjId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)

    .then((response) => {
      console.warn(response.data);
      const selectedPinsObj = response.data;
      const selectedPins = [];
      Object.keys(selectedPinsObj).forEach((pinObjId) => {
        selectedPinsObj[pinObjId].id = pinObjId;
        selectedPins.push(selectedPinsObj[pinObjId]);
      });
      console.warn('testdasdf');
      console.warn(selectedPins);
      resolve(selectedPins);
    })
    .catch((error) => reject(error));
});

const deletePin = (pinObjId) => axios.delete(`${baseUrl}/pins/${pinObjId}.json`);

export default {
  getPins, getPinByPinObjId, getPinsByBoardId, deletePin,
};
