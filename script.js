// ========================================
// GUESS THE PERSON — FINAL GAME BUILD
// ========================================
let soundEnabled = true;

function playSound(type){
  if(!soundEnabled) return;

  try{
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    if(!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const sounds = {
      click: [500,0.08],
      yes: [700,0.15],
      no: [250,0.15],
      win: [900,0.25],
      lose: [180,0.25]
    };

    const s = sounds[type] || sounds.click;

    osc.frequency.value = s[0];
    osc.type = "sine";

    gain.gain.setValueAtTime(0.08,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime+s[1]
    );

    osc.start();
    osc.stop(ctx.currentTime+s[1]);
  }catch(e){}
}
let vibrationEnabled = true;

function vibrate(type="light"){
  if(!vibrationEnabled) return;
  if(!navigator.vibrate) return;

  if(type==="win"){
    navigator.vibrate([100,80,100,80,200]);
  }else if(type==="lose"){
    navigator.vibrate([250,100,250]);
  }else{
    navigator.vibrate(40);
  }
}
let musicEnabled = true;
let musicContext = null;
let musicOscillator = null;

function startMusic(){
  if(!musicEnabled || musicOscillator) return;

  try{
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    if(!AudioContext) return;

    musicContext = new AudioContext();
    musicOscillator = musicContext.createOscillator();
    const gain = musicContext.createGain();

    musicOscillator.type = "sine";
    musicOscillator.frequency.value = 220;

    gain.gain.value = 0.015;

    musicOscillator.connect(gain);
    gain.connect(musicContext.destination);

    musicOscillator.start();
  }catch(e){}
}

function stopMusic(){
  try{
    if(musicOscillator){
      musicOscillator.stop();
      musicOscillator.disconnect();
      musicOscillator=null;
    }

    if(musicContext){
      musicContext.close();
      musicContext=null;
    }
  }catch(e){}
}
let gamesPlayed = Number(localStorage.getItem("gamesPlayed") || 0);
let wins = Number(localStorage.getItem("wins") || 0);
let winStreak = Number(localStorage.getItem("winStreak") || 0);

function saveStats(){
  localStorage.setItem("gamesPlayed", gamesPlayed);
  localStorage.setItem("wins", wins);
  localStorage.setItem("winStreak", winStreak);
}
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

const IMAGE_BASE = "https://akibandsajid-art.github.io/Atif/";
const questionData = {
  gender:["Male","Female"], eyes:["Blue","Green","Brown","Black"], hair:["Bald","Short","Long"],
  hairColor:["Brown","Black","Blonde","Gray","Red"], skin:["Light","Olive","Dark"],
  accessories:["None","Glasses","Headwear","Jewelry"], facialHair:["None","Moustache","Beard"]
};
const questionNames = {gender:"Gender",eyes:"Eye Color",hair:"Hair",hairColor:"Hair Color",skin:"Skin Tone",accessories:"Accessories",facialHair:"Facial Hair"};
const questionIcons = {gender:"👤",eyes:"👁️",hair:"💇",hairColor:"🎨",skin:"🖐️",accessories:"👓",facialHair:"🧔"};

let gameMode = null;
let computerDifficulty = "easy";
let player1Character = null, player2Character = null, computerCharacter = null;
let player1Remaining = [...characters], player2Remaining = [...characters];
let player1Eliminated = [], player2Eliminated = [];
let player1Board = [...characters], player2Board = [...characters];
let askedQuestions = {1:{},2:{}};
let currentPlayer = 1;
let gameStarted = false;
let selectingSecret = true;
let lastQuestion = null;
let revealTimer = null;

const $ = id => document.getElementById(id);
function imageUrl(character){return IMAGE_BASE + character.name.replace(/[^a-z0-9]/gi,"").toLowerCase() + ".png";}
function drawCharacter(character){return `<img src="${imageUrl(character)}" alt="${character.name}" draggable="false">`;}
function shuffleCharacters(list){for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;}
function setScreen(name){document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));$(name).classList.remove("hidden");}

