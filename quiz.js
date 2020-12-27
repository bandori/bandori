//variables

var question = new Array();
var answer1 = new Array();
var answer2 = new Array();
var answer3 = new Array();
var answer4 = new Array();

var quiz = [];
quiz[0] = new Question("포피파 보컬의 이름은?", "토야마 카스미", "토야마 아스카", "뿔버섯", "몰라");
quiz[1] = new Question("포피파 기타의 이름은?", "하나조노 타에", "한화노조 타에", "오타에", "아리사");
quiz[2] = new Question("포피파ㅠㅠ 피포파ㅠㅠ", "포피파파 피포파!!", "스마일 예이!!", "뉴 콘 팡!!", "헤헤");
var randomQuestion;
var answers = [];
var currentScore = 0;

document.addEventListener("DOMContentLoaded", function(event) { 
  btnProvideQuestion();
});

function Question(question,rightAnswer,wrongAnswer1,wrongAnswer2, wrongAnswer3) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3;
};
alert("question");
$(document).ready(function(){

  var ajexRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    dataType: 'json',
    success: function(data){
      var len=data.length;

      $.each(data, function(index, item) {
        alert(data[index].type);
        if(data[index].type == "question"){

        }
      })
    }
  });
});

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function btnProvideQuestion() { 
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2, randomQuestion.wrongAnswer3];
  shuffle(answers);

  var mainColor = "#EC4E4E";
  
  document.getElementById("question").innerHTML= randomQuestion.question;
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
