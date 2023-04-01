var wordlist = ["laptop", "bottle", "tiger", "corruption", "palace", "rhythym", "relationship", "education", "calendar", "violin", "mirror", "curriculum", "party", "patience", "example"];
var timer = document.querySelector("#second");
var secondsLeft = timer.getAttribute("data-seconds");
var charList = [];
var blankList = [];
var chosenWord = document.querySelector("#chosen-word");
var blankWord = "";

function start() {
    var randomIndex = Math.floor(Math.random()* wordlist.length);
    var randomWord = wordlist[randomIndex];
    var chosenWordLength = randomWord.length;
    blankWord = "";
    
    for (var i = 0; i < charList.length; i++) {
        charList.pop();
        blankList.pop();
    }

    for (var i = 0; i < chosenWordLength; i++) {
        blankWord += "-";
        blankList.push("-");
        charList.push(randomWord[i]);
    }

    chosenWord.textContent = blankWord;
}

document.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("#start")) {
        start();
        setTimer();
    }
})

function setTimer() {
    secondsLeft = timer.getAttribute("data-seconds");
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;
        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            chosenWord.textContent = "You lost";
        }
    }, 1000)
}

document.addEventListener("keydown", function(event) {
    var element = event.target;
    var key = event.key.toLowerCase();
    checkLetter(key);
})

function checkLetter(key) {
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