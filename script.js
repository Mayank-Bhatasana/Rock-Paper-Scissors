const userScore = document.querySelector('#user-score');
const computerScore = document.querySelector('#computer-score');
const numOfTies = document.querySelector('#the-number-of-tie');
const displayAnswer = document.querySelector('.answer');
const selectedOption = document.querySelector('.option');
const restartButton = document.querySelector('#restart');

const history = {

}

// get the computer choice when the user click on the options
const getComputerChoice = function (){
  const choices = {
    1 : "rock",
    2 : "paper",
    3 : "scissors",
  }
  return choices[Math.ceil(Math.random() * 3)];
}

const displayClassRemove = function (){
  displayAnswer.classList.remove('win');
  displayAnswer.classList.remove('lose');
  displayAnswer.classList.remove('tie');
}

const resetTheScore = function (){
  userScore.textContent = 0;
  numOfTies.textContent = 0;
  computerScore.textContent = 0;
}
resetTheScore();

restartButton.addEventListener('click', function () {
  displayClassRemove();
  displayAnswer.textContent = `Make your choice!`;
  resetTheScore()
  document.getElementById('user-choice-img').src = `img/question-mark.png`;
  document.getElementById('computer-choice-png').src = `img/question-mark.png`;
});


selectedOption.addEventListener('click', function (e) {
  // Get users choice
  const userChoice = e.target.closest('.hoverImg') ?.dataset.choice;

  // return if the user did not select the option
  if(!userChoice) return;

  //get the computer choice just as the use select the option
  const computerChoice = getComputerChoice();

  // remove the class before add the new class / color
  displayClassRemove();

  // conclude who won

  // both have the same answer it's a tie
  if(computerChoice === userChoice){
    //make the num of ties a number
    numOfTies.textContent = 1 + Number(numOfTies.textContent);

    // change the color and the text
    displayAnswer.classList.add('tie');
    displayAnswer.textContent = `It's tie`;
  }

  // the user won
  else if(
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ){
    userScore.textContent = 1 + Number(userScore.textContent)

    // change the color and the text
    displayAnswer.classList.add('win');
    displayAnswer.textContent = `You win!`
  }

  // the computer won
  else{
    computerScore.textContent = 1 + Number(computerScore.textContent)

    // change the color and the text
    displayAnswer.classList.add('lose');
    displayAnswer.textContent = `Computer win!`
  }


  // change the hand symbol
  document.getElementById('user-choice-img').src = `img/${userChoice}.png`;
  document.getElementById('computer-choice-png').src = `img/${computerChoice}.png`;
  console.log(userChoice, computerChoice);
})
