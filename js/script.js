const quizElements = {
    currentQuestion: 0,
    score: 0,
    selectedAnswers: [],
    totalScore: 0,
    time: 10,
};

const questionsArr = [
    {
        id: 1,
        question: 'What does HTML stand for?',
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
    }, 
    {
        id: 9,
        question: 'What does HTML stands for ?',
        answer: 'some text',
        type: 'text_input',
        hint: 'Enter the answer (1 mark)'
    },
]


const initQuiz = () => {
    const questionContainer = document.getElementById('question-container');
    const heading = document.getElementById('heading');
    const main = document.getElementById('main');
    if (questionContainer) questionContainer.style.display = 'flex';
    if (heading) heading.style.display = 'flex';
    if (main) main.style.display = 'none';
    calculateTotalScore();
    renderQuestion();
}

const calculateTotalScore = () => {
    let totalScore = 0;
    questionsArr.forEach(question => {
        if (Array.isArray(question.answer)) {
            totalScore += question.answer.length; 
        } else {
            totalScore += 1;
        }
    });
    quizElements.totalScore = totalScore;
    return totalScore
}; 

const renderQuestion = () => {
    const currentQuestion = questionsArr[quizElements.currentQuestion];
    displayQuestionText(currentQuestion);
    clearOptions();
    renderOptions(currentQuestion);
    updateQuestionCount();
    startTimer();
}

const displayQuestionText = (currentQuestion) => {
    const questionEle = document.getElementById('question');
    const hint = document.getElementById('hint');
    const questionNum = document.getElementById('queNum');
    if (questionEle) questionEle.textContent = `${currentQuestion.id}. ${currentQuestion.question}`;
    if (hint) hint.textContent = currentQuestion.hint;
    if (questionNum) questionNum.textContent = currentQuestion.id;
}

const clearOptions = () => {
    const options = document.getElementById('options');
    if (options) options.innerHTML = '';
}

const renderOptions = (currentQuestion) => {
    quizElements.selectedAnswers = [];
    if (currentQuestion.type === 'text_input') {
        renderTextInput();
    } else {
        const shuffledOptions = shuffleOptions([...currentQuestion.options]);
        renderOptionButtons(shuffledOptions, currentQuestion.type);
    }
}

const renderTextInput = () => {
    const options = document.getElementById('options');
    if (options) {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('text-input');
        options.appendChild(input);
    }
}

const renderOptionButtons = (optionList, type) => {
    const options = document.getElementById('options');
    if (options) {
        clearOptions();
        optionList.forEach(option => {
            const btn = createOptionButton(option);
            btn.addEventListener('click', () => handleOptionClick(btn, type));
            options.appendChild(btn);
        });
    }
}

const createOptionButton = (option) => {
    const btn = document.createElement('button');
    btn.textContent = option.text || option;
    btn.classList.add('btn');
    btn.dataset.id = option.id || option;
    return btn;
}

const updateQuestionCount = () => {
    const totalQuestion = document.getElementById('totalQue');
    if (totalQuestion) totalQuestion.textContent = questionsArr.length.toString();
}

const showResults = () => {
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
}

const updateTimerDisplay = () => {
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) timerDisplay.textContent = `${quizElements.timeLeft}s remaining`;
};

const highlightAnswer = (currentQuestion) => {
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
};

const handleOptionClick = (btn, type) => {
    if (type === 'multiple_choice' || type === "true_false") {
        handleSingleSelection(btn);
    } else if (type === 'multiple_answer') {
        handleMultipleSelection(btn);
    }
}

const handleSingleSelection = (btn) => {
    clearButtonStyles();
    quizElements.selectedAnswers = [btn.dataset.id];
    btn.style.borderColor = '#7ACC8C';
}

const handleMultipleSelection = (btn) => {
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
}

const clearButtonStyles = () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.style.borderColor = '';
    });
}

const nextQuestion = () => {
    const currentQuestion = questionsArr[quizElements.currentQuestion];
    if (currentQuestion.type === 'text_input') {
        handleTextInputAnswer();
    } else if (quizElements.selectedAnswers.length === 0) {
        alert('Please select an answer');
        return;
    }
    updateScore(currentQuestion);
    highlightAnswer(currentQuestion);
    setTimeout(() => {
        moveToNextQuestion()
    }, 500)
}

const handleTextInputAnswer = () => {
    const input = document.querySelector('.text-input');
    if (input && !input.value) {
        alert('Please enter an answer');
        return;
    }
    if (input) quizElements.selectedAnswers = [input.value.trim()];
}

const updateScore = (currentQuestion) => {
    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') {
        checkSingleAnswer(currentQuestion);
    } else if (currentQuestion.type === 'multiple_answer') {
        checkMultipleAnswers(currentQuestion);
    } else if (currentQuestion.type === 'text_input') {
        checkTextInputAnswer(currentQuestion);
    }
}

const checkSingleAnswer = (currentQuestion) => {
    if (quizElements.selectedAnswers[0] === currentQuestion.answer) {
        quizElements.score++;
    }
}

const checkMultipleAnswers = (currentQuestion) => {
    currentQuestion.answer.forEach(correctAnswer => {
        if (quizElements.selectedAnswers.includes(correctAnswer)) {
            quizElements.score++;
        }
    });
}

const checkTextInputAnswer = (currentQuestion) => {
    if (quizElements.selectedAnswers[0].toLowerCase() === currentQuestion.answer.toLowerCase()) {
        quizElements.score++;
    }
}

const startTimer = () => {
    quizElements.timeLeft = quizElements.time;
    updateTimerDisplay();
    clearInterval(quizElements.timerInterval);
    quizElements.timerInterval = setInterval(() => {
        quizElements.timeLeft--;
        updateTimerDisplay();
        if (quizElements.timeLeft === 0) {
            clearInterval(quizElements.timerInterval);
            autoSubmit();
        }
    }, 1000);
}

const autoSubmit = () => {
    if (quizElements.selectedAnswers.length === 0) {
        alert('Time is up! No answer selected. Moving to the next question.');
        moveToNextQuestion(true);
    } else {
        nextQuestion();
    }
}

const moveToNextQuestion = () => {
    clearInterval(quizElements.timerInterval);
    quizElements.currentQuestion++;
    if (quizElements.currentQuestion < questionsArr.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
}

const addNewQuestion = (question,options = [], answer,type,hint) => {
    const newQuestion = {
        id: questionsArr.length +1,
        question: question,
        options: options,
        answer: answer,
        type: type,
        hint: hint,
    }
    questionsArr.push(newQuestion)
}


const initializeEventListeners = () => {
    const startBtn = document.getElementById('start-button');
    const nextBtn = document.getElementById('next-button');
    if (startBtn) startBtn.addEventListener('click', () => initQuiz());
    if (nextBtn) nextBtn.addEventListener('click', () => nextQuestion());
};

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
}

module.exports = {
    quizElements,
    questionsArr,
    initQuiz,
    calculateTotalScore,
    renderQuestion,
    showResults,
    handleOptionClick,
    nextQuestion,
    updateScore,
    startTimer,
    autoSubmit,
    shuffleOptions,
    addNewQuestion,
    initializeEventListeners
};