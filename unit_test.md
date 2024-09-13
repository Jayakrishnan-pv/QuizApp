# Unit Tests for Quiz Application

## Table of Contents
1. [UI Updates Tests](#ui-updates-tests)
2. [Quiz Logic Tests](#quiz-logic-tests)

---

## UI Updates Tests

### 1. `initQuiz()`
- **Test Description**: Verify that the quiz initialization hides the main container, shows the quiz container, and displays the first question.
- **Expected Behavior**:
  - The `main` element should be hidden.
  - The `questionContainer` and `heading` elements should be displayed.
  - The first question should be rendered correctly.

### 2. `renderQuestion()`
- **Test Description**: Ensure that the correct question and options are displayed.
- **Expected Behavior**:
  - The `questionEle` element should display the correct question.
  - The `options` container should render the correct number of buttons or input fields.
  - The `timer` should start counting down.

### 3. `showResults()`
- **Test Description**: Ensure that the results screen is displayed correctly.
- **Expected Behavior**:
  - The `resultContainer` should be displayed.
  - The final score and total score should be displayed correctly.

-------------------------------------------------------------------------------------------------------------------

## Quiz Logic Tests

### 1. `handleOptionClick()`
- **Test Description**: Ensure that clicking an option properly updates the selected answer(s) based on the question type.
- **Test Cases**:
  - For `multiple_choice` or `true_false`, only one option should be selected at a time.
  - For `multiple_answer`, up to two options should be selectable.
- **Expected Behavior**:
  - The correct answer should be stored in `quizElements.selectedAnswers` and highlighted accordingly.

### 2. `nextQuestion()`
- **Test Description**: Validate the logic of moving to the next question.
- **Test Cases**:
  - Ensure the current question is updated.
  - Validate that the new question is rendered correctly.
  - Ensure the timer is reset for the next question.

### 3. `startTimer()`
- **Test Description**: Ensure that the timer starts and updates correctly.
- **Expected Behavior**:
  - The timer should count down from the initial time and stop when it reaches zero.
  - If the timer reaches zero, the question should auto-submit.

### 4. `autoSubmit()`
- **Test Description**: Confirm that the quiz moves to the next question when the timer reaches zero.
- **Expected Behavior**:
  - If no answer is selected and the timer expires, an alert should be shown, and the quiz should proceed to the next question.

### 5. `updateScore()`
- **Test Description**: Ensure that the score is correctly updated based on the user's answers.
- **Test Cases**:
  - For `multiple_choice` and `true_false` questions, verify that the score increments correctly if the answer is correct.
  - For `multiple_answer` questions, verify that the score increments for each correct answer.

### 6. `shuffleOptions()`
- **Test Description**: Test that the options are properly shuffled before being displayed.
- **Expected Behavior**:
  - The order of options should be randomized each time the function is called.

### 7. `addNewQuestion()`
- **Test Description**: addNewQuestion should add new question into questionsArr.
- **Expected Behavior**:
  - The function should add new questions object to questionArr.

### 8. `calculateTotalScore()`
- **Test Description**: calculateTotalScore should calculate the total score correctly.
- **Expected Behavior**:
  - The total score should be updated correctly and shown on question-container.
---
