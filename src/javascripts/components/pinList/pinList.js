import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import singlePin from '../singlePin/singlePin';

const buildPins = () => {
  pinData.getPins()
    .then((pins) => {
      let domString = `
      <div class="col-12"> 
      <div class="d-flex justify-content-center">     
      <div class="card mb-5" style="width: 60rem;">
      <div class="card-body"> 
      <div class="d-flex flex-wrap justify-content-center mx-1">
      `;
      pins.forEach((pin) => {
        domString += singlePin.pinBuilder(pin);
      });
      domString += `</div>
      </div>
    </div>
    </div>
    </div>
      `;
      utils.printToDom('#boards', domString);
    })
    .catch((reject) => console.warn(reject));
};

export default { buildPins };
