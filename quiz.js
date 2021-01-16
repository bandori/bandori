var quizType = [];
var quizName = [];
var answer1 = []; //Right Answer
var answer2 = [];
var answer3 = [];
var answer4 = [];
var quizImage = [];
var quizTable = [];

var quizData = [];
var currentQuizNum = 0;
var maxQuizNum;
var randomNum;
var answerObj = [];
var currentScore = 0;
var currentLife = 5;
var maxLife = 5;
var gameMode = "";
var gameModeHangul = "";

function initalize(){
  currentQuizNum=0;
  adjustScore(true, true);
  adjustLife(true);
}

function gameModeSelect(type){
  switch(type){
    case 1:
      gameMode="illust";
      gameModeHangul="일러스트 퀴즈";
      break;
    case 2:
      gameMode="song";
      gameModeHangul="노래 퀴즈";
      break;
    case 3:
      gameMode="bg";
      gameModeHangul="배경 퀴즈";
      break;
    case 4:
      gameMode="char";
      gameModeHangul="캐릭터 퀴즈";
      break;
    case 99:
      gameMode="all";
      gameModeHangul="모든 퀴즈";
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
      var _count=0;
      $.each(data, function(index){
        if(_count >= 100) { return false; }
        if(gameMode=="all"){
   
          quizType[index] = data[index].type;
          quizName[index] = data[index].quiz;

          if(data[index].quizImage == undefined) {quizImage[index] = "none";}
          else{quizImage[index] = data[index].quizImage;}

          if(data[index].quizTable == undefined) {quizTable[index] = "none";}
          else{quizTable[index] = data[index].quizTable;}

          answer1[index] = data[index].answer1;
          answer2[index] = data[index].answer2;
          answer3[index] = data[index].answer3;
          answer4[index] = data[index].answer4;

          _count++;
        }
        else{
          if(data[index].type == gameMode){
            quizType[_num] = data[index].type;
            quizName[_num] = data[index].quiz;

            if(data[index].quizImage == undefined) {quizImage[_num] = "none";}
            else{quizImage[_num] = data[index].quizImage;}

            if(data[index].quizTable == undefined) {quizTable[_num] = "none";}
            else{quizTable[_num] = data[index].quizTable;}

            answer1[_num] = data[index].answer1;
            answer2[_num] = data[index].answer2;
            answer3[_num] = data[index].answer3;
            answer4[_num] = data[index].answer4;
            _num++;
            _count++;
          }


        }
      })
      maxQuizNum = quizName.length;
    }
  })
  $.when(ajaxRequest).done(function(){
    btnProvideQuestion();
  })
}

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
  randomNum = Math.floor(Math.random()*quizName.length);
  randomAnswers = [answer1[randomNum], answer2[randomNum], answer3[randomNum], answer4[randomNum]];
  shuffle(randomAnswers, quizType[randomNum]);

  var _quizName = document.getElementById("quizName");
  var _quizImage = document.getElementById("quizImage");
  var _quizTable= document.getElementById("quizTable");
  var _answersImages = [document.getElementById("answerImageA"),document.getElementById("answerImageB"),document.getElementById("answerImageC"),document.getElementById("answerImageD")];
  answerObj = [document.getElementById("answerA"), document.getElementById("answerB"), document.getElementById("answerC"), document.getElementById("answerD")]

  _quizName.innerHTML= quizName[randomNum];

  //문제 이미지
  if(quizImage[randomNum] == "none"){
    _quizImage.style.display="none";
  }
  else{
    _quizImage.style.display="block";
    _quizImage.style.margin="0 auto";
    _quizImage.src = quizImage[randomNum];
  }

  //테이블
  console.log(quizTable[randomNum]);
  if(quizTable[randomNum] == "none"){
    $("#quizTable").hide();
  }
  else{
    var strTableTitle = quizTable[randomNum].split(':');
    document.getElementById("quizTableTitle").innerHTML = strTableTitle[0];
    document.getElementById("quizTableContent").innerHTML = strTableTitle[1];
    $("#quizTable").show();
    _quizTable.style.margin="0 auto";
  }

  for(var i=0; i<answerObj.length; i++){
    answerObj[i].value = randomAnswers[i]; //답 넣기
  }

  //답 이미지
  if(answerObj[0].value.indexOf("http") !== -1){
    for(var i=0; i<_answersImages.length; i++){
      _answersImages[i].src = answerObj[i].value;
      _answersImages[i].style.opacity="1";
    }
    $("#answer").css("display","none");
    $("#answerImage").css("display","block");
  }
  else{
    for(var i=0; i<answerObj.length; i++){
      answerObj[i].innerHTML = answerObj[i].value;
    }
    $("#answer").css("display","block");
    $("#answerImage").css("display","none");
  }
  for(var i=0; i<answerObj.length; i++){
    answerObj[i].disabled=false;
  }
  $.each(answerObj, function(index, item){
    $(item).css("background-color","");
  });

  setQuizNumber();
}

function answer_clicked(answerObject) {
  var _answer;
  if(answerObject.src !== undefined){
    _answer = answerObject.src;
  }
  else{
    _answer = answerObject.value;
  }
  checkAnswer(_answer, answerObject);
}

function checkAnswer(selectAnswer, answerObject) {  

  if (selectAnswer == answer1[randomNum]) {
    $("#answer").css("display","none")
    $("#answerImage").css("display","none")

    quizName.splice(randomNum, 1);
    quizImage.splice(randomNum, 1);
    quizTable.splice(randomNum, 1);
    quizType.splice(randomNum, 1);
    answer1.splice(randomNum, 1);
    answer2.splice(randomNum, 1);
    answer3.splice(randomNum, 1);
    answer4.splice(randomNum, 1);

    adjustScore(true, false);

    if(quizName.length >= 1){
      btnProvideQuestion();
    }
    else{
      clear();
    }

  } 
  else { 
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
      //currentScore-=5;
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
  currentQuizNum++;
  document.getElementById("quizNum").innerHTML = "문제 "+currentQuizNum + " / " +maxQuizNum;
}

function btnDisable(answerObject){
  if(answerObject.src !== undefined){
    answerObject.disabled=true;
    answerObject.style.opacity = "0.5";
  }
  else{ //이미지
    answerObject.disabled=true;
    $(answerObject).css("background-color", "rgb(50,50,50)");
  }
}

function result(){
  dataLayer.push({
    'event': 'currentScore'
  });
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
    _review = "방린이";
  }
  document.getElementById("resultReview").innerHTML = "평가: "+_review;
}

function clear(){
  document.getElementById("clearScore").innerHTML = "점수: "+currentScore;

  $("#mainGame").fadeOut(300, function(){
    $("#clear").fadeIn(300);
  });

  document.getElementById("clearReview").innerHTML = "당신은 "+gameModeHangul+"를 모두 맞추었습니다!";
}

function result_retry_clicked() {
  $("#mainGame").css("display","block");
  $("#result").css("display","none");
  $("#clear").css("display","none");
  initalize();
  gameReady();
}

function result_gotoMain_clicked() {
  $("#main").css("display","block");
  $("#result").css("display","none");
  $("#clear").css("display","none");
  initalize();
  window.location.reload();
}

(function(){
  document.addEventListener('keydown', function(e){
    const keyCode = e.keyCode;
    if(keyCode == 13){ // Enter key
      for(var i=0; i<randomAnswers.length; i++){
        if(randomAnswers[i] == answer1[randomNum]){
          answer_clicked(answerObj[i]);
          //console.log('정답 ' + i);
          break;
        }
      }
    }
  })
})();


