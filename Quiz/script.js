const quizData = [
    {
        question:"Which language runs in web browser ?",
        a:"Java",
        b:"C",
        c:"Python",
        d:"Javascript",
        correct:"d",
    },
    {
        question : "What is CSS stands for ?",
        a:"Central Style Sheets",
        b:"Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Car Sail Sara",
        correct : "b"
    },
    {
        question : "What is HTML stands for ?",
        a:"Hypertext Markup Language",
        b:"Hypertext Markdown Language",
        c: "Hyperloop Maching Language",
        d: "Helicopter Markup Language",
        correct : "a"
    },
    {
        question : "What year was Javascript Lanuched ?",
        a:"1996",
        b:"1995",
        c: "1994",
        d: "none of the above",
        correct : "b",
    },

];
const quiz = document.getElementById('quiz')
const quiz_header = document.getElementById('quiz-header')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit');
const reloadBtn = document.getElementById('reload');
const Timer=document.getElementById('Timer')
const TimerHeader=document.getElementById('TimerHeader')

let currentQuiz = 0
let score = 0
let count = 50
let timer

loadQuiz()
startTime()
function startTime(){
    timer = setInterval(function() {
        Timer.innerHTML=Math.floor(count/60)+" Minutes "+Math.floor(count%60)+" seconds";
        count--;
        if(count === 0) {
          stopInterval();
        }
      }, 1000);
    
      var stopInterval = function() {
        TimerHeader.innerHTML='Time is up!You cannot Attend more Questions';
        displayRes();
        clearInterval(timer);
      }
}
function displayRes(){
    
    Timer.classList.add('hide')
    quiz_header.classList.add('hide')
    submitBtn.classList.add('hide')
    let h2 = document.createElement("h2")
    h2.innerText = `You score is ${score}` 
    quiz.appendChild(h2)
    reloadBtn.classList.remove('hide')

}
function loadQuiz(){
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    
}

function deselectAnswers(){
    answerEls.forEach(answerEl => answerEl.checked = 
    false )
}
function getSelected(){
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id
        }
    })

    return answer
}
submitBtn.addEventListener('click',() => {
    const answer = getSelected()

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++
        }
        currentQuiz++

        if(currentQuiz < quizData.length){
            loadQuiz()
        }else{
            TimerHeader.classList.add('hide')
            displayRes()
            clearInterval(timer)
        }
    }
    
})