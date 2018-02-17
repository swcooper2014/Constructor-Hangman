var inquirer = require('inquirer');



var guessWordList = require('./game.js');


var checkForLetter = require('./word.js');


var lettersToDisplay = require('./letter.js');




var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayHangman;





var game = {

  wordBank : guessWordList, 
  guessesRemaining : 10,
  currentWrd : null, 

  startGame : function(){
   
    this.guessesRemaining = 10;

   
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWrd = this.wordBank[j];

    
   console.log("Welcome to Coding Hangman!");
   console.log("Guess a letter of the name of a Color");
   console.log("Goodluck!");
   console.log("-----------------------------");

    
    displayHangman = new lettersToDisplay(this.currentWrd);
    displayHangman.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);

    
    keepPromptingUser();
  }

};




function keepPromptingUser(){

  
  console.log('');


  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

     
      var inputLetter = userInput.letter.toLowerCase();
      
      
      if(alphabet.indexOf(inputLetter) == -1){

       
        console.log('Wait, "' + inputLetter + '" is not a letter. Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        
        console.log('Wait! You already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        keepPromptingUser();

      }
      else{

        
        lettersAlreadyGuessed.push(inputLetter);


        var letterInWord = checkForLetter(inputLetter, game.currentWrd);

       
        if(letterInWord){

          
          lettersCorrectlyGuessed.push(inputLetter);

          
          displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
          displayHangman.parseDisplay();


         
          if(displayHangman.winner){
            console.log('You win! Congrats!');
            
            return;
          }
         
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            keepPromptingUser();
          }

        }
       
        else{
          game.guessesRemaining--;

          displayHangman.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          keepPromptingUser();
        }
        
      }

    });
    
  }
  
  else{
    console.log('Sorry! You lose!');
    console.log('Oh yeah. FYI. The word was "' + game.currentWrd + '".');
  }

}


game.startGame();