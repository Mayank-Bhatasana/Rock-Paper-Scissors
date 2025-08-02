class choice{
    name;
    botChoice;
    userChoice;
    didUserWins;
    userScore = 0;
    botScore = 0;
    choices = {
        1 : "rock",
        2 : "paper",
        3 : "scissors",
    }

    getWinner = {
        'win': ["rock" , "scissors"],
        'win2' : ["paper" , "rock"],
        'win3' : ["scissors" , "paper"],
    }

    greet(){
        this.name = prompt("What is your name?");
        console.log(`Welcome to the rock, paper and scissors games ` + this.name +"!!");
        console.log(this.botChoice);
    }

    getUsersChoice(){
        return this.choices[parseInt(prompt(`What is your choice ${this.name}?
        1)Rock
        2)Paper
        3)scissors
        `))];
    }

    hasArrayValue = function (obj, target) {
        return Object.values(obj).some(arr =>
            arr.length === target.length &&
            arr.every((item, index) => item === target[index])
        );
    }

    getComputerChoice = function (){
        return this["choices"][Math.ceil(Math.random() * 3)];
    }

    announceWinner() {
        if (this.userChoice === this.botChoice) {
            console.log(`It's a tie!`);
        }
        else {
            if (this.didUserWins) {
                console.log("You won!");
                console.log(this.userChoice, this.botChoice);
                this.userScore++;
            } else {
                console.log("You lose!");
                console.log(this.userChoice, this.botChoice);
                this.botScore++;
            }
        }

    }

    /*
    * return {int}
    * */
    whoWon = function(){

        return this.hasArrayValue(this.getWinner, [this.userChoice, this.botChoice])
    }
}

const user = new choice();
user.greet();

while(true){
    user.botChoice = user.getComputerChoice()
    user.userChoice = user.getUsersChoice();
    user.didUserWins = user.whoWon();
    user.announceWinner();

    const ans = prompt("do you want to play (Y)es or (N)o?");
    if (ans === 'N' || ans === 'n') break;
}

console.log(`\n\n\nAnd the winner is: ${user.userScore > user.botScore ? user.name : "bot"} 🎉`);