const quizQuestions = [
  {
    question: "Which of the following is not a Java features?",
    options: ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"],
    correctAnswer: "Use of pointers"
  },
  {
    question: "_____ is used to find and fix bugs in the\n Java programs.",
    options: ["JVM", "JRE", "JDK", "JDB"],
    correctAnswer: "JDB"
  },
  {
    question: "What is the return type of the hashCode() method in the \nObject class?",
    options: ["Object","int","long","void",],
    correctAnswer: "int"
  },
  {
    question: " Which keyword is used for accessing the features of a\n package?",
    options: ["package",
      "import",
      "extends",
      "export"],
    correctAnswer: "import"
  },
  {
    question: "What is the default encoding for an OutputStreamWriter?",
    options: ["UTF-8", "Default encoding of the host platform", "UTF-12", "None of the above"],
    correctAnswer: "Default encoding of the host platform"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 40;
let timerInterval;
function startQuiz() {

  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";
  questionText.innerHTML = currentQuestion.question;
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);
    button.addEventListener("click", function() {
      checkAnswer(option);
    });
  });
}
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {

  clearInterval(timerInterval);
  const scorePercentage = (score / quizQuestions.length) * 100;
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} out of ${quizQuestions.length}</p>
    <p>Score Percentage: ${scorePercentage}%</p>
    <h2>Have A Great Learning</h2>
    
  `;
}
document.getElementById("start-button").addEventListener("click", startQuiz);