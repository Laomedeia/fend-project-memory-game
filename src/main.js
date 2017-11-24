import app from "./js/app.js";
import "./css/app.css";
import "animate.css/animate.min.css";

let cardEl;
let previousTimerId;
const appEl = document.querySelector("#app");
const passEl = document.querySelector("#pass");
const deckEl = document.querySelector("#deck");
const playAgainEl = document.querySelector("#play-again");
const movesEl = document.querySelector(".moves");
const starEl = document.querySelector(".stars");
const restartEl = document.querySelector("#restart");
const totalMovesEl = document.querySelector("#totalMoves");
const totalStarsEl = document.querySelector("#totalStars");
const timerEl = document.querySelector("#timer");

//准备开始
readyForStart();
//绑定restart deck event
addRestartEvent(restartEl);
//绑定play again event
addPlayAgainEvent(playAgainEl);

function readyForStart() {
  app.initGame(deckEl);
  addCardClickListener();
  resetMovesAndStars();
  startTimer();
}

//开始计时
function startTimer() {
  clearInterval(previousTimerId);
  previousTimerId = app.elapsedTime(0,0,0,timerEl);
}

//重置配对步数和星星
function resetMovesAndStars() {
  app.totalMoves = 0;
  app.successMatches = 0;
  app.totalStars = 3;
  movesEl.innerHTML = 0;
  let starOElements = document.querySelectorAll(".fa-star-o");
  if (starOElements && starOElements.length > 0) {
    starOElements.forEach(element => {
      element.className = "fa fa-star";
    });
  }
}

function playAgain() {
  appEl.classList.remove("hidden");
  passEl.classList.remove("display");
  passEl.classList.add("hidden");
  readyForStart();
}

function addPlayAgainEvent(playAgainElement) {
  playAgainElement.addEventListener("click", playAgain, false);
}

function addRestartEvent(restartElement) {
  restartElement.addEventListener("click", readyForStart, false);
}

function addCardClickListener() {
  cardEl = document.querySelectorAll(".card");
  cardEl.forEach(element => {
    element.addEventListener("click", cardClicked, false);
  });
}

function cardClicked() {
  var cardElement = this;
  var cardClassName = cardElement.className;
  if (
    cardClassName.indexOf("card") != -1 &&
    cardClassName.indexOf("open show") == -1
  ) {
    setClickAnimate(cardElement);
    app.displayCard(cardElement);
    app.openCardList.push(cardElement);
    if (app.openCardList.length == 2) {
      //配对计数
      app.calcMoves(movesEl);
      //星星计数
      app.calcStars(starEl);
      //比较配对成功与否
      var result = app.compareTwoCardsIsEqual(
        app.openCardList[0],
        app.openCardList[1]
      );
      if (!result) {
        //配对失败隐藏
        app.disableCardClick(cardEl);
        setTimeout(() => {
          app.hideCard(app.openCardList[0]);
          app.hideCard(app.openCardList[1]);
          removeTwoAnimateFlipY(app.openCardList[0], app.openCardList[1]);
          app.openCardList = [];
          app.recoverCardClick(cardEl);
          return;
        }, 1000);
      } else {
        removeTwoAnimateFlipY(app.openCardList[0], app.openCardList[1]);
        addTwoAnimateRubber(app.openCardList[0], app.openCardList[1]);
        app.openCardList = [];
        //全部配对成功弹出信息
        if (app.successMatches == 8) {
          console.log("all success");
          displayResult();
        }
      }
    }
  }
}

function displayResult() {
  appEl.classList.add("hidden");
  passEl.classList.remove("hidden");
  passEl.classList.add("display");
  totalMovesEl.innerHTML = app.totalMoves;
  totalStarsEl.innerHTML = app.totalStars;
}

function setClickAnimate(element) {
  element.classList.remove("shake");
  element.classList.add("flipInY");
}

function removeTwoAnimateFlipY(element1, element2) {
  element1.classList.remove("flipInY");
  element2.classList.remove("flipInY");
}

function addTwoAnimateRubber(element1, element2) {
  element1.classList.add("rubberBand");
  element2.classList.add("rubberBand");
}
