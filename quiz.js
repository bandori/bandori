//variables

var question = new Array();
var answer1 = new Array();
var answer2 = new Array();
var answer3 = new Array();
var answer4 = new Array();
var quizImage = new Array();

var quiz = new Array();
var quizNum = 1;
var randomQuiz;
var answers = [];
var currentScore = 0;
var gameMode = "";


$(document).ready(function(){
  $("#mainGame").css("display","none");
  gameMode="";
});

function gameModeSelect(type){
  switch(type){
    case 1:
      gameMode="illust";
      break;
    case 2:
      gameMode="song";
      break;
    case 99:
      gameMode="all";
      break;
  }
  $("#main").css("display","none");
  $("#mainGame").css("display","block");

  gameReady();
}

function gameReady(){
  var ajaxRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    dataType: 'json',
    success: function(data) {
      var _num=0;
      $.each(data, function(index){
        if(gameMode=="all"){
          quiz[index] = new Question(data[index].type, data[index].quiz, data[index].quizImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)
          //alert(quiz[index].quiz + " " +quiz[index].quizImage + " " + quiz[index].answer1 + " " + quiz[index].answer2
          //+ " " + quiz[index].answer3 + " " + quiz[index].answer4);
        }
        else{
          if(data[index].type == gameMode){
            quiz[_num] = new Question(data[index].type, data[index].quiz, data[index].quizImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)
            //alert(quiz[_num].quiz + " " +quiz[_num].quizImage + " " + quiz[_num].answer1 + " " + quiz[_num].answer2
            //+ " " + quiz[_num].answer3 + " " + quiz[_num].answer4);
            _num++;

          }
        }
      })

    }
  })

  $.when(ajaxRequest).done(function(){
    btnProvideQuestion();

  })

}

function Question(quizType,quiz,quizImage,rightAnswer,wrongAnswer1,wrongAnswer2, wrongAnswer3) {
  this.quizType = quizType;  
  this.quiz = quiz;
  this.quizImage = quizImage;
  this.rightAnswer = rightAnswer;
  this.wrongAnswer1 = wrongAnswer1;
  this.wrongAnswer2 = wrongAnswer2;
  this.wrongAnswer3 = wrongAnswer3;
};

function shuffle(o, shuffleType) {
  if(shuffleType=="song"){
    o.sort(function(a,b){
      return a-b;
    });
  }
  else{
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  }

	return o;
};


function btnProvideQuestion() { 
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuiz = quiz[randomNumber];
  answers = [randomQuiz.rightAnswer, randomQuiz.wrongAnswer1, randomQuiz.wrongAnswer2, randomQuiz.wrongAnswer3];
  
  shuffle(answers, quiz[randomNumber].type);

  var mainColor = "#EC4E4E";
  var _quizName = document.getElementById("quiz");
  var _quizImage = document.getElementById("quizImage");
  var _answer1 = document.getElementById("A");
  var _answer2 = document.getElementById("B");
  var _answer3 = document.getElementById("C");
  var _answer4 = document.getElementById("D");

  _quizName.innerHTML= randomQuiz.quiz;

  if(randomQuiz.quizImage == ""){
    _quizImage.style.display="none";
  }
  else{
    _quizImage.style.display="block";
    _quizImage.style.margin="0 auto";
    _quizImage.src = randomQuiz.quizImage;
  }

  _answer1.innerHTML= answers[0];
  _answer2.value= answers[1];
  _answer2.innerHTML= answers[1];
  _answer3.value= answers[2];
  _answer3.innerHTML= answers[2];
  _answer4.value= answers[3];
  _answer4.innerHTML= answers[3];

  _answer1.disabled=false;
  _answer2.disabled=false;
  _answer4.disabled=false;
  _answer4.disabled=false;
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

function checkAnswer(answer, btn) {  
  if (answer == randomQuiz.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    //alert("오답!");
    adjustScore(false);
    btnDisable(btn);

    showNotification();
  }	  
}

function btnDisable(btn){
  btn.disabled=true;
}

const notification = document.getElementById('notification-container')
// Show notification
const showNotification = () => {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

