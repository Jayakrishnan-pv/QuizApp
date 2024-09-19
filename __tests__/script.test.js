const {
    quizElements,
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
    renderTextInput,
    highlightTextInput,
    initializeEventListeners
} = require('../js/script.js');

const fs = require('fs');
const path = require('path')

beforeEach(() => {
    document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), "utf-8");
    initializeEventListeners();
    quizElements.selectedAnswers = [];
    quizElements.score = 0;
    jest.useFakeTimers();
    global.clearInterval = jest.fn();
    global.setInterval = jest.fn(() => 'mocked-interval-id');
    global.alert = jest.fn();
});

test('initQuiz should initialize the quiz correctly', () => {
    initQuiz();
    expect(document.getElementById('main').style.display).toBe('none');
    expect(document.getElementById('question-container').style.display).toBe('flex');
    expect(document.getElementById('heading').style.display).toBe('flex');
});

test('renderQuestion should display the correct question', () => {
    renderQuestion();
    expect(document.getElementById('question').textContent).toBe('1. What does HTML stand for?');
    expect(document.getElementById('queNum').textContent).toBe('1');
    expect(document.getElementById('options').children.length).toBe(3);
});

test('showResults should display the results correctly', () => {
    quizElements.score = 5;
    showResults();
    expect(document.getElementById('question-container').style.display).toBe('none');
    expect(document.getElementById('result-container').style.display).toBe('flex');
    expect(document.getElementById('score').textContent).toBe('5');
    expect(document.getElementById('totalScore').textContent).toBe('10');
});

test('handleOptionClick should update selectedAnswers for multiple_choice', () => {
    const btn = document.createElement('button');
    btn.dataset.id = 'a';
    handleOptionClick(btn, 'multiple_choice');
    expect(quizElements.selectedAnswers).toEqual(['a']);
});

test('handleOptionClick should update selectedAnswers for multiple_answer', () => {
    const btn1 = document.createElement('button');
    btn1.dataset.id = 'a';
    const btn2 = document.createElement('button');
    btn2.dataset.id = 'c';
    handleOptionClick(btn1, 'multiple_answer');
    handleOptionClick(btn2, 'multiple_answer');
    expect(quizElements.selectedAnswers).toEqual(['a', 'c']);
});

test('nextQuestion should move to the next question', () => {
    quizElements.selectedAnswers = ['b'];
    nextQuestion();
    jest.runAllTimers();
    expect(quizElements.currentQuestion).toBe(1);
});

test('startTimer should initialize and start the timer', () => {
    startTimer();
    expect(quizElements.timeLeft).toBe(10);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(document.getElementById('timer').textContent).toBe('10s remaining');
});

test('autoSubmit should move to the next question when time runs out', () => {
    quizElements.currentQuestion = 0;
    quizElements.selectedAnswers = [];
    autoSubmit();
    expect(alert).toHaveBeenCalledWith('Time is up! No answer selected. Moving to the next question.');
    expect(quizElements.currentQuestion).toBe(1);
});

test('updateScore should update score for multiple_choice question correctly', () => {
    quizElements.selectedAnswers = ['b'];
    updateScore(quizElements.questionsArr[0]);
    expect(quizElements.score).toBe(1);
});

test('updateScore should update score for multiple_answer question correctly', () => {
    quizElements.currentQuestion = 1;
    quizElements.selectedAnswers = ['a', 'c'];
    updateScore(quizElements.questionsArr[6]);
    expect(quizElements.score).toBe(2);
});

test('shuffleOptions should shuffle the options array', () => {
    const options = [
        {id: 'a', text: 'Option 1'},
        {id: 'b', text: 'Option 2'},
        {id: 'c', text: 'Option 3'},
        {id: 'd', text: 'Option 4'}
    ];
    const shuffledOptions = shuffleOptions([...options]);
    expect(shuffledOptions).not.toEqual(options);
});

test('addNewQuestion should add new question into questionsArr', () => {
    const initialLength = quizElements.questionsArr.length;
    const newQuestion = {
        question: 'What is the capital of Germany?',
        options: [
            { id: 'a', text: 'Paris' },
            { id: 'b', text: 'London' },
            { id: 'c', text: 'Berlin' },
        ],
        answer: 'c',
        type: 'multiple_choice',
        hint: 'Choose only one answer (1 mark)'
    };

    addNewQuestion(
        newQuestion.question,
        newQuestion.options,
        newQuestion.answer,
        newQuestion.type,
        newQuestion.hint
    );

    expect(quizElements.questionsArr.length).toBe(initialLength + 1);
    expect(quizElements.questionsArr[quizElements.questionsArr.length - 1]).toMatchObject(newQuestion);
});

test('calculateTotalScore should calculate the total score correctly', () => {
    quizElements.questionsArr.length = 0;
    quizElements.questionsArr.push(
        { answer: 'a' },
        { answer: 'b' },
        { answer: 'c' }
    );
    const totalScore = calculateTotalScore();
    expect(totalScore).toBe(3);
});

test('renderTextInput should create and append a text input element', () => {
    const optionsContainer = document.createElement('div');
    optionsContainer.id = 'options';
    document.body.appendChild(optionsContainer);
    renderTextInput();
    const input = document.querySelector('.text-input');
    expect(input).not.toBeNull();
    expect(input.type).toBe('text');
});

test('highlightTextInput should set the border color based on the answer correctness', () => {
    const input = document.createElement('input');
    input.classList.add('text-input');
    document.body.appendChild(input);
    quizElements.borderColor = { correct: 'green', incorrect: 'red' };
    quizElements.selectedAnswers = ['html'];
    highlightTextInput('html', 'html', quizElements.borderColor);
    expect(input.style.borderColor).toBe('green');
    highlightTextInput('html', 'css', quizElements.borderColor);
    expect(input.style.borderColor).toBe('red');
});
