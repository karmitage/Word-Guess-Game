// Game logic //

// Create an array of secret words for the user to guess, and variables to count wins and
// number of guesses

var secretWords = ['brioche', 'pita', 'challah', 'injera', 'rye', 'focaccia', 'naan', 'sourdough', 'lefse', 'cornbread', 'frybread']
var wins = 0; //set number of total wins to 0
var currentIndex = 0; //set the current index to 0
var secretWord = secretWords[currentIndex]; //initialize the secret word to the first index in the secret word array
var display = []; //initialize the array that will be displayed to the user with underscores equal to the length of the array
var maxTries = 10; //number of attempts the user gets to guess the letters in a word 
var currentTries = 0; //variable to hold the number of tries in a round of the game

// Functions

// Create a function that generates a display variable that shows the user's progress
// parameters are the length of the display string (count) and the key input (ch)

function repeatChar(count, ch) {
  var display = [];
  for (var i = 0; i < count; i++) {
    display.push(ch);
  }
  return display;
}

// Create a function that resets the game to the next word in the array (this will be used at the end of each round)

function renderGame() {
  // If there are still more words in the array, set the display and write it to the page
  if (currentIndex <= (secretWords.length - 1)) {
    secretWord = secretWords[currentIndex];
    display = repeatChar(secretWord.length, '_');
    tries = 0;
    document.querySelector("#progress").innerHTML = "Guess the bread: " + display;
    document.querySelector("#wins").innerHTML = "Total Wins: " + wins;
  }
  // If the supply of breads has been exhausted, render the end game screen.
  else {
    document.querySelector("#progress").innerHTML = "Game Over!";
    document.querySelector("#results").innerHTML = "Refresh the page to play again.";
    document.querySelector("#wins").innerHTML = "Total Wins: " + wins;
  }
}

//Create a function that takes two strings and returns the index positions in the first string that match the second string
// This will be used to evalaute user guesses

function matchingLetters(str, guess) {
  var indices = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === guess) {
      indices.push(i);
    }
  }
  return indices;
}

//Create a function that modifies the display array if the user correctly guesses a letter

function modifyDisplay(indexArray, display, letterGuess) {
  if (indexArray.length > 0) {
    for (var i = 0; i < indexArray.length; i++) {
      if (display[indexArray[i]] === '_') {
        display[indexArray[i]] = letterGuess;
      }
    }
  }
  return display;
}

//initialize the game on page load:

renderGame();

// MAIN LOGIC
// =============================================================================

//when a key is pressed and released:

document.onkeyup = function (event) {

  //if the number of keystrokes exceeds the max number of guesses for that round, end the function

  if (tries >= maxTries) {
    document.querySelector("#results").innerHTML = "Sorry, you've run out of tries for this bread. Try again with the next bread";
    currentIndex++; //increment current index
    renderGame(); //reload game
    return;
  }

  //set the user's guess to a variable

  var userGuess = event.key.toLowerCase();
  console.log("the secret word is: " + secretWord);
  console.log("user guess is: " + userGuess);

  //Find out what indices in the secret word match the user's guess (if any)

  var indices = matchingLetters(secretWord, userGuess);
  console.log("indices are: " + indices);

  //Update the display with any matches

  display = modifyDisplay(indices, display, userGuess);
  console.log("display is: " + display);

  //if the display is now equal to the secret word:
  // 1.increment the wins, 
  // 2.increment the current index
  // 3.reset the game
  // 4.display a message with the number of wins
  //if the word was not guessed, invite the user to try again

  if (display.join('') === secretWord) {
    wins++; //increment wins
    document.querySelector("#results").innerHTML = "You won! The secret word is: " + secretWord;
    currentIndex++; //increment current index
    renderGame();
  }

  else {
    tries++; //increment tries
    document.querySelector("#results").innerHTML = "Try to guess the next letter: " + display;
  }


} //end logic 
