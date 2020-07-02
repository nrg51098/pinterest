import userData from '../../helpers/data/userData';
import singleUser from '../singleUser/singleUser';
import utils from '../../helpers/utils';

const buildUsers = () => {
  userData.getUsers()
    .then((users) => {
      let domString = `
      <h2 class="text-center">Users</h2>
      <div class="d-flex flex-wrap">
      `;
      users.forEach((user) => {
        domString += singleUser.userBuilder(user);
      });
      domString += '</div>';
      utils.printToDom('#users', domString);
    })
    .catch((error) => console.warn(error));
};

export default { buildUsers };
