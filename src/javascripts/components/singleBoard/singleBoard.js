import singlePin from '../singlePin/singlePin';

const boardBuilder = (singleBoardPins) => {
  if (singleBoardPins.length !== 0) {
    let domString = `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="d-flex flex-wrap justify-content-center">
    <div class="card mb-5" id="${singleBoardPins[0].boardId}" style="width: 18rem;">
    <div class="card-body ">
    <div class="d-flex justify-content-between mb-3" >
    <a href="#" class="btn btn-dark  detail-board"  style="float: right; "><i class="fas fa-hand-pointer"></i></a>
    <a href="#" class="btn btn-danger  delete-board"  style="float: right; "><i class="fas fa-trash-alt"></i></a>
    </div>
  `;
    singleBoardPins.forEach((pin) => {
      domString += singlePin.pinBuilder(pin);
    });
    domString += `    
    </div>
    </div>
    </div>
    </div>
    `;
    return domString;
  }
  return '';
};

const detailBoardBuilder = (singleBoardPins) => {
  if (singleBoardPins.length !== 0) {
    let domString = `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="d-flex flex-wrap justify-content-center">
    <div class="card mb-5 detail-board" id="${singleBoardPins[0].boardId}" style="width: 18rem;">
    <div class="card-body ">
    <div class="d-flex justify-content-between mb-3" >
    <a href="#" class="btn btn-dark  home-page"  style="float: left; "><i class="fas fa-home"></i></a>
    <a href="#" class="btn btn-danger  delete-board"  style="float: right; "><i class="fas fa-trash-alt"></i></a>
    </div>
  `;
    singleBoardPins.forEach((pin) => {
      domString += singlePin.pinBuilder(pin);
    });
    domString += `    
    </div>
    </div>
    </div>
    </div>
    `;
    return domString;
  }
  return '';
};

export default { boardBuilder, detailBoardBuilder };
