/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp)
  const KEY = {
    LEFT: 37,
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
  };
  var walker = {
   positionX: 0, // the x-coordinate location for the walker
   positionY: 0, // the y-coordinate location for the walker
   speedX: 0, // the speed for the walker along the x-axis
   speedY: 0, // the speed for the walker along the y-axis
}
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      console.log("left pressed")
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT){
      console.log("right pressed");
      walker.speedX = 5;
    } else if (event.which === KEY.UP){
      console.log("up pressed");
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN){
      console.log("down pressed");
      walker.speedY = 5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT){
      console.log("left released")
      walker.speedX = 0;
    } else if (event.which === KEY.RIGHT){
      console.log("right released");
      walker.speedX = 0;
    } else if (event.which === KEY.UP){
      console.log("up released");
      walker.speedY = 0;
    } else if (event.which === KEY.DOWN){
      console.log("down released");
      walker.speedY = 0;
    }
  }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.positionX += walker.speedX; // update the position of the walker along the x-axis
    walker.positionY += walker.speedY; // update the position of the walker along the y-axis
  }
  
  function redrawGameItem(){
    $("#walker").css("left", walker.positionX); // draw the walker in the new location, positionX pixels away from the "left"
    $("#walker").css("up", walker.positionY); // draw the walker in the new location, positionY pixels away from the "top"
    $("#walker").css("right", walker.positionX); // draw the walker in the new location, positionY pixels away from the "right"
    $("#walker").css("down", walker.positionY); // draw the walker in the new location, positionY pixels away from the "bottom" 
  }

  function wallCollision(){
    var rightWall = $("#board").width();
    var bottomWall = $("#board").height();
    var leftWall = 0;
    var topWall = 0;
    if (walker.positionX == rightWall || leftWall){
      walker.positionX -= walker.speedX;
    }
    if (walker.positionY == bottomWall || topWall) {
      walker.positionY -= walker.speedY;
    }
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  

