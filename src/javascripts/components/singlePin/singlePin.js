const pinBuilder = (pin) => {
  const domString = ` 
  <div class="card mb-3">
    <div class="card-body">     
          <h5 class="card-title">${pin.pinTitle}</h5>
          <p class="card-text">${pin.description}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
    </div> 
  </div>     
    `;
  return domString;
};

export default { pinBuilder };
