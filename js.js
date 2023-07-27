var QuestionData;
let count = 0;
let isClicked = false;
let nextDiv = document.getElementById("Next");
let answerI;
let answerSpan
let Score = 0;
const FirstPage = document.getElementById('FirstPage');
const SecondPage = document.getElementById('SecondPage');

function Questions(_url) {
  console.log(_url)
  fetch(_url)
    .then(response => response.json())
    .then(data => {
      QuestionData = data;
      ShowQuestions(0)
    })
    .catch(err => {
      console.error(err);
    });
}
function GoUrl(){
  Questions("https://opentdb.com/api.php?amount=10")
  FirstPage.style.display = 'none';
  SecondPage.style.display = 'block';
}
function GenerateUrl() {
  const QuestionNumber = document.getElementById('NQuestions').value;
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  const type = document.getElementById('type').value;
  const errorMessage = document.getElementById('errorMessage');

  var url = "https://opentdb.com/api.php?amount=";
  if (QuestionNumber == ''||QuestionNumber =='1') {
    errorMessage.style.display = 'block';
  }
  else {
    errorMessage.style.display = 'none';
    url = url + QuestionNumber;
    if (category != "any") {
      url += "&category=" + category;
    }
    if (difficulty != "any") {
      url += "&difficulty=" + difficulty;
    }
    if (type != "any") {
      url += "&type=" + type;
    }
    __url = url;
    Questions(url)
    FirstPage.style.display = 'none';
    SecondPage.style.display = 'block';
  }
}
function BackTOMain(){
  location.reload();
}

function ShowQuestions(val) {
 if(count+1==QuestionData.results.length){
    document.getElementById("QuestionTF").style.display = 'none';
    document.getElementById("QuestionsMulti").style.display = 'none';
    document.getElementById("Next").className = 'd-flex justify-content-between p-3 d-none';
    document.getElementById("EndScore").style.display = 'block';
    document.getElementById("Score").innerHTML =Score;
    document.getElementById("Total").innerHTML = QuestionData.results.length;
    document.getElementById("QHeadDiv").className = 'd-flex p-2 justify-content-between d-none';
  }
  else{
    if (val == 0) {
      count = 0
      Score = 0;
    }
    else if (val == 1) {
      count++;
      nextDiv.className = 'd-flex justify-content-between p-3 d-none';
      isClicked = false;
      answerSpan.style.backgroundColor = "#3071a9";
      answerI.className = "fa-solid fa-chevron-up fa-rotate-90 icons"
    }
    let arr = permutations([0, 1, 2, 3])[Math.floor(Math.random() * 25)]
    let QuesValue = []
    if (QuestionData.results[count].type == "boolean") {
      document.getElementById("QuestionTF").style.display = 'block';
      document.getElementById("QuestionsMulti").style.display = 'none';
      document.getElementById("QuestionTFh").innerHTML = QuestionData.results[count].question;
      document.getElementById("Option1TF").innerHTML = "True";
      document.getElementById("Option2TF").innerHTML = "False";
    }
    else {
      document.getElementById("QuestionsMulti").style.display = 'block';
      document.getElementById("QuestionTF").style.display = 'none';
  
      QuesValue.push(QuestionData.results[count].correct_answer);
      QuesValue.push(QuestionData.results[count].incorrect_answers[0]);
      QuesValue.push(QuestionData.results[count].incorrect_answers[1]);
      QuesValue.push(QuestionData.results[count].incorrect_answers[2]);
      document.getElementById("Question").innerHTML = QuestionData.results[count].question;
      document.getElementById("Option1").innerHTML = QuesValue[arr[0]];
      document.getElementById("Option2").innerHTML = QuesValue[arr[1]];
      document.getElementById("Option3").innerHTML = QuesValue[arr[2]];
      document.getElementById("Option4").innerHTML = QuesValue[arr[3]];
    }
    
  }
  document.getElementById("QHead").innerHTML = `${count+1} of ${QuestionData.results.length}`;
}
function permutations(arr) {
  if (arr.length === 1) {
    return [arr];
  }
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = permutations(remaining);
    for (let j = 0; j < perms.length; j++) {
      result.push([current].concat(perms[j]));
    }
  }
  return result;
}

function IsCorrectAnswer(val) {
  let data = QuestionData.results[count];
  let answer ;
  if(data.type == "boolean"){
    answer = document.getElementById(`Option${val}TF`).innerText;
    answerSpan = document.getElementById(`o${val}TF`);
    answerI = document.getElementById(`I${val}TF`);
  }
  else{
    answer = document.getElementById(`Option${val}`).innerText;
    answerSpan = document.getElementById(`o${val}`);
    answerI = document.getElementById(`I${val}`);
  }
  if (isClicked == false) {
    if (answer == data.correct_answer) {
      answerI.className = "fa-solid fa-check fa-beat icons"
      Score++;
    }
    else {
      answerSpan.style.backgroundColor = "red";
      answerI.className = "fa-solid fa-xmark fa-beat icons bg-danger"
    }
    nextDiv.className = 'd-flex justify-content-between p-3 d-block';
    isClicked = true;
  }
}
