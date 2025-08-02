const userScore = document.querySelector('#user-score');
const computerScore = document.querySelector('#computer-score');
const numOfTies = document.querySelector('#the-number-of-tie');
const displayAnswer = document.querySelector('.answer');
const selectedOption = document.querySelector('.option');
const restartButton = document.querySelector('#restart');
const showHistoryButton = document.querySelector('#showHistory');
const modal = document.querySelector('#parModal');
const showStats = document.querySelector('#showStats');

let closeBtn;
let history = [];
let round = 0;


// show the history

// get the computer choice when the user click on the options
const getComputerChoice = function () {
  const choices = {
    1: "rock",
    2: "paper",
    3: "scissors",
  }
  return choices[Math.ceil(Math.random() * 3)];
}

const displayClassRemove = function () {
  displayAnswer.classList.remove('win');
  displayAnswer.classList.remove('lose');
  displayAnswer.classList.remove('tie');
}

const resetTheScore = function () {
  userScore.textContent = 0;
  numOfTies.textContent = 0;
  computerScore.textContent = 0;
  round = 0;
  history = [];
}
resetTheScore();

restartButton.addEventListener('click', function () {
  displayClassRemove();
  displayAnswer.textContent = `Make your choice!`;
  resetTheScore()
  document.getElementById('user-choice-img').src = `img/question-mark.png`;
  document.getElementById('computer-choice-png').src = `img/question-mark.png`;
});


// get the data from local storage
const storedUserData = localStorage.getItem('user')

// check if there is data or not
if (storedUserData) {
  const userData = JSON.parse(storedUserData)
  // You can use userData here...
  userScore.textContent = userData.userScore;
  computerScore.textContent = userData.computerScore;
  numOfTies.textContent = userData.numOfTies;
  history = history.concat(userData.history);
  round = Number(userData.round);

  displayAnswer.classList.add(userData.lastChoice.resColor);
  displayAnswer.textContent = userData.lastChoice.result;

  // change the hand symbol
  document.getElementById('user-choice-img').src = `img/${userData.lastChoice.userChoice}.png`;
  document.getElementById('computer-choice-png').src = `img/${userData.lastChoice.computerChoice}.png`;
}


// store the data when the user click on the refresh
window.addEventListener("beforeunload", function(e){
  const scoreData = {
    userScore: userScore.textContent,
    computerScore: computerScore.textContent,
    numOfTies: numOfTies.textContent,
    history: history,
    round: round,
    lastChoice: history.at(-1),
  }
  localStorage.setItem('user', JSON.stringify(scoreData));
});



selectedOption.addEventListener('click', function (e) {
  const storeInHistory = function (result, resAns) {
    round++;
    history.push({
      round,
      userChoice,
      computerChoice,
      result: result,
      resColor: resAns,
      timestamp: new Date().toISOString()
    });
  }
  // Get users choice
  const userChoice = e.target.closest('.hoverImg')?.dataset.choice;

  // return if the user did not select the option
  if (!userChoice) return;

  //get the computer choice just as the use select the option
  const computerChoice = getComputerChoice();

  // remove the class before add the new class / color
  displayClassRemove();

  // conclude who won

  // both have the same answer it's a tie
  if (computerChoice === userChoice) {
    //make the num of ties a number
    numOfTies.textContent = 1 + Number(numOfTies.textContent);

    // change the color and the text
    displayAnswer.classList.add('tie');
    displayAnswer.textContent = `It's tie`;

    storeInHistory(displayAnswer.textContent, `tie`);
  }

  // the user won
  else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    userScore.textContent = 1 + Number(userScore.textContent)

    // change the color and the text
    displayAnswer.classList.add('win');
    displayAnswer.textContent = `You win!`

    storeInHistory(displayAnswer.textContent, `win`);
  }

  // the computer won
  else {
    computerScore.textContent = 1 + Number(computerScore.textContent)

    // change the color and the text
    displayAnswer.classList.add('lose');
    displayAnswer.textContent = `Computer win!`

    storeInHistory(displayAnswer.textContent, `lose`);
  }


  // change the hand symbol
  document.getElementById('user-choice-img').src = `img/${userChoice}.png`;
  document.getElementById('computer-choice-png').src = `img/${computerChoice}.png`;
})


showHistoryButton.addEventListener('click', (e) => {
  const blurBackground = document.querySelector('.blurBackground');
  blurBackground.classList.toggle('hidden');
  let HTMLmarkup = `
       <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2 id="modal-title">Game History</h2>
            <div id="modal-body"></div>  
        `
  HTMLmarkup += `
    <table class="history-table">
        <thead>
            <tr>
                <th>Round</th>
                <th>Your Choice</th>
                <th>Computer's Choice</th>
                <th>Result</th>
            </tr>
        </thead>
    <tbody>
  `
  history.forEach((item) => {
    HTMLmarkup += `
    <tr class="${item.resColor}">
        <td>${item.round}</td>
        <td>${item.userChoice}</td>
        <td>${item.computerChoice}</td>
        <td>${item.result}</td>
    </tr>
              `
  })
  HTMLmarkup += `
          </tbody>    
        </div>
       </div>
  `
  modal.innerHTML += HTMLmarkup;
  closeBtn = document.querySelector('.close-btn')

  const closeModal = function () {
    modal.innerHTML = '';
    blurBackground.classList.toggle('hidden');
  }


  // close the btn if the user click on the close button / x mark
  closeBtn.addEventListener('click', (e) => {
    closeModal();
  })
  // close the button if the user click anywhere outside modal-content
  document.querySelector('.modal').addEventListener('click', (e) => {
    if (e.target.closest('.modal-content') === null)
      closeModal();
  })

  //  close the modal if hte user press Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !blurBackground.classList.contains('hidden')) {
      closeModal();
    }
  })
})

showStats.addEventListener('click', function (e) {

  const blurBackground = document.querySelector('.blurBackground');
  blurBackground.classList.toggle('hidden');
  let markUp = `
      <div id="modal" class="modal">
        <div class="modal-content"> 
        <span class= "close-btn" >×</span>
      <h2 id="modal-title">Game Statistics</h2>
      <div id="modal-body">
        <div class="stats-container">
          <div class="stat-item">
            <span class="stat-label">Rounds Played:</span>
            <span class="stat-value">${round}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Your Score:</span>
            <span class="stat-value">${userScore.textContent}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Computer Score:</span>
            <span class="stat-value">${computerScore.textContent}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Ties:</span>
            <span class="stat-value">${numOfTies.textContent}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Win Percentage:</span>
            <span class="stat-value">${(((userScore.textContent + 0.5 * numOfTies.textContent)/round) * 10).toFixed(2)}</span>
          </div>
        </div>
      </div>
      </div>
      </div>
      
  `

  modal.innerHTML += markUp;
  closeBtn = document.querySelector('.close-btn')

  const closeModal = function () {
    modal.innerHTML = '';
    blurBackground.classList.toggle('hidden');
  }


  // close the btn if the user click on the close button / x mark
  closeBtn.addEventListener('click', (e) => {
    closeModal();
  })
  // close the button if the user click anywhere outside modal-content
  document.querySelector('.modal').addEventListener('click', (e) => {
    if (e.target.closest('.modal-content') === null)
      closeModal();
  })

  //  close the modal if hte user press Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !blurBackground.classList.contains('hidden')) {
      closeModal();
    }
  })
})
