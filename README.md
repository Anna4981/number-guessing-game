Number Guessing Game

A simple browser game where the player guesses a randomly generated number within a range and gets higher/lower hints after every guess.

Built for Veda Technology, Web Development Track, Level 1, Day 25 (Task 25).

Features
Random target number between 1 and 100
Higher/lower feedback after each guess
Attempt counter (only valid guesses are counted)
Input validation: empty input, non-numbers, decimals and out-of-range guesses show an error message
Guess history shown as small tags
Best score saved in the browser with localStorage
"Play again" button that resets the game
Responsive layout that works on desktop and mobile
Tools Used
HTML5
CSS3
JavaScript (vanilla)
Project Structure
number-guessing-game/
├── index.html
├── style.css
├── script.js
└── README.md
How to Run
Download or clone this repository.
Open index.html in any modern browser. No installation is needed.
How to Play
Type a whole number between 1 and 100 and click Guess (or press Enter).
Read the hint: you will be told to go higher or lower.
Keep guessing until you find the number.
Click Play again to start a new round and try to beat your best score.
How It Works
Random number: Math.floor(Math.random() * (max - min + 1)) + min gives a whole number from min to max, both included.
State: the target number, attempt count and game-over flag are stored in variables and updated on every guess.
Validation: the guess must be a number, a whole number, and between the minimum and maximum before it counts as an attempt.
Reset: the startGame() function picks a new number and resets attempts, history, input and buttons. It runs on page load and when "Play again" is clicked.
Customizing

Change the range by editing MIN and MAX at the top of script.js.

Author

Anna Makgabo Thantsha# number-guessing-game
