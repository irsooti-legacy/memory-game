(function memoryGame(that) {
  var $game = document.getElementById('game');
  var $win = document.getElementById('win');
  var $flippedCard = null;

  var flippedCard = null;
  var cardsPairToFlip;

  // Non cheattare.
  that.addEventListener('selectstart', function(evt) {
    evt.preventDefault();
  });

  var generateCardValues = function() {
    var sequentialValues = ['💋', '🚦', '⚽', '📦', '😊', '👮‍'];
    var sequentialPairs = sequentialValues.concat(sequentialValues);
    var randomValues = randomizeValues(sequentialPairs);

    return randomValues;
  };

  var cardSelectorHandler = function(value) {
    switch (flippedCard) {
      case null:
        flippedCard = value;
        return 'FLIPPED';

      default:
        var status = '';
        if (flippedCard == value) {
          console.log(value, flippedCard, 'matched');

          status = 'MATCHED';
        } else {
          console.log(value, flippedCard, 'mismatch!');
          status = 'MISMATCHED';
        }

        flippedCard = null;

        return status;
    }
  };

  function randomizeValues(seqVals) {
    var vals = seqVals.concat();
    var randomVals = [];

    seqVals.forEach(function() {
      var randomIndex = Math.floor(Math.random() * vals.length);
      randomVals.push(vals.splice(randomIndex, 1)[0]);
    });

    return randomVals;
  }

  function renderCards($game, values) {
    $game.innerHTML = null;
    values.forEach(function(value) {
      var $card = document.createElement('div');
      $card.innerHTML = value;
      $card.classList.add('card');
      $card.onclick = function(evt) {
        var status = cardSelectorHandler(evt.target.innerText);

        switch (status) {
          case 'MISMATCHED':
            $flippedCard.classList.remove('FLIPPED');
            break;
          case 'MATCHED':
            if (evt.target.classList.contains('FLIPPED')) {
              $flippedCard.classList.remove('FLIPPED');
              break;
            }

            isGameFinished();

            evt.target.classList.add('MATCHED');
            $flippedCard.classList.add('MATCHED');
            break;

          case 'FLIPPED':
            evt.target.classList.add('FLIPPED');
            $flippedCard = evt.target;
            break;
        }
      };

      $game.appendChild($card);
    });
  }

  function renderVictory() {
    $win.classList.add('really');
  }

  function isGameFinished() {
    cardsPairToFlip--;
    if (cardsPairToFlip === 0) {
      renderVictory();
    }
  }

  that.startMemoryGame = function() {
    var randomValues = generateCardValues();
    cardsPairToFlip = randomValues.length / 2;

    renderCards($game, randomValues);
  };
})(this);

startMemoryGame();
