const quizElements = {
    currentQuestion: 0,
    score: 0,
    selectedAnswers: [],
    totalScore: 10,
    time: 10,
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

const uiUpdates = {
    initQuiz: () => {
        uiUpdates.showMainElements();
        uiUpdates.renderQuestion();
    },

    showMainElements: () => {
        const questionContainer = document.getElementById('question-container');
        const heading = document.getElementById('heading');
        const main = document.getElementById('main');
        if (questionContainer) questionContainer.style.display = 'flex';
        if (heading) heading.style.display = 'flex';
        if (main) main.style.display = 'none';
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
        const questionEle = document.getElementById('question');
        const hint = document.getElementById('hint');
        const questionNum = document.getElementById('queNum');
        if (questionEle) questionEle.textContent = `${currentQuestion.id}. ${currentQuestion.question}`;
        if (hint) hint.textContent = currentQuestion.hint;
        if (questionNum) questionNum.textContent = currentQuestion.id;
    },

    clearOptions: () => {
        const options = document.getElementById('options');
        if (options) options.innerHTML = '';
    },

    renderOptions: (currentQuestion) => {
        quizElements.selectedAnswers = [];
        if (currentQuestion.type === 'text_input') {
            uiUpdates.renderTextInput();
        } else {
            const shuffledOptions = quizLogic.shuffleOptions([...currentQuestion.options]);
            uiUpdates.renderOptionButtons(shuffledOptions, currentQuestion.type);
        }
    },

    renderTextInput: () => {
        const options = document.getElementById('options');
        if (options) {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('text-input');
            options.appendChild(input);
        }
    },

    renderOptionButtons: (optionList, type) => {
        const options = document.getElementById('options');
        if (options) {
            optionList.forEach(option => {
                const btn = uiUpdates.createOptionButton(option);
                btn.addEventListener('click', () => quizLogic.handleOptionClick(btn, type));
                options.appendChild(btn);
            });
        }
    },

    createOptionButton: (option) => {
        const btn = document.createElement('button');
        btn.textContent = option.text || option;
        btn.classList.add('btn');
        btn.dataset.id = option.id || option;
        return btn;
    },

    updateQuestionCount: () => {
        const totalQuestion = document.getElementById('totalQue');
        if (totalQuestion) totalQuestion.textContent = quizElements.questionsArr.length;
    },

    showResults: () => {
        const questionContainer = document.getElementById('question-container');
        const resultContainer = document.getElementById('result-container');
        const queDiv = document.getElementById('queDiv');
        const finalScore = document.getElementById('score');
        const totalScore = document.getElementById('totalScore');
        if (questionContainer) questionContainer.style.display = 'none';
        if (resultContainer) resultContainer.style.display = 'flex';
        if (queDiv) queDiv.style.display = 'none';
        if (finalScore) finalScore.textContent = quizElements.score;
        if (totalScore) totalScore.textContent = quizElements.totalScore;
    },

    updateTimerDisplay: () => {
        const timerDisplay = document.getElementById('timer');
        if (timerDisplay) timerDisplay.textContent = `${quizElements.timeLeft}s remaining`;
    },

    highlightAnswer: (currentQuestion) => {
        if (currentQuestion.type === 'text_input') {
            const input = document.querySelector('.text-input');
            if (input) {
                if (quizElements.selectedAnswers[0].toLowerCase() === currentQuestion.answer.toLowerCase()) {
                    input.style.borderColor = '#12d338';
                } else {
                    input.style.borderColor = 'red';
                }
            }
        } else {
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                if (currentQuestion.answer.includes(button.dataset.id)) {
                    button.style.borderColor = '#12d338';
                } else if (quizElements.selectedAnswers.includes(button.dataset.id)) {
                    button.style.borderColor = 'red';
                } else if (currentQuestion.type === 'multiple_answer') {
                    if (currentQuestion.answer.includes(button.dataset.id)) {
                        button.style.borderColor = '#12d338';
                    } else if (quizElements.selectedAnswers.includes(button.dataset.id)) {
                        button.style.borderColor = 'red';
                    }
                }
            });
        }
    }
};

const quizLogic = {
    handleOptionClick: (btn, type) => {
        if (type === 'multiple_choice' || type === "true_false") {
            quizLogic.handleSingleSelection(btn);
        } else if (type === 'multiple_answer') {
            quizLogic.handleMultipleSelection(btn);
        }
    },

    handleSingleSelection: (btn) => {
        quizLogic.clearButtonStyles();
        quizElements.selectedAnswers = [btn.dataset.id];
        btn.style.borderColor = '#7ACC8C';
    },

    handleMultipleSelection: (btn) => {
        const index = quizElements.selectedAnswers.indexOf(btn.dataset.id);
        if (index > -1) {
            quizElements.selectedAnswers.splice(index, 1);
            btn.style.borderColor = '';
        } else if (quizElements.selectedAnswers.length < 2) {
            quizElements.selectedAnswers.push(btn.dataset.id);
            btn.style.borderColor = '#7ACC8C';
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
        if (currentQuestion.type === 'text_input') {
            quizLogic.handleTextInputAnswer();
        } else if (quizElements.selectedAnswers.length === 0) {
            alert('Please select an answer');
            return;
        }
        quizLogic.updateScore(currentQuestion);
        uiUpdates.highlightAnswer(currentQuestion);
        setTimeout(() => {
            quizLogic.moveToNextQuestion()
        }, 500)
    },

    handleTextInputAnswer: () => {
        const input = document.querySelector('.text-input');
        if (input && !input.value) {
            alert('Please enter an answer');
            return;
        }
        if (input) quizElements.selectedAnswers = [input.value.trim()];
    },

    updateScore: (currentQuestion) => {
        if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') {
            quizLogic.checkSingleAnswer(currentQuestion);
        } else if (currentQuestion.type === 'multiple_answer') {
            quizLogic.checkMultipleAnswers(currentQuestion);
        } else if (currentQuestion.type === 'text_input') {
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
                quizLogic.autoSubmit();
            }
        }, 600);
    },

    autoSubmit: () => {
        if (quizElements.selectedAnswers.length === 0) {
            alert('Time is up! No answer selected. Moving to the next question.');
            quizLogic.moveToNextQuestion(true);
        } else {
            quizLogic.nextQuestion();
        }
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
        return options.sort(() => Math.random() - 0.5);
    }
};

const initializeEventListeners = () => {
    const startBtn = document.getElementById('start-button');
    const nextBtn = document.getElementById('next-button');

    if (startBtn) startBtn.addEventListener('click', () => uiUpdates.initQuiz());
    if (nextBtn) nextBtn.addEventListener('click', () => quizLogic.nextQuestion());
};

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
}

module.exports = { uiUpdates, quizLogic, quizElements, initializeEventListeners };