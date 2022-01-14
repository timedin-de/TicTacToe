//Player Selector: false = X true = O
var player = true;
//IF Game ended
var end = false;
//Counts turns to end when all fields clicked
var counter = 0;

//Adds function on click to every Game Field
window.onload = function() {
  var elems = document.getElementsByClassName("playgndIt");
  for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", fieldClicked)
  }
}

function fieldClicked(event) {
  if(end) {
    return;
  }
  //Get Field that was clicked
  target = event.currentTarget;
  //Check if Field is already set
  if(target.classList.contains("x-Set") || target.classList.contains("o-Set")) {
    return;
  }
    counter++;

  switch (player) {
    case true:
      //Add Class to Field
      target.classList.add("x-Set");
      //Put a X inside
      target.innerHTML = "X";
      //Switch current Player display
      document.getElementById("PlayerName").innerHTML="O";
      break;
    default:
      //Add Class to Field
      target.classList.add("o-Set");
      //Put a X inside
      target.innerHTML = "O";
      //Switch current Player display
      document.getElementById("PlayerName").innerHTML="X";
      break;
  }
  //Check if a Player won, show a alert and end the game
  if (checkWin(target)) {
    alert("Player " + (player ? "X":"O") + " won!");
    endGame();
    return;
  }
  //Check if all fields are set (when 9 rounds passed and no one has won)
  if(counter >= 9) {
    alert("Draw!");
    endGame();
    return;
  }
  //Switch players
  player = !player;
}
//FUNC will only check if newly placed one is in combination for win
function checkWin(currentTarget) {
  //get id of current clicked field (including x-y coordinate)
  var id = currentTarget.id;
  //Seperate Coordinates from id
  var xInd = id.charAt(5);
  var yInd = id.charAt(7);

  let vert = ["item-"+xInd+"-1", "item-"+xInd+"-2", "item-"+xInd+"-3"];
  let hori = ["item-1-"+yInd, "item-2-"+yInd, "item-3-"+yInd];
  let diaUp = ["item-1-1", "item-2-2", "item-3-3"];
  let diaDown = ["item-1-3", "item-2-2", "item-3-1"];

  var pChar = player ? "x":"o";
  var tmp = (checkPattern(vert,pChar) || checkPattern(hori,pChar) || checkPattern(diaUp,pChar) || checkPattern(diaDown,pChar));
  return tmp;
}
function checkPattern(patternArr,pChar) {

  var x = true;
  for (var i = 0; i < patternArr.length; i++) {
    var elem = document.getElementById(patternArr[i]);
    if(!elem.classList.contains(pChar+"-Set")) {
      return false;
    }
  }
  return true;
}

function endGame() {
  end = true;
  document.getElementById("playgnd").classList.add("Game_End");
}

function clearPlaygnd() {
  var elems = document.getElementsByClassName('playgndIt');
  for (var i = 0; i < elems.length; i++) {
    elems[i].innerHTML = "";
    elems[i].classList.remove("x-Set");
    elems[i].classList.remove("o-Set");
  }
  end = false;
  counter =0;
  document.getElementById("playgnd").classList.remove("Game_End");
}

