var quizType = [];
var quizSubType = [];
var quizName = [];
var answer1 = []; //Right Answer
var answer2 = [];
var answer3 = [];
var answer4 = [];
var quizImage = [];
var quizSound = [];
var quizTable = [];

var quizData = [];
var currentQuizNum = 0;
var maxQuizNum;
var randomNum;
var answerObj = [];
var currentScore = 0;
var currentLife = 10;
var maxLife = 10;
var gameModeList = [];
var gameMode = "";
var gameModeHangul = "";

function initalize(){
  currentQuizNum=0;
  adjustScore(true, true);
  adjustLife(true);
}

$(document).ready(function(){
});

function gameModeSelect(type){
  switch(type){
    case 1:
      gameModeList[0]="illust01";
      gameModeList[1]="illust02";
      gameModeList[2]="illust03";
      gameMode="illust";
      gameModeHangul="일러스트 퀴즈";
      break;
    case 2:
      gameModeList[0]="song01";
      gameModeList[1]="song02";
      gameModeList[2]="song03";
      gameModeList[3]="song04";
      gameMode="song";
      gameModeHangul="노래 퀴즈";
      break;
    case 3:
      gameModeList[0]="bg01";
      gameMode="bg";
      gameModeHangul="배경 퀴즈";
      break;
    case 4:
      gameModeList[0]="char01";
      gameModeList[1]="char02";
      gameMode="char";
      gameModeHangul="캐릭터 퀴즈";
      break;
    case 99:
      gameMode="all";
      gameModeHangul="종합 퀴즈";
      break;
    case 100:
      if(gameModeList.length==0){
        return;
      }
      gameMode="custom";
      gameModeHangul="내맘대로 퀴즈";
      break;
  }

  $("#main").fadeOut(300, function(){
    $("#mainGame").fadeIn(300);
  });

  $("#footer").css("display","none");

  gameReady();
}

function customQuiz(){
  $("#selectQuiz").css("display","none");
  $("#customQuiz").css("display","block");
  $("#footer").css("display","none");
}

function customQuizSelect(type, btn){
  if(gameModeList.includes(type)){
    gameModeList.splice(gameModeList.indexOf(type),1)
    $(btn).css("background-color", "rgb(255, 255, 255)");
  }
  else{
    gameModeList.push(type)
    $(btn).css("background-color", "rgb(255, 209, 228)");
  }

  console.log("-----");
  for(i=0; i<gameModeList.length; i++){
    console.log(gameModeList[i]);
  }
}

function gameReady(){
  var ajaxRequest = $.ajax({
    url: 'https://bandori.github.io/bandori/json/question.json',
    dataType: 'json',
    success: function(data) {
      var _num=0;
      var _count=0;
      shuffle(data);

      $.each(data, function(index){
        if(_count >= 100) { return false; }

        if(gameMode=="all"){
          quizType[index] = data[index].type;
          quizName[index] = data[index].quiz;

          if(data[index].quizImage == undefined) {quizImage[index] = "none";}
          else{quizImage[index] = data[index].quizImage;}

          if(data[index].quizSound == undefined) {quizSound[index] = "none";}
          else{quizSound[index] = data[index].quizSound;}

          if(data[index].quizTable == undefined) {quizTable[index] = "none";}
          else{quizTable[index] = data[index].quizTable;}

          answer1[index] = data[index].answer1;
          answer2[index] = data[index].answer2;
          answer3[index] = data[index].answer3;
          answer4[index] = data[index].answer4;

          _count++;
        }
        else{
          if(gameModeList.includes(data[index].subType)){
            quizType[_num] = data[index].type;
            quizName[_num] = data[index].quiz;
        
            if(data[index].quizImage == undefined) {quizImage[_num] = "none";}
            else{quizImage[_num] = data[index].quizImage;}

            if(data[index].quizSound == undefined) {quizSound[_num] = "none";}
            else{quizSound[_num] = data[index].quizSound;}

            if(data[index].quizTable == undefined) {quizTable[_num] = "none";}
            else{quizTable[_num] = data[index].quizTable;}

            answer1[_num] = data[index].answer1;
            answer2[_num] = data[index].answer2;
            answer3[_num] = data[index].answer3;
            answer4[_num] = data[index].answer4;

            console.log(_num + " " + quizSound[_num] + answer1[_num]);

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

function shuffle(o, shuffleType, answer1) {
  if(shuffleType=="song" && Number(answer1)){
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
  console.log(answer1[randomNum])
  shuffle(randomAnswers, quizType[randomNum], answer1[randomNum]);

  var _quizName = document.getElementById("quizName");
  var _quizImage = document.getElementById("quizImage");
  var _quizSound = document.getElementById("quizSound"); _quizSound.volume = 0.5;
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

  //문제 사운드
  if(quizSound[randomNum] == "none"){
    _quizSound.style.display="none";
  }
  else{
    _quizSound.style.display="block";
    _quizSound.style.margin="0 auto";
    _quizSound.src = quizSound[randomNum];
    console.log("랜덤 " + randomNum + " " + _quizSound.src + " " + answer1[randomNum]);
  }

  //테이블
  console.log("테이블 :"+quizTable[randomNum]);
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
    quizSound.splice(randomNum, 1);
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
  var resultImage = document.getElementById("resultImage");
  if(currentScore >= 750){
    _review = "나나미";
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_06.png";
  }
  else if(currentScore >= 500){
    _review = "핵거병";
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_05.png";
  }
  else if(currentScore >= 300){
    _review = "거병";
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_04.png";
  }
  else if(currentScore >= 200){
    _review = "고수"
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_03.png";
  }
  else if (currentScore >= 100){
    _review = "방청년";
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_02.png";
  }
  else{
    _review = "방린이";
    resultImage.src = "https://bandori.github.io/bandori/img/result/img_result_01.png";
  }
  document.getElementById("resultReview").innerHTML = "평가: "+_review;


}

function clear(){
  document.getElementById("clearScore").innerHTML = "점수: "+currentScore;

  $("#mainGame").fadeOut(300, function(){
    $("#clear").fadeIn(300);
  });

  document.getElementById("clearReview").innerHTML = "당신은 "+gameModeHangul+"를 모두 맞추었습니다!<br><br>상으로 모카의 빵을 드립니다.";
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

