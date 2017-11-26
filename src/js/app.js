export default {
  //卡片图案种类
  cardSymbols: [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
  ],

  //card html dom array
  cardList: [],
  //配对点击次数
  totalMoves: 0,
  //获得星星数
  totalStars: 3,
  //点开的卡片列表
  openCardList: [],
  //成功配对数，如果length==8则全部匹配成功
  successMatches: 0,

  //初始化游戏
  initGame: function(deckElment) {
    if (this.cardList.length == 0) {
      for (let i = 0; i < 2; i++) {
        this.cardSymbols.forEach(element => {
          let cardStr =
            "<li class='card animated shake'><i class='" +
            element +
            "'></i></li>";
          this.cardList.push(cardStr);
        });
      }
    }
    // console.log(this.cardList);
    let shuffleCards = this.shuffle(this.cardList).join("");
    deckElment.innerHTML = shuffleCards;
  },

  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle: function(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },

  displayCard: function(cardElement) {
    cardElement.className += " open show";
  },

  hideCard: function(cardElement) {
    cardElement.classList.remove("open");
    cardElement.classList.remove("show");
  },

  recoverCardClick: function(cardElements) {
    cardElements.forEach(element => {
      element.classList.remove("disable-card-click");
    });
  },

  disableCardClick: function(cardElements) {
    cardElements.forEach(element => {
      element.className += " disable-card-click";
    });
  },

  //比较两个card
  compareTwoCardsIsEqual: function(card1, card2) {
    var symbol1 = card1.innerHTML;
    var symbol2 = card2.innerHTML;
    if (symbol1 === symbol2) {
      this.successMatches += 1;
      return true;
    }
    return false;
  },

  //计算星星
  calcStars: function(starElement) {
    switch (this.totalMoves) {
      case 11:
        this.totalStars -= 1;
        starElement.children[2].children[0].className = "fa fa-star-o";
        break;
      case 21:
        this.totalStars -= 1;
        starElement.children[1].children[0].className = "fa fa-star-o";
        break;
      default:
        break;
    }
  },

  //计算匹配次数
  calcMoves: function(movesElement) {
    this.totalMoves += 1;
    movesElement.innerHTML = this.totalMoves;
  },

  elapsedTime: (hour, min, sec, timeElement) => {
    return setInterval(() => {
      sec += 1;
      if (sec === 60) {
        min += 1;
        sec = 0;
      }
      if (min === 60) {
        hour += 1;
        min = 0;
      }
      timeElement.innerHTML = hour + ":" + min + ":" + sec;
    }, 1000);
  }
};
