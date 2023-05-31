const playerCreate = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(" ");
  }

  let box = document.getElementsByClassName("box");

  Array.from(box).forEach((element, index) => {
    element.addEventListener("click", () => {
      element.classList.add(gameObject.player.marker);
      displayMarker(gameObject.player.marker, element);
      board[index] = gameObject.player.marker;
      element.style.pointerEvents = "none";
      gameObject.spots -= 1;
      gameObject.winners();
      if (gameObject.winnerDeclare == false) {
        if (gameObject.spots > 0) {
          gameObject.changePlayerText();
          gameObject.changePlayerTurn();
        } else if (gameObject.spots == 0) {
          gameObject.declareTie();
        }
      } else {
        notAllow();
      }
    });
  });

  return { board };
})();

function displayMarker(mark, element) {
  if (mark === "X") {
    element.textContent = "X";
  } else {
    element.textContent = "O";
  }
}
function notAllow() {
  document.querySelector(".main").style.cursor = "not-allowed";
  document.querySelector(".container").style.pointerEvents = "none";
}

const gameObject = (() => {
  const player1 = playerCreate("playerOne", "X");
  const player2 = playerCreate("playerTwo", "O");

  let winnerDeclare = false;
  let spots = 9;
  let player = player1;

  let text_div = document.getElementsByClassName("text")[0];
  let chng_player = document.getElementById("chng_player");

  const winningStats = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function winners() {
    winningStats.forEach((item) => {
      if (
        gameBoard.board[item[0]] === this.player.marker &&
        gameBoard.board[item[1]] === this.player.marker &&
        gameBoard.board[item[2]] === this.player.marker
      ) {
        console.log("Winner");
        text_div.innerHTML = `<span><b>Congratulations ${
          this.player.name === "playerOne" ? "Player 1" : "Player 2"
        } wins!!</b></span>`;
        this.winnerDeclare = true;
      }
    });
  }

  function changePlayerText() {
    this.player === player1
      ? (chng_player.textContent = "Player 2")
      : (chng_player.textContent = "Player 1");
  }

  function changePlayerTurn() {
    this.player === player1 ? (this.player = player2) : (this.player = player1);
  }

  let declareTie = () => {
    text_div.innerHTML = `<b>TIE!! </b>`;
  };

  return {
    changePlayerText,
    winnerDeclare,
    winners,
    changePlayerTurn,
    spots,
    player,
    declareTie,
  };
})();

let restart = document.querySelector(".restart_game");
restart.addEventListener("click", () => {
  window.location.reload();
});
