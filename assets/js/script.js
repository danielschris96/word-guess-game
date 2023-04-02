var wordlist = ["laptop", "bottle", "tiger", "corruption", "palace", "rhythym", "relationship", "education", "calendar", "violin", "mirror", "curriculum", "party", "patience", "example"];
var timer = document.querySelector("#second");
var secondsLeft = timer.getAttribute("data-seconds");
var wins = document.querySelector("#current-wins");
var losses = document.querySelector("#current-losses");
var charList = [];
var blankList = [];
var chosenWord = document.querySelector("#chosen-word");
var blankWord = "";
var randomWord = "";
var continueListening = false;
var lossCount = 0;
var winCount = 0;
var scores = {
    wins: 0,
    losses: 0
}
var letterList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var scoreHistory = JSON.parse(localStorage.getItem("scoresHistory"));
if(scoreHistory !== null){
    wins.textContent = scoreHistory.wins;
    losses.textContent = scoreHistory.losses;
    lossCount = scoreHistory.losses;
    winCount = scoreHistory.wins;
}
else{
    wins.textContent = 0; 
    losses.textContent = 0; 
    lossCount = 0;
    winCount = 0;
}

function start() {
    var randomIndex = Math.floor(Math.random()* wordlist.length);
    randomWord = wordlist[randomIndex];
    var chosenWordLength = randomWord.length;
    blankWord = "";
    charList = [];
    blankList =[];

    for (var i = 0; i < chosenWordLength; i++) {
        blankWord += "-";
        blankList.push("-");
        charList.push(randomWord[i]);
    }

    chosenWord.textContent = blankWord;
    continueListening = true;
}

document.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("#start")) {
        start();
        setTimer();
    }
    if (element.matches("#reset")) {
        resetInfo();
    }
})

function setTimer() {
    secondsLeft = parseInt(timer.getAttribute("data-seconds"));
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            if(blankWord === randomWord)
            {
                winCount++;
                wins.textContent = winCount;
                chosenWord.textContent = "You Won!";
                continueListening = false;
            }
            else{
                lossCount++;
                losses.textContent = lossCount;
                chosenWord.textContent = "You lost!"; 
                continueListening = false;      
            }
        }
        else{
            if(blankWord === randomWord)
            {
                clearInterval(timeInterval);
                winCount++;
                wins.textContent = winCount;
                chosenWord.textContent = "You Won!";
                continueListening = false;
            }
        }
        scores.wins = winCount;
        scores.losses = lossCount;
        localStorage.setItem("scoresHistory", JSON.stringify(scores));

    }, 1000)
}

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    var element = event.target;
    var key = event.key.toLowerCase();
    console.log(continueListening);
    if (continueListening){
        checkLetter(key);
    }
})

function checkLetter(key) {
    if (letterList.indexOf(key) !== -1) {
        for (var i = 0; i < charList.length; i++) {
            if (charList[i] === key) {
                blankList[i] = key;
            }
    
        }
        blankWord = "";
        for (var i = 0; i < blankList.length; i++) {
            blankWord += blankList[i];
        }
        chosenWord.textContent = blankWord;
    }
    
}

function resetInfo(){
    wins.textContent = 0; 
    losses.textContent = 0; 
    lossCount = 0;
    winCount = 0;
    localStorage.clear();
    timer.textContent = "0";
}
