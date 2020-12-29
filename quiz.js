//variables

var quizType = [];
var quizName = [];
var answer1 = [];
var answer2 = [];
var answer3 = [];
var answer4 = [];
var quizImage = [];

var quizData = [];
var quizNum = 0;
var randomNumber;
var answers = [];
var currentScore = 0;
var currentLife = 5;
var maxLife = 5;
var gameMode = "";

$(document).ready(function(){
  $("#mainGame").css("display","none");
  $("#result").css("display","none");
  gameMode="";
});

function initalize(){
  quizNum=0;
  adjustScore(true, true);
  adjustLife(true);
}

function gameModeSelect(type){
  switch(type){
    case 1:
      gameMode="illust";
      break;
    case 2:
      gameMode="song";
      break;
    case 3:
      gameMode="background";
      break;
    case 99:
      gameMode="all";
      break;
  }

  $("#main").fadeOut(300, function(){
    $("#mainGame").fadeIn(300);
  });

  //$("#main").css("display","none");
  $("#footer").css("display","none");
  //$("#mainGame").css("display","block");

  gameReady();
}

function gameReady(){
  var ajaxRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    //url: 'json/question.json',
    dataType: 'json',
    success: function(data) {
      var _num=0;
      $.each(data, function(index){
        if(gameMode=="all"){
   
          quizType[index] = data[index].type;
          quizName[index] = data[index].quiz;
          quizImage[index] = data[index].quizImage;
          answer1[index] = data[index].answer1;
          answer2[index] = data[index].answer2;
          answer3[index] = data[index].answer3;
          answer4[index] = data[index].answer4;

          quizData[index] = new Question(data[index].type, data[index].quiz, data[index].quizImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)

        }
        else{
          if(data[index].type == gameMode){
            quizType[_num] = data[index].type;
            quizName[_num] = data[index].quiz;
            quizImage[_num] = data[index].quizImage;
            answer1[_num] = data[index].answer1;
            answer2[_num] = data[index].answer2;
            answer3[_num] = data[index].answer3;
            answer4[_num] = data[index].answer4;

            quizData[_num] = new Question(data[index].type, data[index].quiz, data[index].quizImage, data[index].answer1, data[index].answer2, data[index].answer3, data[index].answer4)
            _num++;
          }
        }
      })
      alert(answer1[53]);
    }
  })

  $.when(ajaxRequest).done(function(){
    btnProvideQuestion();

  })

}

class Question {
  constructor(quizType, quiz, quizImage, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) {
    this.quizType = quizType;
    this.quiz = quiz;
    this.quizImage = quizImage;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3;
  }
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

  $("#answer").css("display","none")
  $("#answerImage").css("display","none")

  randomNumber = Math.floor(Math.random()*quizName.length);
  
  answers = [answer1[randomNumber], answer2[randomNumber], answer3[randomNumber], answer4[randomNumber]];

  shuffle(answers, quizType[randomNumber]);

  var mainColor = "#EC4E4E";
  var _quizName = document.getElementById("quiz");
  var _quizImage = document.getElementById("quizImage");
  var _answer1 = document.getElementById("A");
  var _answer2 = document.getElementById("B");
  var _answer3 = document.getElementById("C");
  var _answer4 = document.getElementById("D");
  var _answerImage1 = document.getElementById("answerImageA");
  var _answerImage2 = document.getElementById("answerImageB");
  var _answerImage3 = document.getElementById("answerImageC");
  var _answerImage4 = document.getElementById("answerImageD");

  $(_answer1).css("background-color", "");
  $(_answer2).css("background-color", "");
  $(_answer3).css("background-color", "");
  $(_answer4).css("background-color", "");

  _quizName.innerHTML= quizName[randomNumber];

  if(quizImage[randomNumber] == ""){
    _quizImage.style.display="none";
  }
  else{
    _quizImage.style.display="block";
    _quizImage.style.margin="0 auto";
    _quizImage.src = quizImage[randomNumber];
  }
  
  _answer1.value= answers[0];
  _answer2.value= answers[1];
  _answer3.value= answers[2];
  _answer4.value= answers[3];

  if(_answer1.value.indexOf("http") !== -1){
 
    _answerImage1.src = _answer1.value;
    _answerImage2.src = _answer2.value;
    _answerImage3.src = _answer3.value;
    _answerImage4.src = _answer4.value;
    _answerImage1.style.opacity = "1";
    _answerImage2.style.opacity = "1";
    _answerImage3.style.opacity = "1";
    _answerImage4.style.opacity = "1";

    $("#answer").css("display","none");
    $("#answerImage").css("display","block");
  }
  else{
    _answer1.innerHTML= answers[0];
    _answer2.innerHTML= answers[1];
    _answer3.innerHTML= answers[2];
    _answer4.innerHTML= answers[3];
    $("#answer").css("display","block");
    $("#answerImage").css("display","none");
  }

