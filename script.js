// "use strict";

let o_turn; //check if it's O turn
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.getElementById("board");
const result = document.getElementById("result-message");
const reset = document.getElementById("reset");
const winnerName = document.querySelector(".winner-name");

//MUST use "data-XXX" to denote all the cells
const cells = document.querySelectorAll("[data-c]");
// console.log(cells);

//Set the default hint at the start & reset
function gameStart() {
  board.classList.remove("o");
  board.classList.remove("x");
  board.classList.add("x"); //set it's X turn at the beginning
  result.classList.remove("show"); //hide the result message
  //{once: true} means the event can be trigger only ONCE
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    cell.classList.remove("o");
    cell.classList.remove("x");
  });
}
gameStart();

function handleClick(e) {
  //show the marks
  if (!o_turn) {
    e.target.classList.add("x");
  } else {
    e.target.classList.add("o");
  }
  //check if winner, if not, then check if draw
  if (checkWinner(o_turn)) {
    result.classList.add("show");
    if (o_turn) {
      winnerName.innerText = "Winner - O";
    } else {
      winnerName.innerText = "Winner - X";
    }
  } else if (checkDraw()) {
    result.classList.add("show");
    winnerName.innerText = "There's a draw";
  } else {
    //No winner, not draw, switch turns
    o_turn = !o_turn;
  }

  //Realise hover effect
  addHoverEffect();
}

function checkWinner(o_turn) {
  if (!o_turn) {
    return winningCombinations.some((combo) => {
      return combo.every((index) => {
        return cells[index].classList.contains("x");
      });
    });
  } else {
    return winningCombinations.some((combo) => {
      return combo.every((index) => {
        return cells[index].classList.contains("o");
      });
    });
  }
}

//cells is typeof NodeList, don't have "every" method, so chage it to an Array
function checkDraw() {
  return Array.from(cells).every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

//give hint of NEXT mark base on turns
function addHoverEffect() {
  board.classList.remove("o");
  board.classList.remove("x");
  if (o_turn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
}

//Restart
reset.addEventListener("click", gameStart);
