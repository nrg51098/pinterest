import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import singlePin from '../singlePin/singlePin';

const buildPins = () => {
  pinData.getPins()
    .then((pins) => {
      let domString = `
      <h2 class="text-center">Pins</h2>
      <div class="d-flex flex-wrap">
      `;
      pins.forEach((pin) => {
        domString += singlePin.pinBuilder(pin);
      });
      domString += '</div>';

      utils.printToDom('#pins', domString);
    })
    .catch((reject) => console.warn(reject));
};

export default { buildPins };
