# JavaScript Code Quiz

This web application generates a timed javascript quiz. When the user clicks the button to start the quiz, the app displays the first question and a timer starts counting down from 100 seconds. Upon answering each question, the user will be alerted if the answer was correct or incorrect, then the next question will be displayed. 

For any incorrect answer, time left is deducted by 10 seconds. If the quiz is not completed within the elotted time given, the quiz will end. Upon completetion, the app will display the user's score and ask for their initials. 

When they press submit, their initials will show up with their score. They then have the option to clear out the scores and/or retake the quiz! 

## Under the Hood

The directory for this app includes an HTML, CSS and JS file. I used one HTML file and called for certain elements in different functions in my JS file to be displayed or not displayed at certain times (style.display=""). This way, it appears the user is going to a new page after every prompt, but they aren't! The HTML is set up with some different divs and button elements with classes and id's to be called upon in the linked JS and CSS files. 

I found out how you can add onClick functions to elements in your HTML and run it in your javascript. I used that method for my answer options buttons. It helped compress my function to check answers in my JS pretty nicely. 

I used only CSS to style the app. Mostly targeting elements by id. I played around a lot to get a nice clean looking app. I provided some links below in my "credits" section of some cool stuff I learned with styling. 

The JS file is loaded up with multiple variables assigned to query selectors and some other global variables as well. There are functions for pretty much everything the application is doing. Starting the quiz, staring the timer, generating the questions, checking the answer input and responding right or wrong, sending and recieving initials and high score from local storage, etc.. Though, I added the onCLick function in my HTML for the answer option buttons, I added click event listeners with the proper functions to all the rest of my buttons in the JS file. There was really no rhyme or reason for that, other than trying out new things. 

<iframe src="https://drive.google.com/file/d/1-n2Y1dFzQFBNZayrGxA7EzdHUqqkJT42/preview" width="640" height="480"></iframe>
 
## Getting Started

This application runs as is in the browser. No downloads or installs needed.

## Credits

I found a lot of useful code to help me along the way!

Styling resources: <br>
[w3schools Display Properties](https://www.w3schools.com/cssref/pr_class_display.asp) <br>
[w3schools Button Fun](https://www.w3schools.com/css/css3_buttons.asp) <br>
[Awesome Color Palettes](https://flatuicolors.com/) <br>

Functionality resources: <br>
[HTML "onclick" events](https://www.w3schools.com/jsref/event_onclick.asp) <br>
[JS Quiz Builder](https://www.sitepoint.com/simple-javascript-quiz/) <br>
[JS Quiz Builder](https://codepen.io/boopalan002/pen/yKZVGa) <br>
[JS Quiz Builder](https://simplestepscode.com/javascript-quiz-tutorial/) <br>


## Deploy Application 
[Are you up for the test?!](https://lucahendicott.github.io/code-quiz/)

