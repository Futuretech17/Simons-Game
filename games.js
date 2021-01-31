// An array of choices that a comp will need to make
var buttonColors = ["red","blue","green","yellow"];
// A variable for gamepattern
var gamePattern = [];
// Human Pattern
var userClickedPattern = [];
// Variable to store the level a player is in
var level = 0;
//creating a new pattern
function nextSequence(){
  userClickedPattern = [];
  // Keeping track of levels
  $("h1").text("level " + level);
  level++;
  // Creating a random Number
  var randomNumber = Math.floor(Math.random()*4);
  // Using the random Number to acess the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];

  // Using jQuery to select the button with the same id as the randomNumberChosen
  var chosenButtonid = "#" + randomChosenColor;

  var chosenButtonMp3 =  randomChosenColor + ".mp3";


  // Adding the randomChosenColor to the gamePattern array
  gamePattern.push(randomChosenColor);
  compButtonAnimate(chosenButtonid,chosenButtonMp3)
}
// Starting the game.
var started = false;

$(document).on("keydown", function(){

  if(!started){
    nextSequence();
    started = true;
  }
});

function compButtonAnimate(chosenButtonid,chosenButtonMp3){

  $(chosenButtonid).fadeOut(100).fadeIn(100);
  console.log(chosenButtonid);
  var chosenButtonaudio = new Audio(chosenButtonMp3);
  chosenButtonaudio.play();
}

$(".container .btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkanswer(userClickedPattern.length-1);
});

//function to animate the pressed button by the user

function playSound(userChosenColor){
  var chosenButtonMp3 = userChosenColor + ".mp3";

  var chosenButtonid = "#" + userChosenColor;

  var chosenButtonaudio = new Audio(chosenButtonMp3);
  chosenButtonaudio.play();
  // Animation of the pressed button.
  $(chosenButtonid).addClass("pressed");
  setTimeout(function(){
    $(chosenButtonid).removeClass("pressed")
  }, 100);
}

function checkanswer(userPatternLength){
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (gamePattern[userPatternLength] === userClickedPattern[userPatternLength]){
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }else {
    console.log("wrong");
    var wrongaudio = new Audio("sounds/wrong.mp3");
    wrongaudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },100);
    $("h1").text("Game Over, Press any Key to Restart the Game");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
