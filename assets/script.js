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

let highScoreButton = document.querySelector("#highScoreButton")


// was trying to remove the "on click function from html by adding event listener in for loop here. "
let buttons = document.querySelectorAll(".btn").length;
//for loop adding a click event to the answer buttons, then runs checkAnswer function
for (let i = 0; i < buttons ; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function() {
        checkAnswer()
    });
}


highScoreButton.addEventListener("click",showHighscore)
startQuizButton.addEventListener("click",startQuiz);

// variable declaring the questions objects array
let quizQuestions = [{
    question: "What does API stand for?",
    optionA: "Application Programming Iterator",
    optionB: "Anonymous Programming Integer",
    optionC: "Application Programming Integer",
    optionD: "Application Programming Interface",
    correctAnswer: "d"},
  {
    question: "Which of the following is a string?",
    optionA: "25",
    optionB: "[How are you?]",
    optionC: '"130"',
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

    //Function that generates the questions and pushes the text content while making sure the game over page is not displayed
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
    
    //conditional stating the user must enter initials to proceed, once they do, we can get their initials and score from local storage
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

//Add event listener to the "Try Again!" button that replays the quiz when clicked
let replay = document.querySelector("#tryAgain")
replay.addEventListener("click",replayQuiz)

let clear = document.querySelector("#clearHighscore")
clear.addEventListener("click",clearScore)

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
function checkAnswer(){
    // correct = quizQuestions[currentQuestionIndex].correctAnswer

    // if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
    //     score++;
    //     textPlace.innerText = "Let's go girls!"
    //     currentQuestionIndex++;
    //     generateQuestion()
       
       
    // }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
    //     currentQuestionIndex++;
    //     textPlace.innerText = "That don't impress me much."
    //     // if user answer is wrong, 10 seconds falls off the clock
    //     timeLeft -= 10
    //     generateQuestion();
    // }else{
    //     showScore();
    // }
    if (optionA.getAttribute("data-answer") === currentQuestion.correctAnswer) {
        textPlace.innerText = "Let's go girls!"
        score++
        currentQuestionIndex++;
        generateQuestion()
      } else {
        textPlace.innerText = "That don't impress me much."
        timerCount -= 10
      }

      if (optionB.getAttribute("data-answer") === currentQuestion.correctAnswer) {
        textPlace.innerText = "Let's go girls!"
        score++
        currentQuestionIndex++;
        generateQuestion()
      } else {
        textPlace.innerText = "That don't impress me much."
        timerCount -= 10
      }

      if (optionC.getAttribute("data-answer") === currentQuestion.correctAnswer) {
        textPlace.innerText = "Let's go girls!"
        score++
        currentQuestionIndex++;
        generateQuestion()
      } else {
        textPlace.innerText = "That don't impress me much."
        timerCount -= 10
      }

      if (optionD.getAttribute("data-answer") === currentQuestion.correctAnswer) {
        textPlace.innerText = "Let's go girls!"
        score++
        currentQuestionIndex++;
        generateQuestion()
      } else {
        textPlace.innerText = "That don't impress me much."
        timerCount -= 10
      }
    }






// let data = getAttribute("data-answer ")
// let answerValue = 
