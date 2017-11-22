import app from "./js/app.js";

let cardEl;
const deckEl = document.querySelector("#deck");
const movesEl = document.querySelector(".moves");
const starEl = document.querySelector(".stars");
const restartEl = document.querySelector("#restart");
//准备开始
readyForStart();
//绑定重新开始事件
addRestartEvent(restartEl);

function readyForStart() {
  app.initGame(deckEl);  
  addCardClickListener();
  resetMovesAndStars();
}

function resetMovesAndStars() {
  app.totalMoves = 0;
  movesEl.innerHTML = 0;
  let starOElements = document.querySelectorAll(".fa-star-o");    
  if (starOElements && starOElements.length > 0) {
    starOElements.forEach(element => {
      element.className = "fa fa-star";
    });
  }
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
          app.openCardList = [];
          app.recoverCardClick(cardEl);
          return;
        }, 1000);
      } else {
        app.openCardList = [];
        //全部配对成功弹出信息
        if(app.successMatches == 8) {
          console.log("all success");
          app.successCardList = 0;          
        }
      }
    }
  }
}
