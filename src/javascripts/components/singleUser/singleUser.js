const userBuilder = (user) => {
  const domString = `
    <div class="col-3">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${user.uid}</h5>
          <p class="card-text">${user.name}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    `;
  return domString;
};

export default { userBuilder };
