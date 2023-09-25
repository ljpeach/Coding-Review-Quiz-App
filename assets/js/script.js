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
var scoreLink = document.getElementById("score-link");

var timerDisplay = document.getElementById("timer-display"); //span element that displays time left
var countdown = 60; //default time for timer. Will likely change to 15*questions.length.
var timeLeft; //time left on timer.
var timerInterval; //tracks the setIncrement call
var timerPenalty = 10; //num of seconds penalized for incorrect answer

var startSection = document.getElementById("start-menu");
var startButton = document.getElementById("start-button");

var questionSection = document.getElementById("question-box");
var questionField = document.getElementById("question");
var answerField = document.getElementById("answers").querySelectorAll("li");

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
    // questionSection.setAttribute("style", "display: none");
    endSection.setAttribute("style", "display: none");
    scoreSection.setAttribute("style", "display: none");
    changeActive(activeFrame); //display start on page
    getScores();
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

// question list event listener, use event.target to determine whether correct index was chosen.

function renderQuestion() {//Display question
    questionField.textContent = questions[currentQuestion].question;
    var ansOrder = [0, 1, 2, 3];
    shuffle(ansOrder);
    console.log(ansOrder);
    for (var i = 0; i < answerField.length; i++) {
        if (ansOrder[i] == 0) {
            answerField[i].textContent = questions[currentQuestion].answer;
        }
        else {
            answerField[i].textContent = questions[currentQuestion].incorrect[ansOrder[i] - 1];
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
    changeActive(scoreSection);
});

// High score related functions

returnButton.addEventListener("click", function () {
    changeActive(startSection);
});

clearButton.addEventListener("click", function () {
    highscores = [];
    setScores();
    renderScores();
});

function setScores() { } //set scores in local memory

function getScores() { } //get scores from local memory

function addScore(initial, score) { } //Add new score to score array, sort.
function renderScores() { } //render list of scores on high score page. 

function shuffle(shuffleArr) {
    for (var i = 0; i < shuffleArr.length; i++) {
        sourceIndex = Math.floor(Math.random() * shuffleArr.length);
        tempValue = shuffleArr[sourceIndex];
        shuffleArr[sourceIndex] = shuffleArr[i];
        shuffleArr[i] = tempValue;
    }
}

intit();