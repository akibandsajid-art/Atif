
// ========================================
// GUESS THE PERSON
// PART 1 — CHARACTERS + IMAGE SYSTEM
// ========================================

const characters = [
  {name:"Aman",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Brown",skin:"Dark",accessories:"None",facialHair:"Beard"},
  {name:"Theo",gender:"Male",eyes:"Blue",hair:"Short",hairColor:"Blonde",skin:"Light",accessories:"None",facialHair:"None"},
  {name:"Henry",gender:"Male",eyes:"Black",hair:"Bald",hairColor:"Black",skin:"Olive",accessories:"Glasses",facialHair:"Moustache"},
  {name:"Bill",gender:"Male",eyes:"Green",hair:"Bald",hairColor:"Brown",skin:"Light",accessories:"Headwear",facialHair:"None"},
  {name:"Jeff",gender:"Male",eyes:"Blue",hair:"Long",hairColor:"Blonde",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Tom",gender:"Male",eyes:"Black",hair:"Bald",hairColor:"Gray",skin:"Light",accessories:"None",facialHair:"Moustache"},
  {name:"Jose",gender:"Male",eyes:"Green",hair:"Short",hairColor:"Red",skin:"Dark",accessories:"Headwear",facialHair:"Beard"},
  {name:"Ryan",gender:"Male",eyes:"Blue",hair:"Short",hairColor:"Brown",skin:"Olive",accessories:"Glasses",facialHair:"None"},
  {name:"Paul",gender:"Male",eyes:"Green",hair:"Bald",hairColor:"Red",skin:"Light",accessories:"None",facialHair:"Beard"},
  {name:"Rob",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Black",skin:"Dark",accessories:"Headwear",facialHair:"Beard"},
  {name:"David",gender:"Male",eyes:"Black",hair:"Short",hairColor:"Black",skin:"Olive",accessories:"None",facialHair:"Moustache"},
  {name:"James",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"John",gender:"Male",eyes:"Blue",hair:"Bald",hairColor:"Brown",skin:"Dark",accessories:"Headwear",facialHair:"Moustache"},
  {name:"Ben",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Black",skin:"Dark",accessories:"Glasses",facialHair:"Beard"},
  {name:"Jack",gender:"Male",eyes:"Green",hair:"Short",hairColor:"Gray",skin:"Light",accessories:"Headwear",facialHair:"Beard"},

  {name:"Lucy",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Black",skin:"Olive",accessories:"Headwear",facialHair:"None"},
  {name:"Bella",gender:"Female",eyes:"Green",hair:"Short",hairColor:"Red",skin:"Light",accessories:"None",facialHair:"None"},
  {name:"Sara",gender:"Female",eyes:"Blue",hair:"Long",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Rose",gender:"Female",eyes:"Blue",hair:"Short",hairColor:"Black",skin:"Dark",accessories:"Headwear",facialHair:"None"},
  {name:"Sophia",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Blonde",skin:"Olive",accessories:"None",facialHair:"None"},
  {name:"Nora",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Red",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Aria",gender:"Female",eyes:"Black",hair:"Long",hairColor:"Gray",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Emma",gender:"Female",eyes:"Black",hair:"Long",hairColor:"Gray",skin:"Dark",accessories:"None",facialHair:"None"},
  {name:"Annie",gender:"Female",eyes:"Green",hair:"Long",hairColor:"Red",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"Olivia",gender:"Female",eyes:"Green",hair:"Bald",hairColor:"Blonde",skin:"Dark",accessories:"Jewelry",facialHair:"None"},
  {name:"Lia",gender:"Female",eyes:"Brown",hair:"Short",hairColor:"Gray",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"Chloe",gender:"Female",eyes:"Green",hair:"Long",hairColor:"Brown",skin:"Olive",accessories:"Jewelry",facialHair:"None"},
  {name:"Mila",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Blonde",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Naomi",gender:"Female",eyes:"Black",hair:"Long",hairColor:"Black",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"Julia",gender:"Female",eyes:"Green",hair:"Short",hairColor:"Gray",skin:"Dark",accessories:"Jewelry",facialHair:"None"}
];


// ========================================
// GAME VARIABLES
// ========================================

let gameMode = null;
let computerDifficulty = "easy";

let player1Character = null;
let player2Character = null;
let computerCharacter = null;

let player1Remaining = [...characters];
let player2Remaining = [...characters];

let player1Eliminated = [];
let player2Eliminated = [];

let player1Board = [...characters];
let player2Board = [...characters];

let currentPlayer = 1;
let gameStarted = false;

let askedQuestions = {
  1: {},
  2: {}
};


// ========================================
// GITHUB CHARACTER IMAGES
// ========================================

const IMAGE_BASE =
  "https://akibandsajid-art.github.io/Atif/";

function drawCharacter(character) {

  const fileName =
    character.name
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase();

  return `
    <img
      src="${IMAGE_BASE}${fileName}.png"
      alt="${character.name}"
      style="
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:12px;
        display:block;
      "
    >
  `;
}

// ========================================
// PART 2 — GAME LOGIC
// ========================================




// ========================================
// TURN COLOR
// ========================================

function updateTurnColor() {
  document.body.style.background =
    currentPlayer === 1 ? "#3d7edb" : "#d94b4b";
}


// ========================================
// SHUFFLE
// ========================================

function shuffleCharacters(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}


// ========================================
// BOARD
// ========================================

function createBoard() {

  const board = document.getElementById("board");
  if (!board) return;

  board.innerHTML = "";

  let list =
    gameMode === "2player"
      ? (currentPlayer === 1 ? player1Board : player2Board)
      : player1Board;

  list.forEach(character => {

    const card = document.createElement("button");
    card.className = "character";

    const eliminated =
      gameMode === "2player"
        ? (currentPlayer === 1
            ? player1Eliminated
            : player2Eliminated
          ).some(c => c.name === character.name)
        : player1Eliminated.some(
            c => c.name === character.name
          );

    card.innerHTML = `
      <div class="avatar">
        ${drawCharacter(character)}
      </div>
      <div class="character-name">
        ${character.name}
      </div>
      ${eliminated
        ? '<div class="eliminated-cross">✕</div>'
        : ""}
    `;

    if (!gameStarted) {
      card.onclick = () =>
        selectSecretCharacter(character);
    }
    else if (
      gameMode === "computer" &&
      currentPlayer === 2
    ) {
      card.disabled = true;
    }
    else {
      card.onclick = () =>
        eliminateCharacter(character);
    }

    board.appendChild(card);
  });
}


// ========================================
// RESET
// ========================================

function resetGameVariables() {

  player1Character = null;
  player2Character = null;
  computerCharacter = null;

  player1Remaining = [...characters];
  player2Remaining = [...characters];

  player1Eliminated = [];
  player2Eliminated = [];

  player1Board = [...characters];
  player2Board = [...characters];

  currentPlayer = 1;
  gameStarted = false;

  askedQuestions = {
    1: {},
    2: {}
  };

  const btn =
    document.getElementById("finalGuessBtn");

  if (btn) btn.style.display = "none";
}


// ========================================
// START 2 PLAYER
// ========================================

function startGame(mode) {

  gameMode = mode;
  resetGameVariables();

  const modeBox =
    document.getElementById("modeSelection");

  const difficultyBox =
    document.getElementById("difficultySelection");

  if (modeBox)
    modeBox.style.display = "none";

  if (difficultyBox)
    difficultyBox.style.display = "none";

  updateTurnColor();

  const status =
    document.getElementById("status");

  if (status) {
    status.textContent =
      mode === "2player"
        ? "Player 1: Choose your secret character"
        : "Choose your secret character.";
  }

  createBoard();
}


// ========================================
// DIFFICULTY
// ========================================

function showDifficulty() {

  const modeBox =
    document.getElementById("modeSelection");

  const difficultyBox =
    document.getElementById("difficultySelection");

  if (modeBox)
    modeBox.style.display = "none";

  if (difficultyBox)
    difficultyBox.style.display = "block";
}


// ========================================
// COMPUTER GAME
// ========================================

function startComputerGame(difficulty) {

  gameMode = "computer";
  computerDifficulty = difficulty;

  resetGameVariables();

  const box =
    document.getElementById("difficultySelection");

  if (box)
    box.style.display = "none";

  updateTurnColor();

  document.getElementById("status").textContent =
    "Choose your secret character.";

  createBoard();
}


// ========================================
// SECRET CHARACTER
// ========================================

function selectSecretCharacter(character) {

  if (gameStarted) return;

  // 2 PLAYER
  if (gameMode === "2player") {

    if (currentPlayer === 1) {

      player1Character = character;
      currentPlayer = 2;

      updateTurnColor();

      document.getElementById("status").textContent =
        "Player 2: Choose your secret character";

      createBoard();
      return;
    }

    player2Character = character;

    player1Board =
      shuffleCharacters([...characters]);

    player2Board =
      shuffleCharacters([...characters]);

    currentPlayer = 1;
    gameStarted = true;

    updateTurnColor();

    document.getElementById("status").textContent =
      "Player 1: Ask a question.";

    createBoard();
    return;
  }

  // COMPUTER
  player1Character = character;

  const choices =
    characters.filter(
      c => c.name !== character.name
    );

  computerCharacter =
    choices[Math.floor(Math.random() * choices.length)];

  player1Board =
    shuffleCharacters([...characters]);

  currentPlayer = 1;
  gameStarted = true;

  updateTurnColor();

  document.getElementById("status").textContent =
    "Your turn: Ask a question.";

  createBoard();
}


// ========================================
// QUESTIONS
// ========================================

const questionData = {

  gender: ["Male", "Female"],

  eyes: [
    "Blue",
    "Green",
    "Brown",
    "Black"
  ],

  hair: [
    "Bald",
    "Short",
    "Long"
  ],

  hairColor: [
    "Brown",
    "Black",
    "Blonde",
    "Gray",
    "Red"
  ],

  skin: [
    "Light",
    "Olive",
    "Dark"
  ],

  accessories: [
    "None",
    "Glasses",
    "Headwear",
    "Jewelry"
  ],

  facialHair: [
    "None",
    "Moustache",
    "Beard"
  ]
};

const questionNames = {
  gender: "Gender",
  eyes: "Eye Color",
  hair: "Hair",
  hairColor: "Hair Color",
  skin: "Skin Tone",
  accessories: "Accessories",
  facialHair: "Facial Hair"
};


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion(category) {

  if (!gameStarted) {
    document.getElementById("answer").textContent =
      "⚠️ First select the secret character.";
    return;
  }

  if (
    gameMode === "computer" &&
    currentPlayer === 2
  ) return;

  const modal =
    document.getElementById("questionModal");

  const title =
    document.getElementById("questionTitle");

  const box =
    document.getElementById("questionOptions");

  if (!modal || !title || !box) return;

  title.textContent =
    questionNames[category];

  box.innerHTML = "";

  const asked =
    gameMode === "2player"
      ? askedQuestions[currentPlayer]
      : askedQuestions[1];

  questionData[category].forEach(value => {

    const button =
      document.createElement("button");

    button.className = "question-option";
    button.textContent = value;

    const key =
      category + ":" + value;

    if (asked[key]) {

      button.disabled = true;
      button.style.opacity = "0.5";

    } else {

      button.onclick = () => {

        asked[key] = true;

        closeQuestion();

        processQuestion(
          category,
          value
        );
      };
    }

    box.appendChild(button);
  });

  modal.style.display = "flex";
}


// ========================================
// CLOSE QUESTION
// ========================================

function closeQuestion() {

  const modal =
    document.getElementById("questionModal");

  if (modal)
    modal.style.display = "none";
}


// ========================================
// PROCESS QUESTION
// ========================================

function processQuestion(category, value) {

  const target =
    gameMode === "2player"
      ? (currentPlayer === 1
          ? player2Character
          : player1Character)
      : (currentPlayer === 1
          ? computerCharacter
          : player1Character);

  if (!target) return;

  const yes =
    target[category] === value;

  document.getElementById("answer").textContent =
    yes ? "YES" : "NO";


  // 2 PLAYER
  if (gameMode === "2player") {

    let remaining =
      currentPlayer === 1
        ? player1Remaining
        : player2Remaining;

    const newRemaining =
      yes
        ? remaining.filter(
            c => c[category] === value
          )
        : remaining.filter(
            c => c[category] !== value
          );

    const eliminated =
      characters.filter(
        c => !newRemaining.some(
          r => r.name === c.name
        )
      );

    if (currentPlayer === 1) {
      player1Remaining = newRemaining;
      player1Eliminated = eliminated;
    } else {
      player2Remaining = newRemaining;
      player2Eliminated = eliminated;
    }

    if (newRemaining.length <= 1) {

      document.getElementById("finalGuessBtn")
        .style.display = "block";

      document.getElementById("status").textContent =
        "🎯 Player " +
        currentPlayer +
        ": FINAL GUESS!";

      createBoard();
      return;
    }

    currentPlayer =
      currentPlayer === 1 ? 2 : 1;

    updateTurnColor();

    document.getElementById("status").textContent =
      "Player " +
      currentPlayer +
      ": Ask a question.";

    createBoard();
    return;
  }


  // COMPUTER — HUMAN TURN
  if (currentPlayer === 1) {

    player1Remaining =
      yes
        ? player1Remaining.filter(
            c => c[category] === value
          )
        : player1Remaining.filter(
            c => c[category] !== value
          );

    player1Eliminated =
      characters.filter(
        c => !player1Remaining.some(
          r => r.name === c.name
        )
      );

    if (player1Remaining.length <= 1) {

      document.getElementById("finalGuessBtn")
        .style.display = "block";

      document.getElementById("status").textContent =
        "🎯 Make your FINAL GUESS!";

      createBoard();
      return;
    }

    currentPlayer = 2;

    updateTurnColor();
    createBoard();

    setTimeout(computerTurn, 800);
    return;
  }


  // COMPUTER — AI TURN
  player2Remaining =
    yes
      ? player2Remaining.filter(
          c => c[category] === value
        )
      : player2Remaining.filter(
          c => c[category] !== value
        );

  player2Eliminated =
    characters.filter(
      c => !player2Remaining.some(
        r => r.name === c.name
      )
    );

  if (player2Remaining.length <= 1) {

    const guess =
      player2Remaining[0];

    if (
      guess &&
      guess.name === player1Character.name
    ) {

      gameStarted = false;

      document.getElementById("status").textContent =
        "🤖 Computer WINS!";

      document.getElementById("answer").textContent =
        "🤖 Computer guessed " +
        guess.name +
        " correctly!";

      return;
    }
  }

  currentPlayer = 1;

  updateTurnColor();

  document.getElementById("status").textContent =
    "Your turn: Ask a question.";

  createBoard();
}


// ========================================
// COMPUTER TURN
// ========================================

function computerTurn() {

  if (
    gameMode !== "computer" ||
    !gameStarted ||
    currentPlayer !== 2
  ) return;

  const possible = [];

  for (const category in questionData) {

    for (const value of questionData[category]) {

      const key =
        category + ":" + value;

      if (askedQuestions[2][key])
        continue;

      const yesCount =
        player2Remaining.filter(
          c => c[category] === value
        ).length;

      const noCount =
        player2Remaining.length - yesCount;

      possible.push({
        category,
        value,
        score: Math.min(
          yesCount,
          noCount
        )
      });
    }
  }

  if (!possible.length) {
    computerMakeGuess();
    return;
  }

  possible.sort(
    (a, b) => b.score - a.score
  );

  let question;

  if (computerDifficulty === "hard") {
    question = possible[0];
  }
  else if (computerDifficulty === "medium") {
    question =
      possible[
        Math.floor(
          Math.random() *
          Math.min(5, possible.length)
        )
      ];
  }
  else {
    question =
      possible[
        Math.floor(
          Math.random() *
          possible.length
        )
      ];
  }

  askedQuestions[2][
    question.category + ":" + question.value
  ] = true;

  setTimeout(() => {

    document.getElementById("status").textContent =
      "🤖 Computer asks: " +
      questionNames[question.category] +
      " = " +
      question.value;

    processQuestion(
      question.category,
      question.value
    );

  }, 900);
}


// ========================================
// COMPUTER GUESS
// ========================================

function computerMakeGuess() {

  if (!player2Remaining.length) {
    gameStarted = false;

    document.getElementById("status").textContent =
      "🏆 You WIN!";

    return;
  }

  const guess =
    player2Remaining[0];

  setTimeout(() => {

    if (guess.name === player1Character.name) {

      gameStarted = false;

      document.getElementById("status").textContent =
        "🤖 Computer WINS!";

      document.getElementById("answer").textContent =
        "Computer guessed " + guess.name;

    } else {

      currentPlayer = 1;

      updateTurnColor();

      document.getElementById("status").textContent =
        "Your turn: Ask a question.";

      document.getElementById("answer").textContent =
        "🤖 Computer guessed wrong!";

      createBoard();
    }

  }, 900);
}


// ========================================
// MANUAL ELIMINATION
// ========================================

function eliminateCharacter(character) {

  if (!gameStarted) return;

  let eliminated =
    gameMode === "2player"
      ? (currentPlayer === 1
          ? player1Eliminated
          : player2Eliminated)
      : player1Eliminated;

  const exists =
    eliminated.some(
      c => c.name === character.name
    );

  if (exists) {

    eliminated =
      eliminated.filter(
        c => c.name !== character.name
      );

    if (gameMode === "2player") {
      if (currentPlayer === 1)
        player1Eliminated = eliminated;
      else
        player2Eliminated = eliminated;
    } else {
      player1Eliminated = eliminated;
    }

    document.getElementById("answer").textContent =
      "🔄 " + character.name + " revived";

  } else {

    eliminated.push(character);

    if (gameMode === "2player") {
      if (currentPlayer === 1)
        player1Eliminated = eliminated;
      else
        player2Eliminated = eliminated;
    } else {
      player1Eliminated = eliminated;
    }

    document.getElementById("answer").textContent =
      "❌ " + character.name + " eliminated";
  }

  createBoard();
}


// ========================================
// FINAL GUESS
// ========================================

function finalGuess() {

  if (!gameStarted) return;

  const remaining =
    gameMode === "2player"
      ? (currentPlayer === 1
          ? player1Remaining
          : player2Remaining)
      : player1Remaining;

  if (!remaining.length) return;

  const guess = remaining[0];

  const secret =
    gameMode === "2player"
      ? (currentPlayer === 1
          ? player2Character
          : player1Character)
      : computerCharacter;

  gameStarted = false;

  if (guess.name === secret.name) {

    document.getElementById("status").textContent =
      "🏆 Player " +
      currentPlayer +
      " WINS!";

    document.getElementById("answer").textContent =
      "🎉 Correct! It was " + secret.name;

  } else {

    document.getElementById("status").textContent =
      gameMode === "2player"
        ? "🏆 Player " +
          (currentPlayer === 1 ? 2 : 1) +
          " WINS!"
        : "🏆 🤖 Computer WINS!";

    document.getElementById("answer").textContent =
      "❌ Wrong! It was " + secret.name;
  }
}


// ========================================
// BUTTON CONNECTION
// ========================================

window.startGame = startGame;
window.showDifficulty = showDifficulty;
window.startComputerGame = startComputerGame;
window.showQuestion = showQuestion;
window.closeQuestion = closeQuestion;
window.selectSecretCharacter = selectSecretCharacter;
window.eliminateCharacter = eliminateCharacter;
window.finalGuess = finalGuess;
