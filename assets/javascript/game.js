// Game logic //

// Create an array of secret words for the user to guess, and variables to count wins and
// number of guesses

var secretWords = ['brioche','pita','challah','injera','rye','focaccia','naan','sourdough','lefse','cornbread','frybread']
var wins = 0;
var currentIndex = 0;
var secretWord = secretWords[currentIndex];
var display = repeatChar(secretWord,'_');

// Loop through the array (one word for each round of the game)

// Create a function that generates a display variable that shows the user's progress
// parameters are the length of the display string (count) and the key input (ch)

function repeatChar(count, ch) {
    var display = [];
    for (var i = 0; i < count; i++) {
      display.push(ch);
      }
    return display;
    }

//Create a function that takes two strings

function matchingLetters(str,guess) {
    var indices = [];
    for(var i=0; i<str.length;i++) {
        if (str[i] === guess) {
          indices.push(i);
        }
    }
  return indices;
}

// BEGIN LOGIC
// =============================================================================


    console.log("the secret word is: " + secretWord);

    console.log("the display is: " + display);

  
    document.onkeyup = function(event) {

    //set the user's guess to a variable & set the secret word to the current index.
     
    //if tostring-Display != secretWord and the current index is less than the length of the array

    //do the following logic..

    //but if it is equal, increment the current index, and the number of wins

      var userGuess = event.key.toLowerCase();
  
    //Find out what indices in the secret word match the user's guess

      var indices = matchingLetters(secretWord,userGuess);

    //iterate through any matching index positions, updating the display variable with any matches

      if (indices.length > 0) {
          for (var i=0; i < indices.length;i++) {
              if (display[indices[0]] === '_') {
                  display[indices[0]] = guess;
                  console.log(display.join(' '));
                }
            }
        }
        else {
            console.log("Sorry, try again");
        }

    //print new display value

    console.log('new display value: ' + display);
      
    //If the user wins, update the win counter

    //Decrement the number of remaining guesses;

  } //ends logic for single guess

