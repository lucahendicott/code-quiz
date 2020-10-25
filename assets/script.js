// Variables to select HTML elements
let resultsEl = document.querySelector("#result");
let endBtn = document.querySelector("#endBtn");
let finalScoreEl = document.querySelector("#finalScore");
let gameOver = document.querySelector("#gameover");
let questionsEl = document.querySelector("#questions");
let quizTimer = document.querySelector("#timer");
let highscoreContainer = document.querySelector("#highscoreContainer");
let startQuizButton = document.querySelector("#startbtn");
let startQuizEl = document.querySelector("#openingPage");
let quizBody = document.querySelector("#quiz");
let replay = document.querySelector("#tryAgain")
let clear = document.querySelector("#clearHighscore")
let highscoreEl = document.querySelector("#highscorePage");
let highscoreDisplayScore = document.querySelector("#highScore");
let highscoreName = document.querySelector("#scoreInitials");
let submitScoreBtn = document.querySelector("#submitScore");
let highscoreInputName = document.querySelector("#initials");
let buttonA = document.querySelector("#a");
let buttonB = document.querySelector("#b");
let buttonC = document.querySelector("#c");
let buttonD = document.querySelector("#d");
let textPlace = document.querySelector("#answerText");
let highScoreButton = document.querySelector("#highScoreButton");

highScoreButton.addEventListener("click",showHighscore);
startQuizButton.addEventListener("click",startQuiz);

//Add event listener to the "Try Again!" button so that it replays the quiz when clicked and clears the timer text
replay.addEventListener("click",function(){
    replayQuiz()
    quizTimer.innerText = ""
})

clear.addEventListener("click",clearScore)

// variable declaring the questions objects array
let quizQuestions = [{
    question: 'How would you write "Shania Twain!" in an alert box?',
    optionA: 'alertBox("Shania Twain!")',
    optionB: 'alert("Shania Twain!")',
    optionC: 'prompt("Shania Twain!")',
    optionD: 'alert(Shania Twain!)',
    correctAnswer: "b"},
    {
    question: "What does API stand for?",
    optionA: "Application Programming Iterator",
    optionB: "Anonymous Programming Integer",
    optionC: "Application Programming Integer",
    optionD: "Application Programming Interface",
    correctAnswer: "d"},
    {
    question: "Which of the following commands puts an item at the end of an array?",
    optionA: "unshift",
    optionB: "push",
    optionC: "shift",
    optionD: "last",
    correctAnswer: "b"},
    {
    question: "What would the expected output be of (2 + 4 + “8”) ?",
    optionA: "68",
    optionB: "248",
    optionC: "14",
    optionD: "32",
    correctAnswer: "a"},
    {
    question: "Where in your HTML do you link your JavaScript file?",
    optionA: "Inside the <head>",
    optionB: "Inside the <title>",
    optionC: "Inside the <body>",
    optionD: "You don't link it in your HTML",
    correctAnswer: "c"},
    {
    question: "Which characters go immediately after a function?",
    optionA: "()",
    optionB: "[]",
    optionC: "{}",
    optionD: "||",
    correctAnswer: "a"},
    {
    question: "What is the syntax for something is 'not equal to'?",
    optionA: "===",
    optionB: "+=",
    optionC: "==",
    optionD: "!==",
    correctAnswer: "d"},
    {
    question: "What are if, else if and else statements called?",
    optionA: "Functions",
    optionB: "Conditionals",
    optionC: "Loops",
    optionD: "Event Listeners",
    correctAnswer: "b"},
    {
    question: "What function can turn a string into a number?",
    optionA: "typeOf.number()",
    optionB: "typeOf(number)",
    optionC: "parseInt()",
    optionD: "generateNumber()",
    correctAnswer: "c"},
    {
    question: "Which of the following is a string?",
    optionA: "25",
    optionB: "[How are you?]",
    optionC: '"Shania Twain"',
    optionD: "{My name is Lucah} ",
    correctAnswer: "c"},
    ];

    let finalQuestionIndex = quizQuestions.length;
    let currentQuestionIndex = 0;
    let timeLeft = 100;
    let timerInterval;
    let score = 0;
    let correct;

    //Function that generates the questions and pushes the text content while making sure the game over page is not displayed
function generateQuestion(){

    gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.textContent = currentQuestion.question;
    buttonA.textContent = currentQuestion.optionA;
    buttonB.textContent = currentQuestion.optionB;
    buttonC.textContent = currentQuestion.optionC;
    buttonD.textContent = currentQuestion.optionD;
};

//function to show only the quiz questions once start button is clicked
function startQuiz(){

    gameOver.style.display = "none";
    startQuizEl.style.display = "none";
    
 //timer to countdown when first questions starts
    timer = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft + "s"
    
        if(timeLeft <= 0) {
          clearInterval(timer)
          showScore();
          
        }
      }, 1000);

      generateQuestion();
    
      quizBody.style.display = "inline-block";
}

//function that will display your score and ask for uer initials. 
function showScore(){

    quizBody.style.display = "none"
    gameOver.style.display = "flex";
    clearInterval(timer);
    highscoreInputName.value = "";
    finalScoreEl.textContent = "Woo! You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    //conditional stating the user must enter initials to proceed, once they do, we can get their initials and score from local storage
    if(highscoreInputName.value === "") {
        alert("We need your initials!");
        return false;
    }
    else{
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOver.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreEl.style.display = "block";
        endBtn.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }  
});

//function that generates a new high score list from local storage
function generateHighscores(){

    highscoreName.textContent = "";
    highscoreDisplayScore.textContent = "";

    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    for (i=0; i<highscores.length; i++){
        
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Function that only displays the high score box and the buttons to retake the quiz/ clear scores
function showHighscore(){

    highscoreEl.style.display = "block";
    startQuizEl.style.display = "none"
    gameOver.style.display = "none";
    endBtn.style.display = "flex";
    highscoreContainer.style.display = "flex";

    generateHighscores();
}

//function to clear the high scores from local sotrage
function clearScore(){

    window.localStorage.clear();
    highscoreName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//function to reset everything to take quiz again
function replayQuiz(){

    startQuizEl.style.display = "flex";
    highscoreContainer.style.display = "none";
    gameOver.style.display = "none";
    textPlace.innerText = "";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

// Funcion to check if the user answer is true or false and generate next questions from index unless it's the end of the quiz.
function checkAnswer(answer){

    correct = quizQuestions[currentQuestionIndex].correctAnswer

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        textPlace.innerText = "Let's go girls!"
        currentQuestionIndex++;
        generateQuestion()
    }
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        textPlace.innerText = "That don't impress me much."
        // if user answer is wrong, 10 seconds falls off the clock
        timeLeft -= 10
        generateQuestion();
    }
    else{
        showScore();
    }
}