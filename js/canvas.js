// local storage 
// Sauvegarder les informations dans l’espace local courant
localStorage.setItem("lastName", "firstName");
sessionStorage.setItem('stationAdress', 'stationName');


var button = document.getElementById("btnResa")
var canvasBlock = document.getElementById("canvasBlock")
var stationInfo = document.getElementById("stationInfo")

canvas = document.getElementById('canvas');
context = canvas.getContext('2d');


button.addEventListener("click", function(e) {
    stationInfo.style.display = "none"
    canvasBlock.style.display = "block";
    context.clearRect(0, 0, 300, 150);
});

// CANVAS
// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
    window.addEventListener('load', function () {
      var canvas, context, tool;
    
      // Initialization sequence.
      function init () {
        // Find the canvas element.
        canvas = document.getElementById('canvas');
    
        // Get the 2D canvas context.
        context = canvas.getContext('2d');

        // Pencil tool instance.
         tool = new tool_pencil();
    
    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }

  // This painting tool works like a drawing pencil which tracks the mouse 
  // movements.
  function tool_pencil () {
    var tool = this;
    this.started = false;

    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };

    // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
        document.getElementById("btnSign").disabled = false;
      }
    };

    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
  }

  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    // Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

  init();

}, false); }
