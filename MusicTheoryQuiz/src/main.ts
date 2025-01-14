import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

// Set up HTML
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
    <p id="content-description"></p>
    <button id="back-to-menu-btn" type="button">Back to Main Menu</button>
  </div>
`;

// Scroll functionality
const scrollToElement = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// Update content based on level
const updateContent = (level: number) => {
  const title = document.getElementById('content-title')!;
  const description = document.getElementById('content-description')!;

  switch (level) {
    case 1:
      title.textContent = 'Level 1 Content';
      description.textContent = 'Welcome to Level 1! This is an introduction to music theory.';
      break;
    case 2:
      title.textContent = 'Level 2 Content';
      description.textContent = 'Welcome to Level 2! Let\'s explore intermediate concepts in music theory.';
      break;
    case 3:
      title.textContent = 'Level 3 Content';
      description.textContent = 'Welcome to Level 3! Dive into advanced music theory topics.';
      break;
    default:
      title.textContent = 'Content';
      description.textContent = '';
  }
};

// Level buttons
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