function resetGameVariables(){
  player1Character=null;player2Character=null;computerCharacter=null;
  player1Remaining=[...characters];player2Remaining=[...characters];
  player1Eliminated=[];player2Eliminated=[];
  player1Board=[...characters];player2Board=[...characters];
  askedQuestions={1:{},2:{}};player1BoardShuffled=false;player2BoardShuffled=false;currentPlayer=1;gameStarted=false;selectingSecret=true;lastQuestion=null;
  ["questionPanel","actionPanel","questionResult","finalGuessBtn"].forEach(id=>$(id)?.classList.add("hidden"));
  $("questionButtons").innerHTML="";$("board").innerHTML="";
}

function goHome(){
  if(revealTimer){clearTimeout(revealTimer);revealTimer=null;}
  document.querySelectorAll(".modal").forEach(m=>m.classList.add("hidden"));
  resetGameVariables();gameMode=null;setScreen("homeScreen");
}
function startGame(mode){startMusic();gameMode=mode;resetGameVariables();setScreen("gameScreen");updateTurnUI();renderSecretBoard();$("status").textContent="PLAYER 1 • CHOOSE YOUR SECRET CHARACTER";}
function showDifficulty(){$("difficultyScreen").classList.remove("hidden");}
function startComputerGame(difficulty){gameMode="computer";computerDifficulty=difficulty;resetGameVariables();setScreen("gameScreen");updateTurnUI();renderSecretBoard();$("status").textContent="YOU • CHOOSE YOUR SECRET CHARACTER";}

function selectSecretCharacter(character){
  if(gameStarted)return;

  if(gameMode==="2player"){
    // PLAYER 1 chooses first. Immediately shuffle ONLY Player 2's board.
    if(currentPlayer===1){
      player1Character=character;

      if(!player2BoardShuffled){
        player2Board=shuffleCharacters([...characters]);
        player2BoardShuffled=true;
      }

      currentPlayer=2;
      updateTurnUI();
      $("status").textContent="PLAYER 2 • CHOOSE YOUR SECRET CHARACTER";
      renderSecretBoard();
      return;
    }

    // PLAYER 2 chooses. Now shuffle ONLY Player 1's board.
    player2Character=character;

    if(!player1BoardShuffled){
      player1Board=shuffleCharacters([...characters]);
      player1BoardShuffled=true;
    }

    currentPlayer=1;
    gameStarted=true;
    selectingSecret=false;
    updateTurnUI();
    beginTurn();
    return;
  }

  // COMPUTER MODE
  player1Character=character;
  const choices=characters.filter(c=>c.name!==character.name);
  computerCharacter=choices[Math.floor(Math.random()*choices.length)];

  if(!player1BoardShuffled){
    player1Board=shuffleCharacters([...characters]);
    player1BoardShuffled=true;
  }

  currentPlayer=1;
  gameStarted=true;
  selectingSecret=false;
  updateTurnUI();
  beginTurn();
}

function renderSecretBoard(){
  const board=$("board");board.innerHTML="";
  const list=currentPlayer===1?player1Board:player2Board;
  list.forEach(character=>{
    const card=document.createElement("button");card.className="character";card.innerHTML=`<div class="avatar">${drawCharacter(character)}</div><div class="character-name">${character.name}</div>`;
    card.onclick=()=>selectSecretCharacter(character);board.appendChild(card);
  });
}

function beginTurn(){
  lastQuestion=null;$("questionResult").classList.add("hidden");$("questionResult").classList.remove("yes","no");
  $("actionPanel").classList.remove("hidden");$("finalGuessBtn").classList.add("hidden");$("passBtn").classList.remove("hidden");
  $("questionPanel").classList.remove("hidden");renderQuestionButtons();createBoard();
  $("status").textContent=gameMode==="computer"?(currentPlayer===1?"YOUR TURN • ASK A QUESTION":"🤖 COMPUTER TURN"):"PLAYER "+currentPlayer+" • ASK A QUESTION";
  if(gameMode==="computer"&&currentPlayer===2)setTimeout(computerTurn,700);
}

function currentRemaining(){
  if(currentPlayer===1){
    return player1Remaining;
  }else{
    return player2Remaining;
  }
}
function currentEliminated(){
  if(currentPlayer===1){
    return player1Eliminated;
  }else{
    return player2Eliminated;
  }
}
function currentBoard(){
  if(currentPlayer===1){
    return player1Board;
  }else{
    return player2Board;
  }
}
function targetCharacter(){return gameMode==="2player"?(currentPlayer===1?player2Character:player1Character):(currentPlayer===1?computerCharacter:player1Character);}
function setCurrentState(remaining,eliminated){
  if(currentPlayer===1){
    player1Remaining=remaining;
    player1Eliminated=eliminated;
  }else{
    player2Remaining=remaining;
    player2Eliminated=eliminated;
  }
}

