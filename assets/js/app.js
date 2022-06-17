const finalScoreElement = document.querySelector("#finalScore");
const modalElement = document.querySelector(".popup-modal");
const coverElement = document.querySelector(".cover");
const finalScoreTitle = document.querySelector("#finalScoreTitle");
const leftElement = document.querySelector(".left");
const rightElement = document.querySelector(".right");
const diceElement = document.querySelector(".dice-animation");
const showScoreElement = document.querySelector("#showScoreSpan");
const scoreLeftElement = document.querySelector(".scoreLeft");
const scoreRightElement = document.querySelector(".scoreRight");
const winPlayerMessage = document.getElementById('winPlayerMessage');
const winPlayerPannel = document.querySelector('.win-panel');

let shakeDiceTime = 2500;
let currentPlayer = 1;
let finalScore = 10;
let scors = {
  leftPlayer: 0,
  rightPlayer: 0,
};

const getSideByTitle = (side) => {
  if (side === "left") return 1;
  if (side === "right") return 2;
};

const changeCurrentPlayer = () =>
  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);

const startGame = () => {
  if(!finalScoreElement.value) {
      alert('Please Enter A Correct Number !');
      return;
  }

  finalScore = finalScoreElement.value;
  finalScoreTitle.textContent = finalScore.toString();
  modalElement.style.display = "none";
  coverElement.style.display = "none";
  //changeCurrentPlayerStatus(currentPlayer);
};

const changeCurrentPlayerStatus = (currentPlayer) => {
  if (currentPlayer === 1) {
    leftElement.style.backgroundColor = "#dadada";
    rightElement.style.backgroundColor = "";
  }
  if (currentPlayer === 2) {
    rightElement.style.backgroundColor = "#dadada";
    leftElement.style.backgroundColor = "";
  }
};

const generateDiceNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const changeDOMScors = () => {
  scoreLeftElement.textContent = scors.leftPlayer;
  scoreRightElement.textContent = scors.rightPlayer;
};

const shakeDice = (side) => {
  const sideId = getSideByTitle(side);
  const generatedScore = generateDiceNumber();

  if (sideId === currentPlayer) {
    diceElement.style.display = "block";
    setTimeout(() => {
      diceElement.style.display = "none";
      showScoreElement.textContent = generatedScore;
      changeCurrentPlayerStatus(currentPlayer);

      if (currentPlayer === 1) {
        scors.leftPlayer += generatedScore;
      } else {
        scors.rightPlayer += generatedScore;
      }

      changeDOMScors();

      checkIsWinPlayer();

      changeCurrentPlayer();
    }, 1500);
  } else {
    return;
  }
};

const checkIsWinPlayer = () => {
  if(scors.leftPlayer >= finalScore) {
    coverElement.style.display = "block";
    winPlayerPannel.style.display = "block";
    winPlayerMessage.textContent = "Player One Wins";
    return;
  }
  if(scors.rightPlayer >= finalScore) {
    coverElement.style.display = "block";
    winPlayerPannel.style.display = "block";
    winPlayerMessage.textContent = "Player Two Wins";
    return;
  }
};


