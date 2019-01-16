import regeneratorRuntime, { async } from "regenerator-runtime";

let question = [];
let questionNumber = 0;
let questionTitle = document.querySelector('.question__title');
let questionAnswers = document.querySelector('.question__answers');
let questionCount = document.querySelector('.status__count');
let scoreText = document.querySelector('.status__score');
let nextQuestionBtn = document.querySelector('.btn-next');
let endGameH2 = document.querySelector('.end-game');
let btnNew = document.querySelector('.btn-new');
let score = 0;



// RANDOMIZE ANSWERS ARRAY
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


let getQuestion = async () => {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=22&type=multiple`);
        if (response.status === 200) {
            let data = await response.json();
            for (let i=0; i<10 ; i++) {
                data.results[i].incorrect_answers.push(data.results[i].correct_answer);
            }
            question = data.results;
        } else {
            throw new Error('Unable to fetch');
        }
    }

    let waitingData = async () => {
        await getQuestion();
        questionNumber = 0;
        renderQuestion(questionNumber);
    }

    waitingData();


    let renderQuestion = function (questionNumber) {
        let answer = '';
        nextQuestionBtn.classList.remove('isVisible');
        questionTitle.innerHTML = question[questionNumber].question;

        btnNew.addEventListener('click', function() {
            waitingData();
        })

        //RANDOMIZE ANSWERS ARRAY
        shuffle(question[questionNumber].incorrect_answers);

        //CLEAN ANSWERS BOX
        questionAnswers.innerHTML = '';
        
        questionCount.textContent = `Question : ${questionNumber+1}/${question.length}`;
        scoreText.textContent = `Score : ${score}`;

        for(let i=0; i<4 ; i++) {
            let divBtn = document.createElement('div');
            divBtn.classList.add('question__box')
            let btnAnswer = document.createElement('button');
            questionAnswers.appendChild(divBtn);
            btnAnswer.classList.add('btn-answers');
            btnAnswer.innerHTML = question[questionNumber].incorrect_answers[i];
            divBtn.appendChild(btnAnswer);
            
        }

        let iCorrect = document.createElement('i');
        iCorrect.classList.add('fas', 'fa-check');

        let iNotCorrect = document.createElement('i');
        iNotCorrect.classList.add('fas', 'fa-times');


        let buttons = document.querySelectorAll('.btn-answers');
        buttons.forEach(function(currentBtn) {
            currentBtn.addEventListener('click', function (e){
                answer = e.target.textContent;
                if(answer === question[questionNumber].correct_answer) {
                    score += 1;
                    currentBtn.classList.add('correct');
                    currentBtn.insertAdjacentElement('afterend', iCorrect);

                } else {
                    currentBtn.classList.add('incorrect');
                    currentBtn.insertAdjacentElement('afterend', iNotCorrect);
                }

                questionNumber ++;
                if (questionNumber < 10) {
                    nextQuestionBtn.classList.add('isVisible');
                    nextQuestionBtn.addEventListener('click', function(){
                        renderQuestion(questionNumber);
                    })
                } else {
                    nextQuestionBtn.classList.remove('isVisible');
                    endGameH2.textContent = `Your final score is : ${score}`;
                }
            })
        })

    }