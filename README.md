# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **COLIN ROCKS**

Time spent: **5** hours spent in total

Link to project: [https://glitch.com/edit/#!/agreeable-rainy-colt](https://glitch.com/edit/#!/agreeable-rainy-colt)

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (border and buttons style)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] When a guess is incorrect, an alert shows up and the game pauses to give the user time to read it, then hides itself
- [x] If a button is pressed during the clue phase, nothing happens
- [x] Hard mode feature which speeds up the game and allows it to go indefinitely
- [x] Button to switch modes (only works if you are not currently in a game, otherwise it's not visible)
- [x] Share feature allowing you to copy how many guesses you got up to in hard mode to your clipboard
- [x] Change background when in hard mode
- [x] Resizing the screen keeps all elements centered (625 px wide screens and up will show as intended)

## Video Walkthrough (GIF)

Gif 1 shows all required and optional functionality, and that pressing a button during the clue phase does nothing:

![](demo1.gif)

Gif 2 shows the rest of the features:

![](demo2.gif)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

I referenced [Mozilla's developer docs](https://developer.mozilla.org/en-US/) a lot for information on async/await, arrow functions,
etc. in order to implement some of my functions. Other than this, I just used the CodePath spec and my limited prior knowledge.

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

If I have to single out one problem as particularly challenging, it would for sure be
not allowing user inputs while clues are being given. If inputs were allowed, users
would be able to guess as the clues are being given, or suppress the audio/visual cues,
sometimes circumventing the cues completely. To fix this, I had to readup on how setTimeout
works in JavaScript. This led me to understand that other functions will still run while
setTimeout is waiting for the timer to be done -- I needed everything to halt -- which brought
me to async/await. I used the principles of async/await to make a timeout function that pauses
or sleeps the process, and then called it to sleep for the duration of the clue (and between
clue phases). Essentially, the sound is played and the button is lit, then the process sleeps
until the next clue is ready to be played, and this repeats until we get to the current game state,
where the process then allows user input again until the next clue phase.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

This project really simplified what web development is for me. It made it very easy to see
exactly what to do; it made the connection between what I'm doing and how it'll display on the
webpage become very evident to me. It got me thinking about how such simple webpages
like the New York Times' new word game Wordle can connect us with those around us, and
I have the itch to learn how to build something like Wordle from scratch. I am also now
curious about the differences between different frameworks like React.js and Angular.js,
and how these frameworks or a separate language like TypeScript could change or improve
the development experience of this project, or the end-user experience of the webpage.
How are they better than JavaScript? Which should you use and when? These are all
questions that I would love to have answered.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)

Had I more time, I would implement a pop-up-like list of instructions that can be clicked
away from. Once you read the instructions once, you don't need to see them on the screen
at all times -- it just clutters things up. There'd be a button to view the rules again, of
course. I also think it'd be interesting to try and allow keypresses as inputs. i.e.:
pressing "1" guesses the first box and lights it up. I'd also want to record the performance
of users who use the number inputs vs users who click the boxes -- would it have an impact
on performance? A leaderboard feature that saves high-scores over a certain number (to prevent
spam) would also be cool and improve engagement, though that requires SQLite or something
similar that is beyond the scope of this project.

## License

    Copyright Colin Rocks

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
