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

  var _questionImage = document.getElementById("questionImage");
  if(randomQuestion.questionImage == ""){
    _questionImage.style.display="none";
  }
  else{
    _questionImage.style.display="block";
    _questionImage.style.margin="0 auto";
    _questionImage.src = randomQuestion.questionImage;
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
  if (answer == randomQuestion.rightAnswer) {
    adjustScore(true);
    btnProvideQuestion();
  } else { 
    //alert("오답!");
    adjustScore(false);
    btnDisable(btn);

    $( "#reguser" ).blur(function(e){
      popToolTip("#reguser", "아이디가 존재하지 않습니다.");
     });
  }	  
}

var tooltip_handle = null;
function popToolTip(p_selector, p_txt){
 var v_id = $(p_selector).attr("id") || $(p_selector).attr("name");
 v_id = "#"+v_id+"_tooltip_text";

 $tooltip_layer = $(v_id);

 if ( $tooltip_layer.length == 0 )
 {
  return;
 }

 p_txt = p_txt ? $.trim(p_txt) : "";
 
 if (p_txt!="")
 {
  $tooltip_layer.find( "div" ).text(p_txt);
  $tooltip_layer.show();
  
  if (tooltip_handle)
  {
   clearTimeout(tooltip_handle);
   tooltip_handle = null;
  }
  tooltip_handle = setTimeout(function(){
   $tooltip_layer.hide();
  }, 2000);
 }
}

//함수안에서 after 함수안에 원하시는 디자인을 붙여시면 됩니다. 그리고 top과 left 값을 조정하셔서 레이어박스 위치를 조정하시면 됩니다. 아니면 파라미터를 넘기게 함수를 수정하셔서 각 레이어별로 위치지정을 할 수 있도록 하셔도 됩니다.
function setToolTip(p_selector){
 var v_id = $(p_selector).attr("id") || $(p_selector).attr("name");
 $(p_selector).each(function(idx,obj){
  $(this).after('<div id="'+v_id+'_tooltip_text" style="display:none;position:absolute;"><div style="border:3px solid #dadada;position:relative;left:5px;top:-60px;background-color:#ffffff;padding:3px;"></div></div>');
 });
}

$(function(){

//아이디가 reguser 인 입력박스에 대해서, 아래와 같이 레이어팝업을 초기화 시켜 줍니다. (위함수에서 정의된대로)
 setToolTip("#reguser");

//popToolTip 함수를 이용해서 아래와 같이 툴팁을 띄워주시면 됩니다.
//여기서는 입력박스에서 현재 초점을 잃었을때 아이디등을 체크해서, 알맞는 메시지를 툴팁으로 띄우게 됩니다.
//비밀번호 체크나 기타 여러 상황에 사용하실 수 있을 것 같습니다.


});