  _answer1.disabled=false;
  _answer2.disabled=false;
  _answer3.disabled=false;
  _answer4.disabled=false;

  
  setQuizNumber();
}

function answerA_clicked(answerObject) {
  var answerA;
  if(answerObject.src !== undefined){
    answerA = answerObject.src;
  }
  else{
    answerA = answerObject.value;
  }
  checkAnswer(answerA, answerObject);
}
function answerB_clicked(answerObject) {
  var answerB;
  if(answerObject.src !== undefined){
    answerB = answerObject.src;
  }
  else{
    answerB = answerObject.value;
  }
  checkAnswer(answerB, answerObject);
}
function answerC_clicked(answerObject) {
  var answerC;
  if(answerObject.src !== undefined){
    answerC = answerObject.src;
  }
  else{
    answerC = answerObject.value;
  }
  checkAnswer(answerC, answerObject);
}
function answerD_clicked(answerObject) {
  var answerD;
  if(answerObject.src !== undefined){
    answerD = answerObject.src;
  }
  else{
    answerD = answerObject.value;
  }
  checkAnswer(answerD, answerObject);
}

function checkAnswer(answer, answerObject) {  
  if (answer == answer1[randomNumber]) {
    adjustScore(true, false);
    btnProvideQuestion();
  } else { 
    adjustScore(false, false);
    adjustLife();
    btnDisable(answerObject);
  }	  
}

function adjustScore(isCorrect, isInitalized) {
  if(isInitalized){
    currentScore=0;
    document.getElementById("score").innerHTML = "점수: "+currentScore;
    return;
  }
  if (isCorrect) {
    currentScore+=10;
  } 
  else {
    if (currentScore > 0) {
      currentScore-=5;
    }
  }
  document.getElementById("score").innerHTML = "점수: "+currentScore;
}

function adjustLife(isInitalized){
  if(isInitalized){
    currentLife=maxLife;
    document.getElementById("life").innerHTML = "라이프: "+currentLife +" / " + maxLife;
    return;
  }

  currentLife--;
  document.getElementById("life").innerHTML = "라이프: "+currentLife +" / " + maxLife;

  if(currentLife <= 0){
    result();
  }
}

function setQuizNumber(){
  quizNum++;
  document.getElementById("quizNum").innerHTML = "문제 "+quizNum;
}

function btnDisable(answerObject){
  if(answerObject.src !== undefined){
    answerObject.disabled=true;
    answerObject.style.opacity = "0.5";
  }
  else{
    answerObject.disabled=true;
    $(answerObject).css("background-color", "rgb(50,50,50)");
  }
}

function btnEnableAll(object){

}

function result(){
  document.getElementById("resultScore").innerHTML = "점수: "+currentScore;

  $("#mainGame").fadeOut(300, function(){
    $("#result").fadeIn(300);
  });

  var _review;
  if(currentScore >= 1000){
    _review = "솔직히 다 외웠죠?";
  }
  else if(currentScore >= 500){
    _review = "고인물";
  }
  else if(currentScore >= 300){
    _review = "핵고수";
  }
  else if(currentScore >= 200){
    _review = "고수"
  }
  else if (currentScore >= 100){
    _review = "방청년";
  }
  else{
    _review = "방린이 어서오고";
  }
  document.getElementById("resultReview").innerHTML = "한줄 평: "+_review;
}

function result_retry_clicked() {
  $("#mainGame").css("display","block");
  $("#result").css("display","none");
  initalize();
  btnProvideQuestion();
}

function result_gotoMain_clicked() {
  $("#main").css("display","block");
  $("#result").css("display","none");
  initalize();
  window.location.reload();
}

/*
function getThumbFile(_IMG){
  //canvas에 이미지 객체를 리사이징해서 담는 과정
  var canvas = document.createElement("canvas");
  canvas.width = '300px'; //리사이징하여 그릴 가로 길이
  canvas.height ='300px'; //리사이징하여 그릴 세로 길이
  canvas.getContext("2d").drawImage(_IMG, 0, 0, 300, 300);

  //canvas의 dataurl를 blob(file)화 하는 과정
  var dataURL = canvas.toDataURL("image/png"); //png => jpg 등으로 변환 가능
  alert(dataURL.toString());
  var byteString = atob(dataURL.split(',')[1]);
  var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //리사이징된 file 객체
  var tmpThumbFile = new Blob([ab], {type: mimeString});
  return tmpThumbFile;
}
*/



