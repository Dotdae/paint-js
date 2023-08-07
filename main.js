var isMouseDown = false;
var canvas = document.createElement("canvas");
var body = document.getElementsByTagName("body")[0];
var ctx = canvas.getContext("2d");
var linesArray = [];
currentSize = 5;
var currentColor = "#000000";
var currentBg = "#FFFFFF";

// Canvas loader.

createCanvas();

// Button event functions

document.getElementById("colorpicker").addEventListener("change", function () {
  currentColor = this.value;
});
document
  .getElementById("bgcolorpicker")
  .addEventListener("change", function () {
    ctx.fillStyle = this.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    redraw();
    currentBg = ctx.fillStyle;
  });
document.getElementById("controlSize").addEventListener("change", function () {
  currentSize = this.value;
  document.getElementById("showSize").innerHTML = this.value;
});
document.getElementById("saveToImage").addEventListener(
  "click",
  function () {
    downloadCanvas(this, "canvas", "masterpiece.png");
  },
  false
);
document.getElementById("eraser").addEventListener("click", eraser);
document.getElementById("clear").addEventListener("click", createCanvas);

function redraw() {
  for (var i = 1; i < linesArray.length; i++) {
    ctx.beginPath();
    ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
    ctx.lineWidth = linesArray[i].size;
    ctx.lineCap = "round";
    ctx.strokeStyle = linesArray[i].color;
    ctx.lineTo(linesArray[i].x, linesArray[i].y);
    ctx.stroke();
  }
}

// Draw event listeners.

canvas.addEventListener("mousedown", function () {
  mousedown(canvas, event);
});
canvas.addEventListener("mousemove", function () {
  mousemove(canvas, event);
});
canvas.addEventListener("mouseup", mouseup);

// Create the canvas.

function createCanvas() {
  canvas.id = "canvas";
  canvas.width = parseInt("1000");
  canvas.height = parseInt("800");
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  ctx.fillStyle = currentBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
}

function downloadCanvas(link, canvas, filename) {
  link.href = document.getElementById(canvas).toDataURL();
  link.download = filename;
}

function eraser() {
  currentSize = 50;
  currentColor = ctx.fillStyle;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function mousedown(canvas, evt) {
  var mousePos = getMousePos(canvas, evt);
  isMouseDown = true;
  var currentPosition = getMousePos(canvas, evt);
  ctx.moveTo(currentPosition.x, currentPosition.y);
  ctx.beginPath();
  ctx.lineWidth = currentSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
}

function mousemove(canvas, evt) {
  if (isMouseDown) {
    var currentPosition = getMousePos(canvas, evt);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
    store(currentPosition.x, currentPosition.y, currentSize, currentColor);
  }
}

function mouseup() {
  isMouseDown = false;
  store();
}
