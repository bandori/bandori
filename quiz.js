//variables

var question = new Array();
var answer1 = new Array();
var answer2 = new Array();
var answer3 = new Array();
var answer4 = new Array();
var questionImage = new Array();

var quiz = new Array();
var randomQuestion;
var answers = [];
var currentScore = 0;


$(document).ready(function(){
  var ajaxRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index){

        quiz[index] = new Question(data[index].question, data[index].questionImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)
        //alert(quiz[index].question);

        //question[index] = data[index].question;
        //answer1[index] = data[index].answer1
        //answer2[index] = data[index].answer2
        //answer3[index] = data[index].answer3
        //answer4[index] = data[index].answer4
      });
    }
  })

  $.when(ajaxRequest).done(function(){
    btnProvideQuestion();
  });
});

document.addEventListener("DOMContentLoaded", function(event) { 
});

function Question(question,questionImage,rightAnswer,wrongAnswer1,wrongAnswer2, wrongAnswer3) {
    this.question = question;
    this.questionImage = questionImage;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3;
};

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};


function btnProvideQuestion() { 
  //alert("왜 실행? 개수: " + quiz.length);
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2, randomQuestion.wrongAnswer3];
  shuffle(answers);

  var mainColor = "#EC4E4E";
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  document.getElementById("questionImage").src = randomQuestion.questionImage;
  document.getElementById("A").value= answers[0];
  document.getElementById("A").innerHTML= answers[0];
  document.getElementById("B").value= answers[1];
  document.getElementById("B").innerHTML= answers[1];
  document.getElementById("C").value= answers[2];
  document.getElementById("C").innerHTML= answers[2];
  document.getElementById("D").value= answers[3];
  document.getElementById("D").innerHTML= answers[3];

  document.getElementById("A").style.backgroundColor = mainColor;
  document.getElementById("B").style.backgroundColor = mainColor;
  document.getElementById("C").style.backgroundColor = mainColor;
  document.getElementById("D").style.backgroundColor = mainColor;
}

function answerA_clicked() {
  var btn = document.getElementById("A");
  var answerA = btn.value;
  	checkAnswer(answerA, btn);
}
function answerB_clicked() {
  var btn = document.getElementById("B");
  var answerB = btn.value;
    checkAnswer(answerB, btn);
}
function answerC_clicked() {
  var btn = document.getElementById("C");
  var answerC = btn.value;	
		checkAnswer(answerC, btn);
}
function answerD_clicked() {
  var btn = document.getElementById("D");
  var answerD = btn.value;
		checkAnswer(answerD, btn);
}

function adjustScore(isCorrect) {
  debugger;
  if (isCorrect) {
    currentScore++;
  } else {
    if (currentScore > 0) {
      currentScore--;
  	}
  }
  document.getElementById("score").innerHTML = "점수: "+currentScore;
}

function btnDisable(btn){
  btn.style.backgroundColor='gray';
}

function checkAnswer(answer, btn) {  
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    //alert("오답!");
    adjustScore(false);
    btnDisable(btn);
  }	  
}
