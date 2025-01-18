import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="main-menu">
    <h1>Music Theory</h1>
    <div class="card">
      <button id="level-1-btn" type="button">Level 1</button>
      <button id="level-2-btn" type="button">Level 2</button>
      <button id="level-3-btn" type="button">Level 3</button>
    </div>
    <p class="read-the-docs">
      Select the difficulty level of theory
    </p>
  </div>

  <div id="content-section" class="section">
    <h2 id="content-title">Content</h2>
    <div id="quiz-container" class="quiz-container">
      <div id="question-box" class="question-box"></div>
      <p id="content-description"></p>
      <div id="answers-container" class="answers-container">
        <button class="answer-btn" id="answer-1"></button>
        <button class="answer-btn" id="answer-2"></button>
        <button class="answer-btn" id="answer-3"></button>
        <button class="answer-btn" id="answer-4"></button>
      </div>
      <button id="next-question-btn" type="button" style="display: none; margin: 20px auto; display: block;">Next Question</button>
    </div>
    <p id="content-description"></p>
    <button id="back-to-menu-btn" type="button">Back to Main Menu</button>
  </div>
`;

const scrollToElement = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const questions = [
  {
    question: 'What is the first note in the C major scale?',
    answers: ['A', 'B', 'C', 'D'],
    correct: 2,
  },
  {
    question: 'How many sharps are in the G major scale?',
    answers: ['1', '2', '3', '4'],
    correct: 0,
  },
  {
    question: 'What is the relative minor of C major?',
    answers: ['A minor', 'E minor', 'G minor', 'D minor'],
    correct: 0,
  },
];
let currentQuestionIndex = 0;

const loadQuestion = () => {
  const question = questions[currentQuestionIndex];
  const questionBox = document.getElementById('question-box')!;
  const answerButtons = document.querySelectorAll('.answer-btn');
  const nextButton = document.getElementById('next-question-btn')!;

  questionBox.textContent = question.question;
  answerButtons.forEach((button, index) => {
    button.textContent = question.answers[index];
    button.classList.remove('correct', 'wrong');
    button.style.backgroundColor = '';
    button.disabled = false;
  });
  nextButton.style.display = 'none';
};

const handleAnswer = (buttonIndex: number) => {
  const question = questions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll('.answer-btn');
  const nextButton = document.getElementById('next-question-btn')!;

  answerButtons.forEach((button, index) => {
    if (index === question.correct) {
      button.classList.add('correct');
      button.style.backgroundColor = 'green';
    } else if (index === buttonIndex) {
      button.classList.add('wrong');
      button.style.backgroundColor = 'red';
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
};

// Set up answer button events
const answerButtons = document.querySelectorAll('.answer-btn');
answerButtons.forEach((button, index) => {
  button.addEventListener('click', () => handleAnswer(index));
});

document.getElementById('next-question-btn')?.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    alert('You have completed all questions!');
    scrollToElement('main-menu');
  }
});

const updateContent = (level: number) => {
  const title = document.getElementById('content-title')!;
  const description = document.getElementById('content-description')!;
  const quizContainer = document.getElementById('quiz-container')!;

  switch (level) {
    case 1:
      title.textContent = 'Level 1';
      description.textContent = '';
      quizContainer.style.display = 'block';
      currentQuestionIndex = 0;
      loadQuestion();
      break;
    case 2:
      title.textContent = 'Level 2';
      description.textContent = '';
      quizContainer.style.display = 'block';
      currentQuestionIndex = 0;
      loadQuestion();
      break;
    case 3:
      title.textContent = 'Level 3';
      description.textContent = '';
      quizContainer.style.display = 'block';
      currentQuestionIndex = 0;
      loadQuestion();
      break;
    default:
      title.textContent = 'Content';
      description.textContent = '';
      quizContainer.style.display = 'none';
  }
};

document.getElementById('level-1-btn')?.addEventListener('click', () => {
  updateContent(1);
  scrollToElement('content-section');
});

document.getElementById('level-2-btn')?.addEventListener('click', () => {
  updateContent(2);
  scrollToElement('content-section');
});

document.getElementById('level-3-btn')?.addEventListener('click', () => {
  updateContent(3);
  scrollToElement('content-section');
});

// Back to main menu button
document.getElementById('back-to-menu-btn')?.addEventListener('click', () => {
  scrollToElement('main-menu');
});
