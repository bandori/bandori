//variables
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

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function btnProvideQuestion() { 
  
	var randomNumber = Math.floor(Math.random()*quiz.length);
	randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2, randomQuestion.wrongAnswer3];
  shuffle(answers);
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  document.getElementById("A").value= answers[0];
  document.getElementById("A").innerHTML= answers[0];
  document.getElementById("B").value= answers[1];
  document.getElementById("B").innerHTML= answers[1];
  document.getElementById("C").value= answers[2];
  document.getElementById("C").innerHTML= answers[2];
  document.getElementById("D").value= answers[3];
  document.getElementById("D").innerHTML= answers[3];

}

function answerA_clicked() {
  var answerA = document.getElementById("A").value;
  	checkAnswer(answerA);
}
function answerB_clicked() {
		var answerB = document.getElementById("B").value;
  checkAnswer(answerB);
}
function answerC_clicked() {
  var answerC = document.getElementById("C").value;
  	
		checkAnswer(answerC);
}
function answerD_clicked() {
  var answerC = document.getElementById("D").value;
  	
		checkAnswer(answerD);
}

var btn_gameStart = document.getElementById('gameStart');
btn_gameStart.addEventListener('click', function(){
  btn_gameStart.style.color='blue';
  alert("게임을 시작합니다");
});
function gameStart(onClass){
  alert("게임을 시작합니다");
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
  document.getElementById("점수").innerHTML = currentScore;
}

function checkAnswer(answer) {  
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    alert("오답!");
    adjustScore(false);
  }	  
}
