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
const totalQuestion = document.getElementById('totalQue');
const totalScore = document.getElementById('totalScore');
const timerDisplay = document.getElementById('timer');
const hint = document.getElementById('hint');
const queDiv = document.getElementById('queDiv');

const quizElements = {
    currentQuestion: 0,
    score: 0,
    selectedAnswers: [],
    totalScore: 10,
    time: 60,
    questionsArr: [
        {
            id: 1,
            question: 'What does HTML stands for ?',
            options: [
                {id: 'a', text: 'Hyper Text Preprocessor'},
                {id: 'b', text: 'Hyper Text Markup Language'},
                {id: 'c', text: 'Hyper Text Multiple Language'}
            ],
            answer: 'b',
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
        },
        {
            id: 2,
            question: 'What does CSS stands for ?',
            options: [
                {id: 'a', text: 'Cascading Style Sheets'},
                {id: 'b', text: 'Cascading Sheets Style '},
                {id: 'c', text: 'Cascading Style Shape'}
            ],
            answer: 'a',
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
        },
        {
            id: 3,
            question: 'What does JS stands for ?',
            options: [
                {id: 'a', text: 'Json Script'},
                {id: 'b', text: 'Javascript'},
                {id: 'c', text: 'Java Style'},

            ],
            answer: 'b',
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
        },
        {
            id: 4,
            question: 'What does URL stands for ?',
            options: [
                {id: 'a', text: 'Uniform Resource Location'},
                {id: 'b', text: 'Unit Resource Locator'},
                {id: 'c', text: 'Uniform Resource Locator'}
            ],
            answer: 'c',
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
        },
        {
            id: 5,
            question: 'What does WWW stands for ?',
            options: [
                {id: 'a', text: 'Web World Wide'},
                {id: 'b', text: 'World Wide Web'},
                {id: 'c', text: 'Web Wide World'}
            ],
            answer: 'b',
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
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
            type: 'multiple_choice',
            hint: 'Choose only one answer (1 mark)'
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
            type: 'multiple_answer',
            hint: 'Choose 2 answers (1 mark for each )'
        },
        {
            id: 8,
            question: "The coffee is originally from Brazil.",
            options: ['True', 'False'],
            type: "true_false",
            answer: "False",
            hint: 'Choose True or False  (1 mark)'
        }, {
            id: 9,
            question: 'What does HTML stands for ?',
            answer: 'some text',
            type: 'text_input',
            hint: 'Enter the answer (1 mark)'
        },
    ],
};

const questionType = {
    multipleChoice: 'multiple_choice',
    multipleAnswer: 'multiple_answer',
    trueFalse: 'true_false',
    textInput: 'text_input'
};

const uiUpdates = {
    initQuiz: () => {
        uiUpdates.showMainElements();
        uiUpdates.renderQuestion();
    },

    showMainElements: () => {
        questionContainer.style.display = 'flex';
        heading.style.display = 'flex';
        main.style.display = 'none';
    },

    renderQuestion: () => {
        const currentQuestion = quizElements.questionsArr[quizElements.currentQuestion];
        uiUpdates.displayQuestionText(currentQuestion);
        uiUpdates.clearOptions();
        uiUpdates.renderOptions(currentQuestion);
        uiUpdates.updateQuestionCount();
        quizLogic.startTimer();
    },

    displayQuestionText: (currentQuestion) => {
        questionEle.textContent = `${currentQuestion.id}. ${currentQuestion.question}`;
        hint.textContent = currentQuestion.hint;
        questionNum.textContent = currentQuestion.id;
    },

    clearOptions: () => {
        options.innerHTML = '';
    },

    renderOptions: (currentQuestion) => {
        quizElements.selectedAnswers = [];
        if (currentQuestion.type === questionType.textInput) {
            uiUpdates.renderTextInput();
        } else {
            const shuffledOptions = quizLogic.shuffleOptions([...currentQuestion.options]);
            uiUpdates.renderOptionButtons(shuffledOptions, currentQuestion.type);
        }
    },

    renderTextInput: () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('text-input');
        options.appendChild(input);
    },

    renderOptionButtons: (optionList, type) => {
        optionList.forEach(option => {
            const btn = uiUpdates.createOptionButton(option);
            btn.addEventListener('click', () => quizLogic.handleOptionClick(btn, type));
            options.appendChild(btn);
        });
    },

    createOptionButton: (option) => {
        const btn = document.createElement('button');
        btn.textContent = option.text || option;
        btn.classList.add('btn');
        btn.dataset.id = option.id || option;
        return btn;
    },

    updateQuestionCount: () => {
        totalQuestion.textContent = quizElements.questionsArr.length;
    },

    showResults: () => {
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'flex';
        queDiv.style.display = 'none';
        finalScore.textContent = quizElements.score;
        totalScore.textContent = quizElements.totalScore;
    },

    updateTimerDisplay: () => {
        timerDisplay.textContent = `${quizElements.timeLeft} seconds remaining`;
    }
};

