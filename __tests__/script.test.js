const { uiUpdates, quizLogic, quizElements, initializeEventListeners } = require('../js/script.js');

beforeEach(() => {
    document.body.innerHTML = `
        <div id="main" style="display: block;">Main Menu</div>
        <div id="heading" style="display: none;">Quiz Heading</div>
        <div id="question-container" style="display: none;">Questions</div>
        <div id="options"></div>
        <div id="question"></div>
        <div id="queNum"></div>
        <div id="result-container" style="display: none;">Results</div>
        <div id="queDiv" style="display: block;"></div>
        <span id="score"></span>
        <span id="totalScore"></span>
        <div id="hint"></div>
        <div id="timer"></div>
        <button id="start-button">Start</button>
        <button id="next-button">Next</button>
        <span id="totalQue"></span>`;

    initializeEventListeners();

    Object.assign(quizElements, {
        currentQuestion: 0,
        score: 0,
        selectedAnswers: [],
        totalScore: 10,
        time: 25,
        questionsArr: [
            {
                id: 1,
                question: 'What does HTML stand for?',
                options: [
                    { id: 'a', text: 'Hyper Text Markup Language' },
                    { id: 'b', text: 'Hyper Text Preprocessor' },
                    { id: 'c', text: 'Hyper Text Multiple Language' }
                ],
                answer: 'b',
                type: 'multiple_choice',
                hint: 'Choose only one answer (1 mark)'
            },
            {
                id: 2,
                question: 'Which of the following are programming languages?',
                options: [
                    { id: 'a', text: 'Python' },
                    { id: 'b', text: 'Mercury' },
                    { id: 'c', text: 'Java' },
                    { id: 'd', text: 'Venus' }
                ],
                answer: ['a', 'c'],
                type: 'multiple_answer',
                hint: 'Choose 2 answers (1 mark for each )'
            },
            {
                id: 3,
                question: 'What does HTML stands for ?',
                answer: 'Hyper Text Markup Language',
                type: 'text_input',
                hint: 'Enter the answer (1 mark)'
            }
        ]
    });

    jest.useFakeTimers();
    global.clearInterval = jest.fn();
    global.setInterval = jest.fn(() => 'mocked-interval-id');
    global.alert = jest.fn();
});

describe('uiUpdates', () => {
    test('initQuiz should initialize the quiz correctly', () => {
        uiUpdates.initQuiz();
        expect(document.getElementById('main').style.display).toBe('none');
        expect(document.getElementById('question-container').style.display).toBe('flex');
        expect(document.getElementById('heading').style.display).toBe('flex');
    });

    test('renderQuestion should display the correct question', () => {
        uiUpdates.renderQuestion();
        expect(document.getElementById('question').textContent).toBe('1. What does HTML stand for?');
        expect(document.getElementById('queNum').textContent).toBe('1');
        expect(document.getElementById('options').children.length).toBe(3);
    });

    test('showResults should display the results correctly', () => {
        quizElements.score = 5;
        uiUpdates.showResults();
        expect(document.getElementById('question-container').style.display).toBe('none');
        expect(document.getElementById('result-container').style.display).toBe('flex');
        expect(document.getElementById('score').textContent).toBe('5');
        expect(document.getElementById('totalScore').textContent).toBe('10');
    });
});

describe('quizLogic', () => {
    test('handleOptionClick should update selectedAnswers for multiple_choice', () => {
        const btn = document.createElement('button');
        btn.dataset.id = 'a';
        quizLogic.handleOptionClick(btn, 'multiple_choice');
        expect(quizElements.selectedAnswers).toEqual(['a']);
    });

    test('handleOptionClick should update selectedAnswers for multiple_answer', () => {
        const btn1 = document.createElement('button');
        btn1.dataset.id = 'a';
        const btn2 = document.createElement('button');
        btn2.dataset.id = 'c';
        quizLogic.handleOptionClick(btn1, 'multiple_answer');
        quizLogic.handleOptionClick(btn2, 'multiple_answer');
        expect(quizElements.selectedAnswers).toEqual(['a', 'c']);
    });

    test('nextQuestion should move to the next question', () => {
        quizElements.selectedAnswers = ['b'];
        quizLogic.nextQuestion();
        jest.runAllTimers();
        expect(quizElements.currentQuestion).toBe(1);
        expect(quizElements.score).toBe(1);
    });

    test('startTimer should initialize and start the timer', () => {
        quizLogic.startTimer();
        expect(quizElements.timeLeft).toBe(25);
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(document.getElementById('timer').textContent).toBe('25s remaining');
    });

    test('autoSubmit should move to the next question when time runs out', () => {
        quizElements.currentQuestion = 0;
        quizElements.selectedAnswers = [];
        quizLogic.autoSubmit();
        expect(alert).toHaveBeenCalledWith('Time is up! No answer selected. Moving to the next question.');
        expect(quizElements.currentQuestion).toBe(1);
    });

    test('updateScore should update score for multiple_choice question correctly', () => {
        quizElements.selectedAnswers = ['b'];
        quizLogic.updateScore(quizElements.questionsArr[0]);
        expect(quizElements.score).toBe(1);
    });

    test('updateScore should update score for multiple_answer question correctly', () => {
        quizElements.currentQuestion = 1;
        quizElements.selectedAnswers = ['a', 'c'];
        quizLogic.updateScore(quizElements.questionsArr[1]);
        expect(quizElements.score).toBe(2);
    });

    test('checkSingleAnswer should validate single-choice answer correctly', () => {
        quizElements.selectedAnswers = ['b'];
        const currentQuestion = quizElements.questionsArr[0];
        quizLogic.checkSingleAnswer(currentQuestion);
        expect(quizElements.score).toBe(1);
    });

    test('checkMultipleAnswers should validate multiple-choice answers correctly', () => {
        quizElements.selectedAnswers = ['a', 'd'];
        const currentQuestion = quizElements.questionsArr[1];
        quizLogic.checkMultipleAnswers(currentQuestion);
        expect(quizElements.score).toBe(1);
    });

    test('shuffleOptions should shuffle the options array', () => {
        const options = [
            { id: 'a', text: 'Option 1' },
            { id: 'b', text: 'Option 2' },
            { id: 'c', text: 'Option 3' },
            { id: 'd', text: 'Option 4' }
        ];
        const shuffledOptions = quizLogic.shuffleOptions([...options]);
        expect(shuffledOptions).not.toEqual(options);
    });
});

