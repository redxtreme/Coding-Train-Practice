var cols;
var rows;
var w = 40;
var grid = [];

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Drawing area
  cols = floor(width/w);
  rows = floor(height/w);

  // Create a two dimentional Array
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
}

// Animation loop
function draw() {
  background(51);

  // Create a two dimentional Array
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    noFill();
    rect(x,y,w,w);
  }
}
