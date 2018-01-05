var cols;
var rows;
var w = 40;
var grid = [];

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Drawing area
  cols = floor(width / w);
  rows = floor(height / w);

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

// Cell constructor
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true] // top, right, bottom, left

  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    // Corners
    var topLeftX = x;
    var topLeftY = y;
    var topRightX = x + w;
    var topRightY = y;
    var bottomLeftX = x;
    var bottomLeftY = y + w;
    var bottomRightX = x + w;
    var bottomRightY = y + w;

    // Draw cell walls
    if (this.walls[0])
      line(topLeftX, topLeftY, topRightX, topRightY); // top wall
    if (this.walls[3])
      line(topLeftX, topLeftY, bottomLeftX, bottomLeftY); // left wall
    if (this.walls[1])
      line(topRightX, topRightY, bottomRightX, bottomRightY); // right wall
    if (this.walls[2])
      line(bottomLeftX, bottomLeftY, bottomRightX, bottomRightY); // bottom wall

    // noFill();
    // rect(x,y,w,w);
  }
}
