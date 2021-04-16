/*
Game Functions
- Player must guess a number btw a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loss
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});
//Listen for guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
    } 
// check if won
if (guess === winningNum){
    gameOver(true, `${winningNum} is correct! YOU ROCK`);
} else {
    //wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
        gameOver(false, `Game over Sucker. The correct number was ${winningNum}`);
    } else {
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left `, 'red' );
        guessInput.value = '';
    }
}
});

// Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color; 
    setMessage(msg);

    //Play again

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min)+min);

}
//setMessage
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}