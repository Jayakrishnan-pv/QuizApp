const startBtn = document.getElementById('start-button');
const nextBtn = document.getElementById('next-button');
const main = document.getElementById('main');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const heading = document.getElementById('heading');
const questionEle = document.getElementById('question');
const options = document.getElementById('options');
const questionNum = document.getElementById('queNum');
const finalScore = document.getElementById('score');

const questionsArr = [
    {
        id: 1,
        question: 'What does HTML stands for ?',
        answer: 'Hyper Text Markup Language',
        options: ['Hyper Text Preprocessor', 'Hyper Text Markup Language', 'Hyper Text Multiple Language'],
        type: 'multiple_choice'
    }, {
        id: 2,
        question: 'What does CSS stands for ?',
        answer: 'Cascading Style Sheets',
        options: ['Cascading Style Sheets', 'Cascading Sheets Style ', 'Cascading Style Shape'],
        type: 'multiple_choice'
    }, {
        id: 3,
        question: 'What does JS stands for ?',
        answer: 'Javascript',
        options: ['Java Style', 'Json Script', 'Javascript'],
        type: 'multiple_choice'
    }, {
        id: 4,
        question: 'What does URL stands for ?',
        answer: 'Uniform Resource Locator',
        options: ['Uniform Resource Location', 'Unit Resource Locator', 'Uniform Resource Locator'],
        type: 'multiple_choice'
    }, {
        id: 5,
        question: 'What does WWW stands for ?',
        answer: 'World Wide Web',
        options: ['Web World Wide', 'World Wide Web', 'Web Wide World'],
        type: 'multiple_choice'
    },
    {
        id: 6,
        question: "What is the capital of France?",
        options: [
            {id: 'a', text: "Paris"},
            {id: 'b', text: "London"},
            {id: 'c', text: "Berlin"}
        ],
        answer: 'a',
        type: 'multiple_choice'
    },
    {
        id: 7,
        question: "Which of the following are programming languages?",
        options: [
            {id: 'a', text: "Python"},
            {id: 'b', text: "Mercury"},
            {id: 'c', text: "Java"},
            {id: 'd', text: "Venus"}
        ],
        answer: ['a', 'c'],
        type: 'multiple_answer'
    },
    {
        id: 8,
        question: "True or False: The coffee is originally from Brazil.",
        options: ['True', 'False'],
        type: "true_false",
        answer: "False"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = []

const hideShow = () => {
    questionContainer.style.display = "flex";
    heading.style.display = "flex";
    main.style.display = "none";
    showQuestion();
};

const showQuestion = () => {
    const current = questionsArr[currentQuestion];
    questionEle.textContent = current.id + '. ' + current.question;
    questionNum.textContent = current.id;
    options.innerHTML = '';
    selectedAnswers = [];

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.text || option;
        btn.classList.add('btn');
        btn.dataset.id = option.id || option;
        btn.addEventListener('click', () => selectAnswer(btn, current.type));
        options.appendChild(btn);
    });
};

const selectAnswer = (btn, type) => {
    if (type === 'multiple_choice' || type === 'true_false') {
        document.querySelectorAll('.btn').forEach(button => {
            button.style.borderColor = '';
        });
        selectedAnswers = [btn.dataset.id];
        btn.style.borderColor = '#7ACC8C';
    } else if (type === 'multiple_answer') {
        const index = selectedAnswers.indexOf(btn.dataset.id);
        if (index > -1) {
            selectedAnswers.splice(index, 1);
            btn.style.borderColor = '';
        } else {
            selectedAnswers.push(btn.dataset.id);
            btn.style.borderColor = '#7ACC8C';
        }
    }
};

const next = () => {
    const current = questionsArr[currentQuestion];

    if (selectedAnswers.length === 0) {
        alert("Please select an answer");
        return;
    }

    if (current.type === 'multiple_choice' || current.type === 'true_false') {
        if (selectedAnswers[0] === current.answer) score++;
    } else if (current.type === 'multiple_answer') {
        if (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(current.answer.sort())) score++;
    }

    currentQuestion++;
    if (currentQuestion < questionsArr.length) {
        showQuestion();
    } else {
        showResult();
    }
};

const showResult = () => {
    questionContainer.style.display = "none";
    resultContainer.style.display = "flex";
    finalScore.textContent = score;
};

startBtn.addEventListener('click', hideShow);
nextBtn.addEventListener('click', next);
