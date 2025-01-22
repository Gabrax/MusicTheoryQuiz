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

"♭ ♯ ° ø 𝄞 ♩ ♪ ♫ ♬"
const questions = [

  // CHORDS FORMULAS
  {
    question: 'What is the major chord formula?',
    answers: ['1 - 6 - 7','1 - 2 - 4','1 - 2 - 5','1 - 3 - 5'],
    correct: 3,
  },
  {
    question: 'What is the minor chord formula?',
    answers: ['1 - 2 - 6','1 - ♭3 - 5','1 - 2 - 3','1 - 3 - 6'],
    correct: 1,
  },
  {
    question: 'What is the diminished chord formula?',
    answers: ['1 - 4 - 7','1 - 2 - 6','1 - ♭3 - ♭5','1 - 4 - 7'],
    correct: 2,
  },
  {
    question: 'What is the augmented chord formula?',
    answers: ['1 - 3 - ♯5','1 - 2 - 5','1 - 3 - 5','1 - ♭4 - 5'],
    correct: 0,
  },
  {
    question: 'What is the sus2 chord formula?',
    answers: ['1 - 4 - 5','1 - 3 - 5 - ♭7','1 - 2 - 5',' 1 - 3 - 5 - ♯6'],
    correct: 2,
  },
  {
    question: 'What is the sus4 chord formula?',
    answers: ['1 - ♭3 - 5','1 - 3 - 5','1 - 3 - ♯5 - 7','1 - 4 - 5'],
    correct: 3,
  },
  {
    question: 'What is the major7 chord formula?',
    answers: ['1 - 3 - 5', '1 - 3 - 5 - 7', '1 - 2 - 5','1 - 3 - 6'],
    correct: 1,
  },
  {
    question: 'What is the minor7 chord formula?',
    answers: ['1 - 3 - 5','1 - 3 - 5 - 7','1 - 2 - 3','1 - ♭3 - 5 - ♭7'],
    correct: 3,
  },
  {
    question: 'What is the dominant7 chord formula?',
    answers: ['1 - 3 - 5 - ♭7','1 - 3 - 6 - 7','1 - ♯2 - 4 - 5', '1 - 3 - 5 - ♯7'],
    correct: 0,
  },
  {
    question: 'What is the half diminished 7th (ø) chord formula?',
    answers: ['1 - 3 - ♭5 - 7','1 - ♭3 - ♭5 - ♭7','♭1 - 3 - 5 - ♯7','1 - ♭3 - 5 - 7'],
    correct: 1,
  },
  {
    question: 'What is the diminished 7th (°) chord formula?',
    answers: ['1 - 2 - ♭5 - 7','1 - ♭3 - ♭5 - 7','♭1 - 4 - 5 - ♯7','1 - ♭3 - ♭5 - ♭♭7'],
    correct: 3,
  },

  // C MAJOR
  {
    question: 'What is the major scale formula?',
    answers: ['♭I II iii IV v vi VIIø', 'i ♯II III iv ♭V vi VII ', 'I ii iii IV V vi VII°', 'i ii III° IV v vi ♯VII'],
    correct: 2,
  },
  {
    question: 'What are the notes in the C major scale?',
    answers: ['C A B♭ D♯ F E C', 'C D E F G A B C', 'C E G B F A D C', 'C A D♯ F B G E♭ C'],
    correct: 1,
  },
  {
    question: 'What is the relative minor of C major?',
    answers: ['A minor', 'E minor', 'G minor', 'D minor'],
    correct: 0,
  },
  {
    question: 'What is the 2nd of C major?',
    answers: ['A major', 'E minor', 'G°', 'D minor'],
    correct: 3,
  },
  {
    question: 'What is the 3rd interval of C major?',
    answers: ['A♭ major', 'E minor', 'E major', 'F°'],
    correct: 2,
  },
  {
    question: 'What is the 4th interval of C major?',
    answers: ['F major', 'G minor ', 'Aø', 'D minor'],
    correct: 0,
  },
  {
    question: 'What is the 5th interval of C major?',
    answers: ['A major', 'E minor', 'G major', 'D♯ minor'],
    correct: 2,
  },
  {
    question: 'What is the 6th interval of C major?',
    answers: ['A minor', 'A♭ major', 'F♯ minor', 'B minor'],
    correct: 3,
  },
  {
    question: 'What is the 7th interval of C major?',
    answers: ['A♭ major', 'E minor', 'B°', 'D major'],
    correct: 2,
  },
  {
    question: 'What notes create the Cmajor?',
    answers: ['C - E - G','C - D - G','C - E - A','C - B - D'],
    correct: 0,
  },
  {
    question: 'What notes create Cminor?',
    answers: ['C - A - G','C - ♭E - G','C - ♭G - B','C - E - ♯D'],
    correct: 1,
  },
  {
    question: 'What notes create Cdiminished?',
    answers: ['C - ♭E - ♭G','C - D - B','C - A - ♯G','C - ♯F - B'],
    correct: 0,
  },
  {
    question: 'What notes create Caugmented?',
    answers: ['C - E - ♯G','C - B - A','C - B - ♯D','C - E - ♭G'],
    correct: 0,
  },
  {
    question: 'What notes create C5 (Power Chord)?',
    answers: ['C - G - E','C - G','C - E','C - B'],
    correct: 1,
  },
  {
    question: 'What notes create Csus2?',
    answers: ['C - E','C - G - ♯A','C - D - G','C - ♯G - A'],
    correct: 2,
  },
  {
    question: 'What notes create Csus4?',
    answers: ['C - F - G','C - ♯G - A','C - A - G','C - G - ♯A'],
    correct: 0,
  },
  {
    question: 'What notes create Cmajor7?',
    answers: ['C - E - G - B','C - ♯G - A - D','C - ♭D - G - B','C - G - ♯A - ♭F'],
    correct: 0,
  },
  {
    question: 'What notes create Cminor7?',
    answers: ['C - ♭D - G - B','C - ♯G - A - D','C - ♭E - G - ♭B','C - G - ♯A - ♭F'],
    correct: 2,
  },
  {
    question: 'What notes create C7 (Dominant)?',
    answers: ['C - ♭D - G - B','C - E - G - ♭B','C - ♯E - D - ♭B','C - G - A - ♭F'],
    correct: 1,
  },
  {
    question: 'What notes create Cø (Half diminished 7th)?',
    answers: ['C - D - G - ♭B','C - ♭E - ♭G - ♭B','C - E - D - ♭B','C - G - ♯A - ♭F'],
    correct: 1,
  },
  {
    question: 'What notes create C° (diminished 7th)?',
    answers: ['C - ♭D - G - ♭B','C - ♭F - ♭A - G','C - ♭E - ♭G - G','C - G - ♯A - ♭F'],
    correct: 2,
  },,
];

let currentQuestionIndex = 0;

const loadQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length); 
  const question = questions[randomIndex]; // Pick a random question
  const questionBox = document.getElementById('question-box')!;
  const answerButtons = document.querySelectorAll('.answer-btn');
  const nextButton = document.getElementById('next-question-btn')!;

  // Save the current question to a global variable for handling answers
  (window as any).currentQuestion = question;

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
  const question = (window as any).currentQuestion; // Get the current question
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

const answerButtons = document.querySelectorAll('.answer-btn');
answerButtons.forEach((button, index) => {
  button.addEventListener('click', () => handleAnswer(index));
});

document.getElementById('next-question-btn')?.addEventListener('click', () => {
  loadQuestion(); 
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
