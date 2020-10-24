// Variables to select HTML elements
let resultsEl = document.querySelector("#result");
let endQuizBtns = document.querySelector("#endQuizBtns");
let finalScoreEl = document.querySelector("#finalScore");
let gameoverDiv = document.querySelector("#gameover");
let questionsEl = document.querySelector("#questions");
let quizTimer = document.querySelector("#timer");
let highscoreContainer = document.querySelector("#highscoreContainer");
let startQuizButton = document.querySelector("#startbtn");
let startQuizEl = document.querySelector("#openingPage");
let quizBody = document.querySelector("#quiz");
let highscoreEl = document.querySelector("#highscorePage");
let highscoreDisplayScore = document.querySelector("#highscore-score");
let highscoreDisplayName = document.querySelector("#highscore-initials");
let submitScoreBtn = document.querySelector("#submitScore");
let highscoreInputName = document.querySelector("#initials");

let buttonA = document.querySelector("#a");
let buttonB = document.querySelector("#b");
let buttonC = document.querySelector("#c");
let buttonD = document.querySelector("#d");
let textPlace = document.querySelector("#answerText")


startQuizButton.addEventListener("click",startQuiz);

// variable declaring the questions array
let quizQuestions = [{
    question: "What does API stand for?",
    optionA: "application programming iterator",
    optionB: "anonymous programming integer",
    optionC: " application programming integer",
    optionD: "application programming interface",
    correctAnswer: "d"},
  {
    question: "Which of the following is a string?",
    optionA: "25",
    optionB: "[How are you?]",
    optionC: "“130”",
    optionD: "{My name is Lucah} ",
    correctAnswer: "c"},
   {
    question: "Which of the following commands puts an item at the end of an array?",
    optionA: "unshift",
    optionB: "push",
    optionC: "shift",
    optionD: "last",
    correctAnswer: "b"},
    {
    question: "What would the output be of 2 + 4 + “8” ?",
    optionA: "68",
    optionB: "248",
    optionC: "14",
    optionD: "32",
    correctAnswer: "a"},
    
    ];

    let finalQuestionIndex = quizQuestions.length;
    let currentQuestionIndex = 0;
    let timeLeft = 100;
    let timerInterval;
    let score = 0;
    let correct;

    //Function that generates the questions and pushes the text content 
function generateQuestion(){
    gameoverDiv.style.display = "none";
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
    gameoverDiv.style.display = "none";
    startQuizEl.style.display = "none";
    
 //timer to countdown when first questions starts
    timer = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timer);
          showScore();
        }
      }, 1000);
      generateQuestion();
    
      quizBody.style.display = "block";
}

//function that will display your score and ask for uer initials. 
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timer);
    highscoreInputName.value = "";
    finalScoreEl.textContent = "Woo! You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    //conditional stating the user must enter initials to proceed, once they do, we can get the initials and score from local storage
    if(highscoreInputName.value === "") {
        alert("We need your initials!");
        return false;
    }else{
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreEl.style.display = "block";
        endQuizBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

//function that generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Function that only displays the high score box and the buttons to retake the quiz/ clear scores
function showHighscore(){
    startQuizEl.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreEl.style.display = "block";
    highscoreContainer.style.display = "flex";
    endQuizBtns.style.display = "flex";

    generateHighscores();
}

//function to clear the high scores from local sotrage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//function to reset everything to take quiz again
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizEl.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
    textPlace.innerText = "";
    
}

// Funcion to check if the user answer is true or false
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        // alert("Let's go girls!");
        textPlace.innerText = "Let's go girls!"
        currentQuestionIndex++;
        generateQuestion();
       
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        // alert("That don't impress me much.")
        textPlace.innerText = "That don't impress me much."
        currentQuestionIndex++;
        // if answer is wrong, 10 seconds fall off the clock
        timeLeft -= 10
        generateQuestion();
      
    }else{
        showScore();
    }
}


