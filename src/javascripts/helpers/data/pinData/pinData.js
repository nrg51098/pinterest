import axios from 'axios';
import apiKeys from '../../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    const allPins = response.data;
    const pins = [];
    Object.keys(allPins).forEach((pinObjId) => {
      allPins[pinObjId].pid = pinObjId;
      pins.push(allPins[pinObjId]);
    });
    resolve(pins);
  }).catch((error) => {
    reject(error);
  });
});

const getPinByPinObjId = (pinObjId) => {
  axios.get(`${baseUrl}/pins/${pinObjId}.json`)
    .then((response) => console.warn(response.data))
    .catch((error) => console.warn(error));
};

export default { getPins, getPinByPinObjId };
