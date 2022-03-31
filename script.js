//global variables
var pattern;
var progress = 0;
var gamePlaying = false;
var guessCounter = 0;
var failCounter = 0;
var hardMode = false;

var clueHoldTime = 350 //how long the clue plays for
var cluePauseTime = 250; //how long to pause in between clues
const nextClueWaitTime = 250; //how long to wait before starting playback of the clue sequence

var canGuess = true;
var tonePlaying = false;
const volume = .3;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startGame()
{
  canGuess = false;
  pattern = [...Array(8)].map(() => Math.ceil(Math.random() * 5))
  progress = 0;
  guessCounter = 0;
  failCounter = 0;
  gamePlaying = true;
  if (!hardMode)
  {
    clueHoldTime = 350;
    cluePauseTime = 250;
  }
  else
  {
    clueHoldTime = 100;
    cluePauseTime = 100;
  }

  //swap the Start and Stop buttons
  document.getElementById("startButton").classList.add("hidden");
  document.getElementById("stopButton").classList.remove("hidden");
  
  document.getElementById("hardModeButton").classList.add("hidden");
  document.getElementById("normalModeButton").classList.add("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  canGuess = true;
  stopTone(1);
  //swap the Start and Stop buttons
  document.getElementById("startButton").classList.remove("hidden");
  document.getElementById("stopButton").classList.add("hidden");
  
  if (hardMode)
  {
    document.getElementById("normalModeButton").classList.remove("hidden");
  }
  else
  {
    document.getElementById("hardModeButton").classList.remove("hidden");
  }
  
}

function toggleDifficulty() 
{
  if (!gamePlaying)
  {
    hardMode ^= true;
    if (hardMode) 
    {
      document.getElementById("hardModeButton").classList.add("hidden");
      document.getElementById("normalModeButton").classList.remove("hidden");
      document.body.style.backgroundColor = "#b0a289";
    }
    else
    {
      document.getElementById("hardModeButton").classList.remove("hidden");
      document.getElementById("normalModeButton").classList.add("hidden");
      document.body.style.backgroundColor = "#8997b0";
    }
  }
  else
  {
    alert("You can't switch modes while in game!");
  }
}

function lightButton(button)
{
  document.getElementById("button"+button).classList.add("lit")
}

function clearButton(button)
{
  document.getElementById("button"+button).classList.remove("lit")
}

function pushButton(button)
{
  if (canGuess)
  {
    startTone(button);
    guess(button);
  }
}

async function playSingleClue(button)
{
  if(gamePlaying && !tonePlaying)
  {
    startTone(button);
    setTimeout(stopTone, clueHoldTime, button);
    await timeout(clueHoldTime);
  }
}

function winGame()
{
  stopGame();
  alert("Game Over. You won!");
}

function loseGame()
{
  stopGame();
  if (!hardMode)
  {
    alert("Game Over. You lost.");
  }
  else
  {
    if(prompt("You made it " + progress + " rounds!\nEnter 'y' to copy your results for sharing, or anything else to close this window.") == 'y')
    {
      navigator.clipboard.writeText("I made it through " + progress + " round(s) of Memory Game! Play here: https://agreeable-rainy-colt.glitch.me/");
    }
  }
}

async function playClueSequence()
{
  canGuess = false;
  context.resume()
  let delay = nextClueWaitTime + 500; //set delay to initial wait time
  guessCounter = 0;
  for(let i=0;i<=progress;i++)
  { //for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i]); //set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  await timeout(delay);
  canGuess = true;
}

async function guess(button)
{
  console.log("user guessed: " + button);
  if(!gamePlaying || !canGuess)
  {
    return;
  }
  //if the guess is correct
  if (!hardMode)
  {
    if(pattern[guessCounter] == button)
    {
      //if all the guesses so far are correct
      if(guessCounter == progress)
      {
        if(progress == 7)
        {
          winGame();
        } 
        else
        {
          clueHoldTime -= 25;
          progress++;
          if (gamePlaying) 
          {
              playClueSequence();
          }
        }
      }
      else 
      {
        guessCounter++;
      }
    }
    else 
    {
      if (++failCounter == 3) 
      {
        loseGame();
      }
      else 
      {
        stopTone(1);
        document.getElementById("alertText").classList.remove("hidden");
        await timeout(2000);
        document.getElementById("alertText").classList.add("hidden");
        

        if (gamePlaying) 
        {
              playClueSequence();
        }
      }
    }
  }
  else
  {
    if (pattern[guessCounter] == button)
    {
      if (guessCounter == progress)
      {
        pattern.push(Math.ceil(Math.random() * 5));
        progress++;
        if (gamePlaying)
        {
            playClueSequence();
        }
      }
      else
      {
        guessCounter++;
      }
    }
    else 
    {
      if (++failCounter == 3) 
      {
        loseGame();
      }
      else 
      {
        stopTone(1);
        document.getElementById("alertText").classList.remove("hidden");
        await timeout(2000);
        document.getElementById("alertText").classList.add("hidden");
        if (gamePlaying) 
        {
              playClueSequence();
        }
      }
    }
  }
}

// Sound Synthesis Functions
const freqMap = 
{
  1: 295,
  2: 322.5,
  3: 366.9,
  4: 400,
  5: 426
}

function startTone(button) 
{
  if(!tonePlaying) 
  {
    context.resume()
    o.frequency.value = freqMap[button]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    lightButton(button);
    setTimeout(stopTone, clueHoldTime, button)
  }
}

function stopTone(button) 
{
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
  clearButton(button);
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)