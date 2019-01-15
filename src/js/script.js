import regeneratorRuntime, { async } from "regenerator-runtime";

let question = [];
let questionNumber = 0;
let questionTitle = document.querySelector('.question__title');
let questionAnswers = document.querySelector('.question__answers');
let questionCount = document.querySelector('.question-count');
let scoreText = document.querySelector('.score');



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
        renderQuestion(questionNumber);
    }

    waitingData();


    let renderQuestion = function (questionNumber) {
        let answer = '';
        // await getQuestion();
        console.log(question);
        questionTitle.innerHTML = question[questionNumber].question;

        //RANDOMIZE ANSWERS ARRAY
        shuffle(question[questionNumber].incorrect_answers);

        //CLEAN ANSWERS BOX
        questionAnswers.innerHTML = '';
        
        questionCount.textContent = `Question n° ${questionNumber+1}`
        scoreText.textContent = `Score : `

        for(let i=0; i<4 ; i++) {
            let divBtn = document.createElement('div');
            divBtn.classList.add('question__box')
            let btnAnswer = document.createElement('button');
            questionAnswers.appendChild(divBtn);
            btnAnswer.classList.add('btn-answers');
            btnAnswer.innerHTML = question[questionNumber].incorrect_answers[i];
            divBtn.appendChild(btnAnswer);
            
        }
        let buttons = document.querySelectorAll('.btn-answers');
        buttons.forEach(function(currentBtn) {
            currentBtn.addEventListener('click', function(e){
                answer = e.target.textContent;
                if(answer === question[questionNumber].correct_answer) {
                    console.log('Correct!!');
                    currentBtn.classList.add('correct');
                }
            })
        })

        let newGame = document.querySelector('.btn-new').addEventListener('click', function(){
            questionNumber ++;
            if (questionNumber < 10) {
            renderQuestion(questionNumber);
            } else {
                console.log('Questions finished')
            }
        })

    }




    // console.log(question)

// let quiz = {
//     question : '',
//     answers: [],
//     correctAnsw: ''
// };


// let getQuestion = async () => {
//     const response = await fetch(`https://opentdb.com/api.php?amount=10&category=22&type=multiple`);
//     if (response.status === 200) {
//         let data = await response.json();
//         quiz.category = data.results[0].category;
//         quiz.question = data.results[0].question;
//         quiz.answers = data.results[0].incorrect_answers;
//         quiz.answers.push(data.results[0].correct_answer);
//         quiz.correctAnsw = data.results[0].correct_answer;
//         console.log(data.results);
//         return data.results;
//     } else {
//         throw new Error('Unable to fetch');
//     }
// }


// // RANDOMIZE ANSWERS ARRAY
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }


// // RENDER QUIZ TO DOM
// let renderQuestion = async () => {

//     await getQuestion();
//     console.log(quiz);
//     shuffle(quiz.answers);

//     let h3 = document.querySelector('.question-title');
//     h3.textContent = quiz.question;
//     document.querySelector('.answers-box').innerHTML = '';

//     let id = 0;
//     quiz.answers.forEach(answer => {
        
//         let btn = document.createElement('button');
//         btn.classList.add('btn-style')
//         btn.textContent = answer;
//         btn.id = id;
//         document.querySelector('.answers-box').appendChild(btn);
//         id ++;
//     });

//     game();

//     document.querySelector('.btn-new').addEventListener('click', function(e){
//         renderQuestion();
//     })
// }


// let game = () => {
//         let p = document.createElement('p');
//         let btn = document.querySelector('.btn-style')
//         btn.addEventListener('click', function(e) {
//         let guess = btn.textContent;
        
//         if(guess === quiz.correctAnsw) {
//             console.log('Correct!!')
//             btn.classList.add('correct')
//             p.textContent = 'Correct!!'
//             document.querySelector('body').appendChild(p);
//         } else {
//             console.log('Try Again')
//             btn.classList.add('incorrect')
//         }
//     })
// }

// renderQuestion();

