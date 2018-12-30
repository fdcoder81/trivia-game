import regeneratorRuntime from "regenerator-runtime";

let quiz = {
    question : '',
    answers: [],
    correctAnsw: ''
}


const getQuestion = async () => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=22&type=multiple`);
    if (response.status === 200) {
        let data = await response.json();
        quiz.question = data.results[0].question;
        quiz.answers = data.results[0].incorrect_answers;
        quiz.answers.push(data.results[0].correct_answer);
        quiz.correctAnsw = data.results[0].correct_answer;
        return data.results;
    } else {
        throw new Error('Unable to fetch');
    }
}


// RANDOMIZE ANSWERS ARRAY
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// RENDER QUIZ TO DOM
let renderQuestion = async () => {

    await getQuestion();
    console.log(quiz);
    shuffle(quiz.answers);

    let h3 = document.createElement('h3');
    h3.textContent = quiz.question;
    document.querySelector('.question-title').appendChild(h3);

    let id = 0;
    quiz.answers.forEach(answer => {
        
        let btn = document.createElement('button');
        btn.classList.add('btn-style')
        btn.textContent = answer;
        btn.id = id;
        document.querySelector('.answers-box').appendChild(btn);
        id ++;
    });

    game();

    document.querySelector('.btn-new').addEventListener('click', function(e){
        renderQuestion();
    })
}


let game = () => {
        let p = document.createElement('p');
        let btn = document.querySelector('.btn-style')
        btn.addEventListener('click', function(e) {
        console.log(btn.textContent);
        let guess = btn.textContent;
        
        if(guess === quiz.correctAnsw) {
            console.log('Correct!!')
            btn.classList.add('correct')
            p.textContent = 'Correct!!'
            document.querySelector('body').appendChild(p);
        } else {
            console.log('Try Again')
            btn.classList.add('incorrect')
        }
    })
}

renderQuestion();

