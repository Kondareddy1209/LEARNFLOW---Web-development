const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false }
        ],
        difficulty: "easy"
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "J.K. Rowling", correct: false },
            { text: "Mark Twain", correct: false }
        ],
        difficulty: "medium"
    },
    {
        question: "What is the speed of light?",
        answers: [
            { text: "299,792 km/s", correct: true },
            { text: "150,000 km/s", correct: false },
            { text: "1,080,000 km/h", correct: false },
            { text: "670,616 km/h", correct: false }
        ],
        difficulty: "hard"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-btn');

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    scoreElement.innerText = `Score: ${score}`;
    timerElement.innerText = `Time: ${timeLeft}`;
    nextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function nextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            nextQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    questionElement.innerText = `Game Over! Final Score: ${score}`;
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hide');
    resetState();
}
