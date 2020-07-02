const boardBuilder = (board) => {
  const domString = `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${board.boardTitle}</h5>
    <p class="card-text">${board.uid}</p>
    <p class="card-text">${board.pid}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `;
  return domString;
};

export default { boardBuilder };
