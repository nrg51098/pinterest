const pinBuilder = (pin) => {
  const domString = ` 
  <div class="card mb-3 hoverEffect align-self-start" id="${pin.id}" style="width: 12rem;">
  <img class="card-img-top" src="${pin.imgURL}" alt="Card image cap">         
          <div class="d-flex justify-content-between">
          <a href="#" class="btn btn-warning link"><i class="fas fa-external-link-alt"></i></a>
          <a href="#" class="btn btn-danger delete-pin"><i class="fas fa-trash-alt"></i></a>     
    </div> 
  </div>     
    `;
  return domString;
};

export default { pinBuilder };
