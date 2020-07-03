import singlePin from '../singlePin/singlePin';

const boardBuilder = (pins) => {
  let domString = `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="d-flex flex-wrap justify-content-center">
    <div class="card mb-5" style="width: 18rem;">
    <div class="card-body ">
  `;
  pins.forEach((pin) => {
    domString += singlePin.pinBuilder(pin);
  });
  domString += `    
    </div>
    </div>
    </div>
    </div>
    `;
  return domString;
};

export default { boardBuilder };
