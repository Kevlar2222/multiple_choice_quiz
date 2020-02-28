function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        document.getElementById("btn0").style.opacity = 1;
        document.getElementById("btn1").style.opacity = 1;
        document.getElementById("btn2").style.opacity = 1;
        document.getElementById("btn3").style.opacity = 1;
        this.score++;
        this.questionIndex++;
    }
    else {
        this.score--;
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("btn" + i);
            if(this.getQuestionIndex().isCorrectAnswer(choices[i])){
                element.style.opacity = 1;
            }
            else {
                element.style.opacity = 0.6;
            }
        }
    }   
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Correct: " + quiz.score + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/" + quiz.questions.length;"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("What grows on a tree?", ["Carrots", "Tigers","ˈsteləbæŋkʃɑːk", "Potatoes"], "ˈsteləbæŋkʃɑːk"),
    new Question("What grows in the ground?", ["Olives", "Potatoes", "Apples", "Bananas"], "Potatoes"),
    new Question("Which one is right?", ["Oraneges", "Oranges","Oranes", "Orranges"], "Oranges"),
    new Question("Where do bananas grow?", ["On a tree", "Under a tree", "In the ground", "In the zoo"], "On a tree"),
    new Question("Where do carrots grow?", ["On a tree", "In the sky", "In a book", "In the ground"], "In the ground")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();