function createBoard(){
  const board=$("board");board.innerHTML="";const list=currentBoard();const eliminated=currentEliminated();
  list.forEach(character=>{
    const card=document.createElement("button");card.className="character";
    const isElim=eliminated.some(c=>c.name===character.name);
    card.innerHTML=`<div class="avatar">${drawCharacter(character)}</div><div class="character-name">${character.name}</div>${isElim?'<div class="eliminated-cross">✕</div>':''}`;
    if(gameMode==="computer"&&currentPlayer===2){card.disabled=true;}else{card.onclick=()=>eliminateCharacter(character);}
    board.appendChild(card);
  });
}

function renderQuestionButtons(){
  const wrap=$("questionButtons");wrap.innerHTML="";
  Object.keys(questionData).forEach(category=>{
    const b=document.createElement("button");b.textContent=questionNames[category];
    const hasAvailable=questionData[category].some(v=>!askedQuestions[currentPlayer][category+":"+v]);
    b.disabled=!hasAvailable;b.onclick=()=>showQuestion(category);wrap.appendChild(b);
  });
}
function showQuestion(category){
  playSound("click");
  vibrate();
  if(!gameStarted||selectingSecret||currentPlayer===2&&gameMode==="computer")return;
  $("questionIcon").textContent=questionIcons[category];$("questionTitle").textContent=questionNames[category];
  const box=$("questionOptions");box.innerHTML="";
  questionData[category].forEach(value=>{
    const b=document.createElement("button");b.textContent=value;const key=category+":"+value;
    b.disabled=!!askedQuestions[currentPlayer][key];
    if(!b.disabled)b.onclick=()=>{askedQuestions[currentPlayer][key]=true;closeQuestion();processQuestion(category,value);};
    box.appendChild(b);
  });
  $("questionModal").classList.remove("hidden");
}
function closeQuestion(){$("questionModal").classList.add("hidden");}

function processQuestion(category,value){
  const target=targetCharacter();if(!target)return;
  const yes=target[category]===value;
  lastQuestion={category,value,yes};
  showQuestionResult(category,value,yes);
  if(gameMode==="computer"&&currentPlayer===2){
    applyQuestionToCurrent(category,value,yes);
    createBoard();
    if(player2Remaining.length<=1){setTimeout(()=>computerMakeGuess(),700);return;}
    setTimeout(()=>{currentPlayer=1;updateTurnUI();beginTurn();},900);return;
  }
  applyQuestionToCurrent(category,value,yes);createBoard();renderQuestionButtons();
  if(currentRemaining().length<=1){showGuessState();}
  else{$("status").textContent=gameMode==="computer"?"YOUR TURN • CHECK YOUR BOARD THEN PASS":"PLAYER "+currentPlayer+" • CHECK YOUR BOARD THEN PASS";$("questionPanel").classList.add("hidden");$("passBtn").classList.remove("hidden");}
}

function applyQuestionToCurrent(category,value,yes){
  const remaining=currentRemaining();const newRemaining=yes?remaining.filter(c=>c[category]===value):remaining.filter(c=>c[category]!==value);
  const eliminated=characters.filter(c=>!newRemaining.some(r=>r.name===c.name));setCurrentState(newRemaining,eliminated);
}
function showQuestionResult(category,value,yes){
  playSound(yes ? "yes" : "no");
  vibrate();
  const box=$("questionResult");box.classList.remove("hidden","yes","no","pulse-result");void box.offsetWidth;box.classList.add(yes?"yes":"no","pulse-result");box.innerHTML=`<span>${questionNames[category]}: ${value}</span><strong>${yes?"YES ✓":"NO ✕"}</strong>`;
}
function showGuessState(){
  $("questionPanel").classList.add("hidden");$("passBtn").classList.add("hidden");$("finalGuessBtn").classList.remove("hidden");
  $("status").textContent=gameMode==="computer"?"🎯 YOUR FINAL GUESS IS READY":"🎯 PLAYER "+currentPlayer+" • FINAL GUESS IS READY";
  $("actionPanel").classList.remove("hidden");
}

