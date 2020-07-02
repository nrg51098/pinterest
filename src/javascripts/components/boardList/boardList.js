import smashData from '../../helpers/data/smashData';

const buildBoards = () => {
  smashData.getSingleUserWithPins('user1')
    .then((response) => {
      const userWithPins = response;
      console.warn(userWithPins.pins);
    })
    .catch((error) => console.warn(error));
};

export default { buildBoards };
