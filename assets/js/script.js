var questions = [{
    question: "",
    answer: "",
    incorrect: ["", "", ""]
},
{
    question: "",
    answer: "",
    incorrect: ["", "", ""]
},
{
    question: "",
    answer: "",
    incorrect: ["", "", ""]
},
{
    question: "",
    answer: "",
    incorrect: ["", "", ""]
}];

// Get different html sections to switch between sections, and other vital elements
var timerDisplay; //span element that displays time left
var countdown; //default time for timer
var timerIncrement; //tracks the setIncrement call
var timerPenalty; //num of seconds penalized for incorrect answer

var startSection;
var startButton;

var questionSection;
var questionField;
var answerField;

var endSection;
var initialField;
var submitButton;

var scoreSection;
var scoreList;
var returnButton;
var clearButton;

//Other vital variables
var activeFrame; //currently active section

function intit() { }//Start up tasks on site launch

// Functions for switching to given section

function startActive() { } //set the start screen as the active section

function questionActive() { } //set the quiz question screen as the active section

function endActive() { } //set the end screen as the active section

function scoreActive() { }//set the high score screen as the active section

// Start screen related functions

// start button event listener

// Question screen related functions

// question list event listener, use event.target to determine whether correct index was chosen.

function renderQuestion() { } //Display next question

function shuffleQuestions() { } //Reset order of questions in question list

function shuffleAnswers() { } //randomize order answers appear

// End screen related functions

// submit button event listener

// High score related functions

function setScores() { } //set scores in local memory

function getScores() { } //get scores from local memory

function addScore() { } //Add new score to score array, sort.
function renderScores() { } //render list of scores on high score page. 