const quizLogic = {
    handleOptionClick: (btn, type) => {
        if (type === questionType.multipleChoice || type === questionType.trueFalse) {
            quizLogic.handleSingleSelection(btn);
        } else if (type === questionType.multipleAnswer) {
            quizLogic.handleMultipleSelection(btn);
        }
    },

    handleSingleSelection: (btn) => {
        quizLogic.clearButtonStyles();
        quizElements.selectedAnswers = [btn.dataset.id];
        btn.style.borderColor = 'red';
    },

    handleMultipleSelection: (btn) => {
        const index = quizElements.selectedAnswers.indexOf(btn.dataset.id);
        if (index > -1) {
            quizElements.selectedAnswers.splice(index, 1);
            btn.style.borderColor = '';
        } else if (quizElements.selectedAnswers.length < 2) {
            quizElements.selectedAnswers.push(btn.dataset.id);
            btn.style.borderColor = 'red';
        } else {
            alert('Please select 2 answers');
        }
    },

    clearButtonStyles: () => {
        document.querySelectorAll('.btn').forEach(button => {
            button.style.borderColor = '';
        });
    },

    nextQuestion: () => {
        const currentQuestion = quizElements.questionsArr[quizElements.currentQuestion];
        if (currentQuestion.type === questionType.textInput) {
            quizLogic.handleTextInputAnswer();
        } else if (quizElements.selectedAnswers.length === 0) {
            alert('Please select an answer');
            return;
        }
        quizLogic.updateScore(currentQuestion);
        quizLogic.moveToNextQuestion();
    },

    handleTextInputAnswer: () => {
        const input = document.querySelector('.text-input');
        if (!input.value) {
            alert('Please enter an answer');
            return;
        }
        quizElements.selectedAnswers = [input.value.trim()];
    },

    updateScore: (currentQuestion) => {
        if (currentQuestion.type === questionType.multipleChoice || currentQuestion.type === questionType.trueFalse) {
            quizLogic.checkSingleAnswer(currentQuestion);
        } else if (currentQuestion.type === questionType.multipleAnswer) {
            quizLogic.checkMultipleAnswers(currentQuestion);
        } else if (currentQuestion.type === questionType.textInput) {
            quizLogic.checkTextInputAnswer(currentQuestion);
        }
    },

    checkSingleAnswer: (currentQuestion) => {
        if (quizElements.selectedAnswers[0] === currentQuestion.answer) {
            quizElements.score++;
        }
    },

    checkMultipleAnswers: (currentQuestion) => {
        currentQuestion.answer.forEach(correctAnswer => {
            if (quizElements.selectedAnswers.includes(correctAnswer)) {
                quizElements.score++;
            }
        });
    },

    checkTextInputAnswer: (currentQuestion) => {
        if (quizElements.selectedAnswers[0].toLowerCase() === currentQuestion.answer.toLowerCase()) {
            quizElements.score++;
        }
    },
    
    startTimer: () => {
        quizElements.timeLeft = quizElements.time;
        uiUpdates.updateTimerDisplay();
        clearInterval(quizElements.timerInterval);
        quizElements.timerInterval = setInterval(() => {
            quizElements.timeLeft--;
            uiUpdates.updateTimerDisplay();
            if (quizElements.timeLeft === 0) {
                clearInterval(quizElements.timerInterval);
                quizLogic.moveToNextQuestion();
            }
        }, 1000);
    },

    moveToNextQuestion: () => {
        clearInterval(quizElements.timerInterval);
        quizElements.currentQuestion++;
        if (quizElements.currentQuestion < quizElements.questionsArr.length) {
            uiUpdates.renderQuestion();
        } else {
            uiUpdates.showResults();
        }
    },

    shuffleOptions: (options) => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    }
};

startBtn.addEventListener('click', () => uiUpdates.initQuiz());
nextBtn.addEventListener('click', () => quizLogic.nextQuestion());
