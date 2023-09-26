var questions = [{
    question: "Question 1",
    answer: "answer",
    incorrect: ["wrong1", "wrong2", "wrong3"]
},
{
    question: "Question 2",
    answer: "answer",
    incorrect: ["wrong1", "wrong2", "wrong3"]
},
{
    question: "Question 3",
    answer: "answer",
    incorrect: ["wrong1", "wrong2", "wrong3"]
},
{
    question: "Question 4",
    answer: "answer",
    incorrect: ["wrong1", "wrong2", "wrong3"]
}];

// Get different html sections to switch between sections, and other vital elements
var header = document.querySelector("header");
var scoreLink = document.getElementById("score-link");

var timerDisplay = document.getElementById("timer-display"); //span element that displays time left
var countdown = 60; //default time for timer. Will likely change to 15*questions.length.
var timeLeft; //time left on timer.
var timerInterval; //tracks the setIncrement call
var timerPenalty = 15; //num of seconds penalized for incorrect answer

var startSection = document.getElementById("start-menu");
var startButton = document.getElementById("start-button");

var questionSection = document.getElementById("question-box");
var questionField = document.getElementById("question");
var answerOl = document.getElementById("answers");
var answerField = answerOl.querySelectorAll("li");
var feedbackField = document.getElementById("feedback");
var feedbackInterval; //tracks interval for feedback disappearing

var endSection = document.getElementById("end-screen");
var scoreDisplay = document.getElementById("score-display");
var initialField = document.getElementById("initials");
var submitButton = document.getElementById("submit-initial");

var scoreSection = document.getElementById("score-screen");
var scoreArray = document.getElementById("highscores");
var returnButton = document.getElementById("return-button");
var clearButton = document.getElementById("clear-button");

//Other vital variables
var activeFrame; //currently active section
var highscores = []; //array of highscores
var currentQuestion; //tracks current question.

function intit() { //Start up tasks on site launch
    activeFrame = startSection;
    questionSection.setAttribute("style", "display: none");
    endSection.setAttribute("style", "display: none");
    scoreSection.setAttribute("style", "display: none");
    feedbackField.setAttribute("style", "display: none");
    changeActive(activeFrame); //display start on page
    getScores();
    renderScores();
}

// Functions for switching to given section

function changeActive(targetSection) { //make target section the active section.
    activeFrame.setAttribute("style", "display: none");
    activeFrame = targetSection;
    targetSection.setAttribute("style", "display: block");
}

// Start screen related functions
scoreLink.addEventListener("click", function () {
    changeActive(scoreSection);
    timerDisplay.textContent = 0;
    clearInterval(timerInterval);
    header.setAttribute("style", "visibility: hidden");
})

startButton.addEventListener("click", function () {
    shuffleQuestions();
    currentQuestion = 0;
    renderQuestion();

    changeActive(questionSection);
    timeLeft = countdown;
    timerDisplay.textContent = timeLeft;
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            timeLeft = 0; //for if timeLeft is lower than 0 due to point deduction.
            clearInterval(timerInterval);
            scoreDisplay.textContent = timeLeft;
            changeActive(endSection);
        }
        timerDisplay.textContent = timeLeft;
    }, 1000)
});

// Question screen related functions

answerOl.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() != 'li') {
        return;
    }
    if (event.target.getAttribute("data-valid") == 'true') {
        clearFeedback()
        feedback("Correct");

    }
    else if (event.target.getAttribute("data-valid") == 'false') {
        clearFeedback()
        feedback("Wrong");
        timeLeft -= timerPenalty;
        timerDisplay.textContent = timeLeft;
    }
    currentQuestion += 1;
    if (currentQuestion == questions.length) {
        clearInterval(timerInterval);
        scoreDisplay.textContent = timeLeft;
        changeActive(endSection);
    }
    else {
        renderQuestion();
    }
});

function feedback(result) {
    feedbackField.setAttribute("style", "display: block");
    feedbackField.textContent = result;
    feedbackInterval = setInterval(clearFeedback, 50);
}

function clearFeedback() {
    clearInterval(feedbackInterval);
    feedbackField.setAttribute("style", "display: none");
}


function renderQuestion() {//Display question
    questionField.textContent = questions[currentQuestion].question;
    var ansOrder = [0, 1, 2, 3];
    shuffle(ansOrder);
    for (var i = 0; i < answerField.length; i++) {
        if (ansOrder[i] == 0) {
            answerField[i].textContent = questions[currentQuestion].answer;
            answerField[i].setAttribute("data-valid", "true");
        }
        else {
            answerField[i].textContent = questions[currentQuestion].incorrect[ansOrder[i] - 1];
            answerField[i].setAttribute("data-valid", "false");
        }
    }
}

function shuffleQuestions() { //Reset order of questions in question list
    shuffle(questions);
}

// End screen related functions

// submit button event listener
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    addScore(initialField.value, timeLeft);
    initialField.value = "";
    timerDisplay.textContent = 0;
    header.setAttribute("style", "visibility: hidden");
    setScores();
    renderScores();
    changeActive(scoreSection);
});

// High score related functions

returnButton.addEventListener("click", function () {
    changeActive(startSection);
    header.setAttribute("style", "visibility: visible");
});

clearButton.addEventListener("click", function () {
    highscores = [];
    setScores();
    renderScores();
});

function setScores() { //set scores in local memory
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function getScores() { //get scores from local memory
    highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores == null) {
        highscores = [];
    }
}

function addScore(initial, score) { //Add new score to score array, sort.
    if (initial == "") {
        initial = "N/A";
    }
    highscores.push({ initial: initial, score: score });
    highscores.sort(function (a, b) {
        if (a.score == b.score) {
            return 0;
        }
        else if (a.score > b.score) {
            return 1;
        }
        else {
            return -1;
        }
    });
}
function renderScores() { //render list of scores on high score page. 
    var rankings = scoreArray.querySelectorAll("li");
    if (rankings.length > highscores.length) {//will only occur after clear scores. Wipe all.
        for (var i = 0; i < rankings.length; i++) {
            rankings[i].remove();
        }
    }
    else if (rankings.length == highscores.length) {
        for (var i = 0; i < rankings.length; i++) {
            rankings[i].textContent = `${highscores[i].initial} - ${highscores[i].score}`;
        }
    }
    else {
        var i;
        for (i = 0; i < rankings.length; i++) {
            rankings[i].textContent = `${highscores[i].initial} - ${highscores[i].score}`;
        }
        for (i = i; i < highscores.length; i++) {
            var newScore = document.createElement("li");
            newScore.textContent = `${highscores[i].initial} - ${highscores[i].score}`;
            scoreArray.append(newScore);
        }
    }
}

function shuffle(shuffleArr) {
    for (var i = 0; i < shuffleArr.length; i++) {
        sourceIndex = Math.floor(Math.random() * shuffleArr.length);
        tempValue = shuffleArr[sourceIndex];
        shuffleArr[sourceIndex] = shuffleArr[i];
        shuffleArr[i] = tempValue;
    }
}

intit();