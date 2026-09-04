// ========================================
// GUESS THE PERSON
// COMPLETE CLEAN SCRIPT
// ========================================

const characters = [
  {name:"Bob",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Brown",skin:"Dark",accessories:"None",facialHair:"None"},
  {name:"Theo",gender:"Male",eyes:"Blue",hair:"Short",hairColor:"Blonde",skin:"Light",accessories:"None",facialHair:"None"},
  {name:"Lucy",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Black",skin:"Olive",accessories:"Headwear",facialHair:"None"},
  {name:"Bella",gender:"Female",eyes:"Green",hair:"Short",hairColor:"Red",skin:"Light",accessories:"None",facialHair:"None"},
  {name:"Henry",gender:"Male",eyes:"Black",hair:"Short",hairColor:"Brown",skin:"Dark",accessories:"None",facialHair:"Beard"},
  {name:"Bill",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Blonde",skin:"Light",accessories:"None",facialHair:"None"},
  {name:"Sara",gender:"Female",eyes:"Blue",hair:"Long",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Rose",gender:"Female",eyes:"Blue",hair:"Short",hairColor:"Black",skin:"Light",accessories:"Headwear",facialHair:"None"},
  {name:"Sophia",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Blonde",skin:"Olive",accessories:"None",facialHair:"None"},
  {name:"Jeff",gender:"Male",eyes:"Brown",hair:"Long",hairColor:"Blonde",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Nora",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Red",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Tom",gender:"Male",eyes:"Brown",hair:"Bald",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"Moustache"},
  {name:"Aria",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Gray",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Jose",gender:"Male",eyes:"Green",hair:"Bald",hairColor:"Black",skin:"Dark",accessories:"None",facialHair:"Beard"},
  {name:"Emma",gender:"Female",eyes:"Black",hair:"Long",hairColor:"Gray",skin:"Dark",accessories:"None",facialHair:"None"},
  {name:"Ryan",gender:"Male",eyes:"Blue",hair:"Short",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"Annie",gender:"Female",eyes:"Green",hair:"Long",hairColor:"Red",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"Paul",gender:"Male",eyes:"Green",hair:"Short",hairColor:"Red",skin:"Light",accessories:"None",facialHair:"Beard"},
  {name:"Olivia",gender:"Female",eyes:"Green",hair:"Long",hairColor:"Blonde",skin:"Dark",accessories:"Jewelry",facialHair:"None"},
  {name:"Rob",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Black",skin:"Olive",accessories:"Headwear",facialHair:"Beard"},
  {name:"Lia",gender:"Female",eyes:"Brown",hair:"Short",hairColor:"Gray",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"Chloe",gender:"Female",eyes:"Green",hair:"Long",hairColor:"Brown",skin:"Olive",accessories:"Jewelry",facialHair:"None"},
  {name:"David",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Black",skin:"Dark",accessories:"None",facialHair:"Moustache"},
  {name:"Mila",gender:"Female",eyes:"Brown",hair:"Long",hairColor:"Blonde",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Naomi",gender:"Female",eyes:"Black",hair:"Long",hairColor:"Black",skin:"Light",accessories:"Jewelry",facialHair:"None"},
  {name:"James",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Brown",skin:"Light",accessories:"Glasses",facialHair:"None"},
  {name:"John",gender:"Male",eyes:"Blue",hair:"Short",hairColor:"Brown",skin:"Dark",accessories:"Headwear",facialHair:"Moustache"},
  {name:"Ben",gender:"Male",eyes:"Brown",hair:"Short",hairColor:"Black",skin:"Dark",accessories:"Glasses",facialHair:"None"},
  {name:"Julia",gender:"Female",eyes:"Green",hair:"Short",hairColor:"Gray",skin:"Dark",accessories:"Jewelry",facialHair:"None"},
  {name:"Jack",gender:"Male",eyes:"Green",hair:"Short",hairColor:"Gray",skin:"Light",accessories:"Headwear",facialHair:"Beard"}
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
// COLORS
// ========================================

const skinColors = {
  Light: "#FFD1B3",
  Olive: "#D89562",
  Dark: "#7A432D"
};

const hairColors = {
  Brown: "#63351F",
  Black: "#151515",
  Blonde: "#F2C230",
  Gray: "#B7B7C5",
  Red: "#D95A2B"
};

const eyeColors = {
  Blue: "#3D9BDD",
  Green: "#4C9A45",
  Brown: "#75451F",
  Black: "#111111"
};


// ========================================
// TURN COLOR
// ========================================

function updateTurnColor() {

  if (currentPlayer === 1) {
    document.body.style.background = "#3d7edb";
  } else {
    document.body.style.background = "#d94b4b";
  }

}


// ========================================
// DRAW CHARACTER
// ========================================

function drawCharacter(c) {

  const skin = skinColors[c.skin];
  const hair = hairColors[c.hairColor];
  const eyes = eyeColors[c.eyes];

  let hairShape = "";

  if (c.hair === "Long") {

    hairShape = `
      <path d="M25 52 Q25 8 60 8 Q95 8 95 52
      L91 83 Q82 96 74 75
      L46 75 Q38 96 29 83 Z"
      fill="${hair}"/>
    `;

  }

  if (c.hair === "Short") {

    hairShape = `
      <path d="M27 43 Q28 9 60 9 Q92 9 93 43
      Q80 28 60 29 Q40 28 27 43Z"
      fill="${hair}"/>
    `;

  }

  let facialHair = "";

  if (c.facialHair === "Moustache") {

    facialHair = `
      <path d="M43 64 Q51 57 59 64 Q60 70 51 70
      Q47 69 43 64Z" fill="#35251D"/>

      <path d="M60 64 Q68 57 77 64 Q73 70 67 70
      Q62 69 60 64Z" fill="#35251D"/>
    `;

  }

  if (c.facialHair === "Beard") {

    facialHair = `
      <path d="M38 65 Q60 82 82 65 L78 82
      Q60 94 42 82Z" fill="#35251D"/>
    `;

  }

  let glasses = "";

  if (c.accessories === "Glasses") {

    glasses = `
      <circle cx="44" cy="51" r="11"
        fill="none" stroke="#222" stroke-width="4"/>

      <circle cx="76" cy="51" r="11"
        fill="none" stroke="#222" stroke-width="4"/>

      <line x1="55" y1="51" x2="65" y2="51"
        stroke="#222" stroke-width="4"/>
    `;

  }

  let hat = "";

  if (c.accessories === "Headwear") {

    hat = `
      <path d="M23 31 Q60 2 97 31Z"
        fill="#553B7D"/>

      <rect x="18" y="28"
        width="84" height="9"
        rx="4"
        fill="#432E65"/>
    `;

  }

  let jewelry = "";

  if (c.accessories === "Jewelry") {

    jewelry = `
      <circle cx="27" cy="69" r="5"
        fill="#E5B72B"/>

      <circle cx="93" cy="69" r="5"
        fill="#E5B72B"/>

      <circle cx="60" cy="94" r="4"
        fill="#E5B72B"/>
    `;

  }

  return `
    <svg viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg">

      <rect x="49" y="78"
        width="22" height="20"
        rx="8" fill="${skin}"/>

      <ellipse cx="60" cy="55"
        rx="34" ry="38"
        fill="${skin}"/>

      <circle cx="27" cy="56"
        r="8" fill="${skin}"/>

      <circle cx="93" cy="56"
        r="8" fill="${skin}"/>

      ${hairShape}

      <ellipse cx="44" cy="52"
        rx="6" ry="7" fill="white"/>

      <ellipse cx="76" cy="52"
        rx="6" ry="7" fill="white"/>

      <circle cx="44" cy="53"
        r="3.5" fill="${eyes}"/>

      <circle cx="76" cy="53"
        r="3.5" fill="${eyes}"/>

      <path d="M58 54 Q53 67 61 68
        Q67 68 64 64"
        fill="none"
        stroke="#9B6045"
        stroke-width="2"/>

      <path d="M48 75 Q60 82 72 75"
        fill="none"
        stroke="#8B3E3E"
        stroke-width="3"
        stroke-linecap="round"/>

      ${facialHair}
      ${glasses}
      ${hat}
      ${jewelry}

    </svg>
  `;

}


// ========================================
// SHUFFLE
// ========================================

function shuffleCharacters(list) {

  for (let i = list.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [list[i], list[j]] =
      [list[j], list[i]];
  }

  return list;

}


// ========================================
// CREATE BOARD
// ========================================

function createBoard() {

  const board =
    document.getElementById("board");

  if (!board) return;

  board.innerHTML = "";

  let list = player1Board;

  if (gameMode === "2player") {

    list =
      currentPlayer === 1
        ? player1Board
        : player2Board;

  }


  list.forEach(character => {

    const card =
      document.createElement("button");

    card.className = "character";

    let eliminated = false;

    if (gameMode === "2player") {

      eliminated =
        currentPlayer === 1
          ? player1Eliminated.some(
              c => c.name === character.name
            )
          : player2Eliminated.some(
              c => c.name === character.name
            );

    } else {

      eliminated =
        player1Eliminated.some(
          c => c.name === character.name
        );

    }


    card.innerHTML = `
      <div class="avatar">
        ${drawCharacter(character)}
      </div>

      <div class="character-name">
        ${character.name}
      </div>

      ${
        eliminated
          ? '<div class="eliminated-cross">✕</div>'
          : ''
      }
    `;


    if (!gameStarted) {

      card.onclick = () =>
        selectSecretCharacter(character);

    } else if (
      gameMode === "computer" &&
      currentPlayer === 2
    ) {

      card.disabled = true;

    } else {

      card.onclick = () =>
        eliminateCharacter(character);

    }


    board.appendChild(card);

  });

}


// ========================================
// RESET GAME
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

  const finalBtn =
    document.getElementById("finalGuessBtn");

  if (finalBtn) {
    finalBtn.style.display = "none";
  }

}


// ========================================
// START 2 PLAYER
// ========================================

function startGame(mode) {

  gameMode = mode;

  resetGameVariables();

  const modeSelection =
    document.getElementById("modeSelection");

  const difficultySelection =
    document.getElementById(
      "difficultySelection"
    );

  if (modeSelection) {
    modeSelection.style.display = "none";
  }

  if (difficultySelection) {
    difficultySelection.style.display = "none";
  }

  updateTurnColor();

  if (mode === "2player") {

    document.getElementById("status").textContent =
      "Player 1: Choose your secret character";

  }

  createBoard();

}


// ========================================
// SHOW DIFFICULTY
// ========================================

function showDifficulty() {

  const modeSelection =
    document.getElementById("modeSelection");

  const difficultySelection =
    document.getElementById(
      "difficultySelection"
    );

  if (modeSelection) {
    modeSelection.style.display = "none";
  }

  if (difficultySelection) {
    difficultySelection.style.display = "block";
  }

}


// ========================================
// START COMPUTER GAME
// ========================================

function startComputerGame(difficulty) {

  gameMode = "computer";
  computerDifficulty = difficulty;

  resetGameVariables();

  const difficultySelection =
    document.getElementById(
      "difficultySelection"
    );

  if (difficultySelection) {
    difficultySelection.style.display = "none";
  }

  updateTurnColor();

  document.getElementById("status").textContent =
    "Choose your secret character.";

  createBoard();

}


// ========================================
// SELECT SECRET
// ========================================

function selectSecretCharacter(character) {

  if (gameStarted) return;


  // ========================================
  // 2 PLAYER
  // ========================================

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

    // Shuffle only once.
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


  // ========================================
  // COMPUTER
  // ========================================

  player1Character = character;

  const choices =
    characters.filter(
      c => c.name !== character.name
    );

  computerCharacter =
    choices[
      Math.floor(
        Math.random() * choices.length
      )
    ];

  // Shuffle only once.
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
// QUESTION MODAL
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
  ) {
    return;
  }


  const options = {

    gender:
      ["Male", "Female"],

    eyes:
      ["Blue", "Green", "Brown", "Black"],

    hair:
      ["Bald", "Short", "Long"],

    hairColor:
      ["Brown", "Black", "Blonde", "Gray", "Red"],

    skin:
      ["Light", "Olive", "Dark"],

    accessories:
      ["None", "Glasses", "Headwear", "Jewelry"],

    facialHair:
      ["None", "Moustache", "Beard"]

  };


  const names = {

    gender: "Gender",
    eyes: "Eye Color",
    hair: "Hair",
    hairColor: "Hair Color",
    skin: "Skin Tone",
    accessories: "Accessories",
    facialHair: "Facial Hair"

  };


  const modal =
    document.getElementById("questionModal");

  const title =
    document.getElementById("questionTitle");

  const questionOptions =
    document.getElementById(
      "questionOptions"
    );


  if (!modal || !title || !questionOptions) {
    return;
  }


  title.textContent = names[category];

  questionOptions.innerHTML = "";


  const questions =
    gameMode === "2player"
      ? askedQuestions[currentPlayer]
      : askedQuestions[1];


  options[category].forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "question-option";

    button.textContent = option;


    const key =
      category + ":" + option;


    if (questions[key]) {

      button.disabled = true;
      button.style.opacity = "0.5";

    } else {

      button.onclick = function () {

        questions[key] = true;

        closeQuestion();

        processQuestion(
          category,
          option
        );

      };

    }


    questionOptions.appendChild(button);

  });


  modal.style.display = "flex";

}


// ========================================
// CLOSE QUESTION
// ========================================

function closeQuestion() {

  const modal =
    document.getElementById("questionModal");

  if (modal) {
    modal.style.display = "none";
  }

}


// ========================================
// PROCESS QUESTION
// ========================================

function processQuestion(category, value) {

  let targetCharacter;


  if (gameMode === "2player") {

    targetCharacter =
      currentPlayer === 1
        ? player2Character
        : player1Character;

  } else {

    targetCharacter =
      currentPlayer === 1
        ? computerCharacter
        : player1Character;

  }


  if (!targetCharacter) return;


  const correct =
    targetCharacter[category] === value;


  document.getElementById("answer").textContent =
    correct ? "YES" : "NO";


  // ========================================
  // 2 PLAYER
  // ========================================

  if (gameMode === "2player") {

    const eliminatingPlayer =
      currentPlayer === 1
        ? player1Remaining
        : player2Remaining;

    const eliminatedList =
      currentPlayer === 1
        ? player1Eliminated
        : player2Eliminated;


    let newRemaining;


    if (correct) {

      newRemaining =
        eliminatingPlayer.filter(
          character =>
            character[category] === value
        );

    } else {

      newRemaining =
        eliminatingPlayer.filter(
          character =>
            character[category] !== value
        );

    }


    const newEliminated =
      characters.filter(
        character =>
          !newRemaining.some(
            c => c.name === character.name
          )
      );


    if (currentPlayer === 1) {

      player1Remaining = newRemaining;
      player1Eliminated = newEliminated;

    } else {

      player2Remaining = newRemaining;
      player2Eliminated = newEliminated;

    }


    // Final guess if only one remains.
    if (newRemaining.length === 1) {

      document.getElementById(
        "finalGuessBtn"
      ).style.display = "block";

      document.getElementById("status").textContent =
        "Player " +
        currentPlayer +
        ": Make your FINAL GUESS!";

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


  // ========================================
  // COMPUTER MODE
  // ========================================

  if (gameMode === "computer") {

    // ----------------------------------------
    // HUMAN TURN
    // ----------------------------------------

    if (currentPlayer === 1) {

      if (correct) {

        player1Remaining =
          player1Remaining.filter(
            character =>
              character[category] === value
          );

      } else {

        player1Remaining =
          player1Remaining.filter(
            character =>
              character[category] !== value
          );

      }


      player1Eliminated =
        characters.filter(
          character =>
            !player1Remaining.some(
              c => c.name === character.name
            )
        );


      if (player1Remaining.length === 1) {

        document.getElementById(
          "finalGuessBtn"
        ).style.display = "block";

        document.getElementById("status").textContent =
          "🎯 Make your FINAL GUESS!";

        createBoard();

        return;

      }


      currentPlayer = 2;

      updateTurnColor();

      createBoard();

      computerTurn();

      return;

    }


    // ----------------------------------------
    // COMPUTER TURN
    // ----------------------------------------

    if (correct) {

      player2Remaining =
        player2Remaining.filter(
          character =>
            character[category] === value
        );

    } else {

      player2Remaining =
        player2Remaining.filter(
          character =>
            character[category] !== value
        );

    }


    player2Eliminated =
      characters.filter(
        character =>
          !player2Remaining.some(
            c => c.name === character.name
          )
      );


    // Computer wins if it narrows
    // the human down to one.
    if (player2Remaining.length === 1) {

      const guess =
        player2Remaining[0];

      if (
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

}


// ========================================
// COMPUTER AI
// ========================================

function computerTurn() {

  if (
    gameMode !== "computer" ||
    !gameStarted ||
    currentPlayer !== 2
  ) {
    return;
  }


  document.getElementById("status").textContent =
    "🤖 Computer is thinking...";


  const options = {

    gender:
      ["Male", "Female"],

    eyes:
      ["Blue", "Green", "Brown", "Black"],

    hair:
      ["Bald", "Short", "Long"],

    hairColor:
      ["Brown", "Black", "Blonde", "Gray", "Red"],

    skin:
      ["Light", "Olive", "Dark"],

    accessories:
      ["None", "Glasses", "Headwear", "Jewelry"],

    facialHair:
      ["None", "Moustache", "Beard"]

  };


  let possibleQuestions = [];


  for (const category in options) {

    for (const value of options[category]) {

      const key =
        category + ":" + value;


      if (askedQuestions[2][key]) {
        continue;
      }


      const yesCount =
        player2Remaining.filter(
          character =>
            character[category] === value
        ).length;


      const noCount =
        player2Remaining.length -
        yesCount;


      possibleQuestions.push({

        category: category,
        value: value,

        score:
          Math.min(
            yesCount,
            noCount
          )

      });

    }

  }


  if (possibleQuestions.length === 0) {

    // If all questions have been used,
    // computer makes a direct guess.

    computerMakeGuess();

    return;

  }


  let selectedQuestion;


  // EASY = random
  if (computerDifficulty === "easy") {

    selectedQuestion =
      possibleQuestions[
        Math.floor(
          Math.random() *
          possibleQuestions.length
        )
      ];

  }


  // MEDIUM = among best 3
  else if (
    computerDifficulty === "medium"
  ) {

    possibleQuestions.sort(
      (a, b) =>
        b.score - a.score
    );


    const top =
      possibleQuestions.slice(
        0,
        Math.min(
          3,
          possibleQuestions.length
        )
      );


    selectedQuestion =
      top[
        Math.floor(
          Math.random() *
          top.length
        )
      ];

  }


  // HARD = best question
  else {

    possibleQuestions.sort(
      (a, b) =>
        b.score - a.score
    );

    selectedQuestion =
      possibleQuestions[0];

  }


  const key =
    selectedQuestion.category +
    ":" +
    selectedQuestion.value;


  askedQuestions[2][key] = true;


  setTimeout(() => {

    if (
      !gameStarted ||
      currentPlayer !== 2
    ) {
      return;
    }


    document.getElementById("status").textContent =
      "🤖 Computer asks: " +
      selectedQuestion.category +
      " = " +
      selectedQuestion.value;


    processQuestion(
      selectedQuestion.category,
      selectedQuestion.value
    );

  }, 1000);

}


// ========================================
// COMPUTER FINAL GUESS
// ========================================

function computerMakeGuess() {

  if (
    gameMode !== "computer" ||
    !gameStarted
  ) {
    return;
  }


  if (player2Remaining.length === 0) {

    gameStarted = false;

    document.getElementById("status").textContent =
      "🏆 You WIN!";

    document.getElementById("answer").textContent =
      "🤖 Computer has no candidates.";

    return;

  }


  const guess =
    player2Remaining[0];


  setTimeout(() => {

    if (!gameStarted) return;


    if (
      guess.name === player1Character.name
    ) {

      gameStarted = false;

      document.getElementById("status").textContent =
        "🤖 Computer WINS!";

      document.getElementById("answer").textContent =
        "🤖 Computer guessed " +
        guess.name +
        " correctly!";

    } else {

      currentPlayer = 1;

      updateTurnColor();

      document.getElementById("status").textContent =
        "Your turn: Ask a question.";

      document.getElementById("answer").textContent =
        "🤖 Computer guessed wrong!";

      createBoard();

    }

  }, 1000);

}


// ========================================
// MANUAL ELIMINATION
// ========================================

function eliminateCharacter(character) {

  if (!gameStarted) return;


  // ========================================
  // COMPUTER MODE
  // ========================================

  if (gameMode === "computer") {

    if (currentPlayer !== 1) return;


    const alreadyEliminated =
      player1Eliminated.some(
        c => c.name === character.name
      );


    if (alreadyEliminated) {

      // REVIVE
      player1Eliminated =
        player1Eliminated.filter(
          c => c.name !== character.name
        );


      if (
        !player1Remaining.some(
          c => c.name === character.name
        )
      ) {

        player1Remaining.push(
          character
        );

      }


      document.getElementById("answer").textContent =
        "🔄 " +
        character.name +
        " revived";

    } else {

      // ELIMINATE
      player1Eliminated.push(
        character
      );


      player1Remaining =
        player1Remaining.filter(
          c => c.name !== character.name
        );


      document.getElementById("answer").textContent =
        "❌ " +
        character.name +
        " eliminated";

    }


    if (player1Remaining.length === 1) {

      document.getElementById(
        "finalGuessBtn"
      ).style.display = "block";

      document.getElementById("status").textContent =
        "🎯 Make your FINAL GUESS!";

    } else {

      document.getElementById(
        "finalGuessBtn"
      ).style.display = "none";

    }


    createBoard();

    return;

  }


  // ========================================
  // 2 PLAYER MODE
  // ========================================

  if (gameMode === "2player") {

    let eliminatedList;
    let remainingList;


    if (currentPlayer === 1) {

      eliminatedList =
        player1Eliminated;

      remainingList =
        player1Remaining;

    } else {

      eliminatedList =
        player2Eliminated;

      remainingList =
        player2Remaining;

    }


    const alreadyEliminated =
      eliminatedList.some(
        c => c.name === character.name
      );


    if (alreadyEliminated) {

      // REVIVE
      eliminatedList =
        eliminatedList.filter(
          c => c.name !== character.name
        );


      if (
        !remainingList.some(
          c => c.name === character.name
        )
      ) {

        remainingList.push(
          character
        );

      }


      document.getElementById("answer").textContent =
        "🔄 " +
        character.name +
        " revived";

    } else {

      // ELIMINATE
      eliminatedList.push(
        character
      );


      remainingList =
        remainingList.filter(
          c => c.name !== character.name
        );


      document.getElementById("answer").textContent =
        "❌ " +
        character.name +
        " eliminated";

    }


    if (currentPlayer === 1) {

      player1Eliminated =
        eliminatedList;

      player1Remaining =
        remainingList;

    } else {

      player2Eliminated =
        eliminatedList;

      player2Remaining =
        remainingList;

    }


    const remaining =
      currentPlayer === 1
        ? player1Remaining.length
        : player2Remaining.length;


    document.getElementById(
      "finalGuessBtn"
    ).style.display =
      remaining === 1
        ? "block"
        : "none";


    if (remaining === 1) {

      document.getElementById("status").textContent =
        "Player " +
        currentPlayer +
        ": Make your FINAL GUESS!";

    }


    createBoard();

  }

}


// ========================================
// FINAL GUESS
// ========================================

function finalGuess() {

  if (!gameStarted) return;


  // ========================================
  // 2 PLAYER
  // ========================================

  if (gameMode === "2player") {

    let guess;
    let target;


    if (currentPlayer === 1) {

      guess = player1Remaining[0];
      target = player2Character;

    } else {

      guess = player2Remaining[0];
      target = player1Character;

    }


    if (!guess || !target) return;


    if (guess.name === target.name) {

      document.getElementById("status").textContent =
        "🏆 Player " +
        currentPlayer +
        " WINS!";

      document.getElementById("answer").textContent =
        "🎉 Correct guess!";

    } else {

      const winner =
        currentPlayer === 1 ? 2 : 1;

      document.getElementById("status").textContent =
        "🏆 Player " +
        winner +
        " WINS!";

      document.getElementById("answer").textContent =
        "❌ Wrong guess! Player " +
        winner +
        " wins.";

    }


    gameStarted = false;

    document.getElementById(
      "finalGuessBtn"
    ).style.display = "none";

    return;

  }


  // ========================================
  // COMPUTER
  // ========================================

  if (gameMode === "computer") {

    const guess =
      player1Remaining[0];


    if (!guess || !computerCharacter) {
      return;
    }


    if (
      guess.name === computerCharacter.name
    ) {

      document.getElementById("status").textContent =
        "🏆 YOU WIN!";

      document.getElementById("answer").textContent =
        "🎉 Correct guess!";

    } else {

      document.getElementById("status").textContent =
        "🤖 COMPUTER WINS!";

      document.getElementById("answer").textContent =
        "❌ Wrong guess!";

    }


    gameStarted = false;

    document.getElementById(
      "finalGuessBtn"
    ).style.display = "none";

  }

}


// ========================================
// FINAL BUTTON CONNECTION
// ========================================

const finalGuessButton =
  document.getElementById("finalGuessBtn");

if (finalGuessButton) {

  finalGuessButton.onclick =
    finalGuess;

}


// ========================================
// INITIAL BOARD
// ========================================

if (
  document.getElementById("board")
) {

  createBoard();

}