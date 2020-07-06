const pinBuilder = (pin) => { // this is for the detail board page medium size but with buttons to delete and redirect
  const domString = ` 
  <div class="card mb-3 pinDetail hoverEffect align-self-start" id="${pin.id}" style="width: 10rem;">
  <img class="card-img-top" src="${pin.imgURL}" alt="Card image cap">         
          <div class="d-flex justify-content-between">
          <a href="#" class="btn btn-warning link"><i class="fas fa-external-link-alt"></i></a>
          <a href="#" class="btn btn-danger delete-pin"><i class="fas fa-trash-alt"></i></a>     
    </div> 
  </div>     
    `;
  return domString;
};

const smallPinBuilder = (pin) => { // this pinBuilder is for the home page with small size pins
  const domString = ` 
  <div class="card mb-3 hoverEffect align-self-start" id="${pin.id}" style="width: 4rem;">
  <img class="card-img-top" src="${pin.imgURL}" alt="Card image cap">          
  </div>     
    `;
  return domString;
};

const allPinBuilder = (pin) => { // this is for the appPinBuilder medium in size
  const domString = ` 
  <div class="card mb-3 hoverEffect align-self-start" id="${pin.id}" style="width: 10rem;">
  <img class="card-img-top" src="${pin.imgURL}" alt="Card image cap">          
  </div>     
    `;
  return domString;
};

const pinDetailBuilder = (pin) => { // this is detail pin builder builds it big
  const domString = ` 
  <div class="d-flex justify-content-center mb-5">
    <div class="col-8">
      <div class="card" id="${pin.boardId}">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="d-flex justify-content-center">
              <div class="card mb-2" style="width: 14rem; border-radius:20px;">
              <img class="card-img-top" src="${pin.imgURL}" alt="Card image cap">
              </div>           
              </div> 
            </div>
            <div class="col-6">
              <a href="#" class="btn btn-outline-dark backButton mb-5"><i class="fas fa-arrow-left"></i></a>
              <h1>${pin.pinTitle}</h1>
              <h5>${pin.Description}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>    
    `;
  return domString;
};

export default {
  pinBuilder, smallPinBuilder, allPinBuilder, pinDetailBuilder,
};