function eliminateCharacter(character){
  if(!gameStarted||selectingSecret||gameMode==="computer"&&currentPlayer===2)return;
  let eliminated=[...currentEliminated()];const exists=eliminated.some(c=>c.name===character.name);const remaining=currentRemaining();
  if(exists){eliminated=eliminated.filter(c=>c.name!==character.name);}
  else{
    if(remaining.length<=1)return;
    eliminated.push(character);
  }
  const newRemaining=characters.filter(c=>!eliminated.some(e=>e.name===c.name));setCurrentState(newRemaining,eliminated);createBoard();
  if(newRemaining.length<=1)showGuessState();
}

function passTurn(){
  if(!gameStarted||currentRemaining().length<=1)return;
  if(gameMode==="2player"){currentPlayer=currentPlayer===1?2:1;updateTurnUI();beginTurn();return;}
  if(currentPlayer===1){currentPlayer=2;updateTurnUI();beginTurn();}
}

function computerTurn(){
  if(!gameStarted||gameMode!=="computer"||currentPlayer!==2)return;

  $("questionPanel").classList.add("hidden");
  $("actionPanel").classList.add("hidden");
  $("status").textContent="🤖 COMPUTER IS THINKING...";

  const possible=[];

  Object.keys(questionData).forEach(category=>{
    questionData[category].forEach(value=>{
      const key=category+":"+value;
      if(askedQuestions[2][key])return;

      const yesCount=player2Remaining.filter(c=>c[category]===value).length;
      const noCount=player2Remaining.length-yesCount;

      possible.push({
        category,
        value,
        score:Math.min(yesCount,noCount)
      });
    });
  });

  if(!possible.length){
    setTimeout(computerMakeGuess,1800);
    return;
  }

  possible.sort((a,b)=>b.score-a.score);

  let question;

  if(computerDifficulty==="hard"){
    question=possible[0];
  }else if(computerDifficulty==="medium"){
    question=possible[
      Math.floor(Math.random()*Math.min(4,possible.length))
    ];
  }else{
    question=possible[
      Math.floor(Math.random()*possible.length)
    ];
  }

  askedQuestions[2][question.category+":"+question.value]=true;

  setTimeout(()=>{
    const target=player1Character;
    const yes=target[question.category]===question.value;

    lastQuestion={
      category:question.category,
      value:question.value,
      yes
    };

    showQuestionResult(
      question.category,
      question.value,
      yes
    );

    applyQuestionToCurrent(
      question.category,
      question.value,
      yes
    );

    createBoard();

    if(player2Remaining.length<=1){
      setTimeout(computerMakeGuess,2000);
      return;
    }

    setTimeout(()=>{
      currentPlayer=1;
      updateTurnUI();
      beginTurn();
    },2000);

  },2000);
}

function computerMakeGuess(){
  if(!gameStarted)return;
  const guess=player2Remaining[0];
  if(!guess){gameStarted=false;showFinalReveal(null,player1Character,false);return;}
  setTimeout(()=>{
  const computerWon=guess.name===player1Character.name;
  recordGameResult(!computerWon);
  showFinalReveal(guess,player1Character,computerWon,true);
},900);
}

function finalGuess(){
  if(!gameStarted)return;const remaining=currentRemaining();if(!remaining.length)return;
  const guess=remaining[0];const secret=targetCharacter();if(!secret)return;
  gameStarted=false;
$("questionPanel").classList.add("hidden");
$("actionPanel").classList.add("hidden");

const correct=guess.name===secret.name;
  gamesPlayed++;
  if(correct){
  wins++;
  winStreak++;
}else{
  winStreak=0;
  }
saveStats();
playSound(correct ? "win" : "lose");
  vibrate(correct ? "win" : "lose");

showFinalReveal(guess,secret,correct,false);
}

function makeRevealCard(character,extraClass=""){return character?`<div class="reveal-card ${extraClass}"><img src="${imageUrl(character)}" alt="${character.name}"></div>`:`<div class="reveal-card ${extraClass}"></div>`
