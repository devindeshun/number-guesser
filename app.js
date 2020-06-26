let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`You must enter a number between ${min} and ${max}.`, "red");
  } else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct!`);
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false, `Game Over! The correct number was ${winningNum}!`);
      guessBtn.value = "Play Again";
      guessBtn.className += "play-again";
    } else {
      gameOver(false, `Guess is not correct. ${guessesLeft} tries remaining.`);
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessesLeft === 0
    ? (guessInput.disabled = true)
    : (guessInput.disabled = won);
  guessInput.style.borderColor = color;
  setMessage(msg, color);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
