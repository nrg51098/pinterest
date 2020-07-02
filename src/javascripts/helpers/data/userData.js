import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const allUsers = response.data;
      const users = [];
      Object.keys(allUsers).forEach((userObjId) => {
        allUsers[userObjId].id = userObjId;
        users.push(allUsers[userObjId]);
      });
      resolve(users);
    })
    .catch((error) => reject(error));
});

const getUserByUserObjId = (userObjId) => axios.get(`${baseUrl}/users/${userObjId}.json`);

export default { getUsers, getUserByUserObjId };
