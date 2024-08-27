const startBtn = document.getElementById('start-button');
const nextBtn = document.getElementById('next-button');
const main = document.getElementById('main')
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container')
const heading = document.getElementById('heading');
const questionEle = document.getElementById('question');
const options = document.getElementById('options');
const questionNum = document.getElementById('queNum');
const finalScore = document.getElementById('score');

const questionsArr = [
    {
        question: 'What does HTML stands for ?', answer: 'Hyper Text Markup Language',
        options: ['Hyper Text Preprocessor', 'Hyper Text Markup Language', 'Hyper Text Multiple Language']
    }, {
        question: 'What does CSS stands for ?', answer: 'Cascading Style Sheets',
        options: ['Cascading Style Sheets', 'Cascading Sheets Style ', 'Cascading Style Shape']
    }, {
        question: 'What does JS stands for ?', answer: 'Javascript',
        options: ['Java Style', 'Json Script', 'Javascript'],
    }, {
        question: 'What does URL stands for ?', answer: 'Uniform Resource Locator',
        options: ['Uniform Resource Location', 'Unit Resource Locator', 'Uniform Resource Locator']
    }, {
        question: 'What does WWW stands for ?', answer: 'World Wide Web',
        options: ['Web World Wide', 'World Wide Web', 'Web Wide World']
    },
]


let currentQuestion = 0;
let score = 0;
let selectedAnswer = ''

const hideShow = () => {
    questionContainer.style.display = "flex";
    heading.style.display = "flex";
    main.style.display = "none";
    showQuestion();
};

const showQuestion = () => {
    const current = questionsArr[currentQuestion];
    const index = currentQuestion + 1;
    questionEle.textContent = index + '.' + current.question;
    questionNum.textContent = index;
    options.innerHTML = '';
    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('btn');
        btn.addEventListener('click', () => {
            selectedAnswer = option;
            btn.classList.add('selected')
        });
        options.appendChild(btn);
    })
}

const next = () => {
    const current = questionsArr[currentQuestion];

    if (selectedAnswer === '') {
        alert("please select an answer")
        return;
    } 
     if (selectedAnswer === current.answer) {
        score++;
    }
        currentQuestion++;
    if (currentQuestion < questionsArr.length) {
        showQuestion();
    } else {
        showResult();
    }
}

const showResult = () => {
    questionContainer.style.display = "none";
    resultContainer.style.display = "flex";
    finalScore.textContent = score;
}


startBtn.addEventListener('click', hideShow)
nextBtn.addEventListener('click', next);