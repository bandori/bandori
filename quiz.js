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


$(document).ready(function(){
  var ajaxRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index){

        quiz[index] = new Question(data[index].quiz, data[index].quizImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)
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

function Question(quiz,quizImage,rightAnswer,wrongAnswer1,wrongAnswer2, wrongAnswer3) {
    this.quiz = quiz;
    this.quizImage = quizImage;
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
	randomQuiz = quiz[randomNumber]; //getQuestion
  answers = [randomQuiz.rightAnswer, randomQuiz.wrongAnswer1, randomQuiz.wrongAnswer2, randomQuiz.wrongAnswer3];
  shuffle(answers);

  var mainColor = "#EC4E4E";
  


  document.getElementById("quiz").innerHTML= randomQuiz.quiz;

  var _quizImage = document.getElementById("quizImage");
  if(randomQuiz.quizImage == ""){
    _quizImage.style.display="none";
  }
  else{
    var _img = cropImage(_quizImage, {
      x:_quizImage.width/4,
      y:_quizImage.height/4,
      width:_quizImage.width/2,
      height:_quizImage.height/2,
    })
    _img.style.display="block";
    _img.style.margin="0 auto";
    _img.src = randomQuiz.quizImage;
  }

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

const notification = document.getElementById('notification-container')
// Show notification
const showNotification = () => {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

function cropImage(image, croppingCoords) {
  var cc = croppingCoords;
  var workCan = document.createElement("canvas"); // create a canvas
  workCan.width = Math.floor(cc.width);  // set the canvas resolution to the cropped image size
  workCan.height = Math.floor(cc.height);
  var ctx = workCan.getContext("2d");    // get a 2D rendering interface
  ctx.drawImage(image, -Math.floor(cc.x), -Math.floor(cc.y)); // draw the image offset to place it correctly on the cropped region
  image.src = workCan.toDataURL();       // set the image source to the canvas as a data URL
  return image;
}