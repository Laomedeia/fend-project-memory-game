export default {
  /*
 * Create a list that holds all of your cards
 */
  cardList: [
    "<li class='card animated shake'><i class='fa fa-diamond'></i></li>",
    "<li class='card animated shake'><i class='fa fa-paper-plane-o'></i></li>",
    "<li class='card animated shake'><i class='fa fa-anchor'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bolt'></i></li>",
    "<li class='card animated shake'><i class='fa fa-cube'></i></li>",
    "<li class='card animated shake'><i class='fa fa-leaf'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bicycle'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bomb'></i></li>",
    "<li class='card animated shake'><i class='fa fa-diamond'></i></li>",
    "<li class='card animated shake'><i class='fa fa-paper-plane-o'></i></li>",
    "<li class='card animated shake'><i class='fa fa-anchor'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bolt'></i></li>",
    "<li class='card animated shake'><i class='fa fa-cube'></i></li>",
    "<li class='card animated shake'><i class='fa fa-leaf'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bicycle'></i></li>",
    "<li class='card animated shake'><i class='fa fa-bomb'></i></li>"
  ],

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
    var shuffleCards = this.shuffle(this.cardList).join("");
    deckElment.innerHTML = shuffleCards;
    // console.log(shuffleCards);
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

  compareTwoCardsIsEqual: function(card1, card2) {
    var symbol1 = card1.innerHTML;
    var symbol2 = card2.innerHTML;
    if (symbol1 === symbol2) {
      this.successMatches += 1;
      return true;
    }
    return false;
  },

  calcStars: function(starElement) {
    switch (this.totalMoves) {
      case 11:
        this.totalStars -= 1;
        starElement.lastElementChild.firstChild.className = "fa fa-star-o";
        break;
      case 21:
        this.totalStars -= 1;
        starElement.children[1].firstChild.className = "fa fa-star-o";
        break;
      default:
        break;
    }
  },

  calcMoves: function(movesElement) {
    this.totalMoves += 1;
    movesElement.innerHTML = this.totalMoves;
  }
};
