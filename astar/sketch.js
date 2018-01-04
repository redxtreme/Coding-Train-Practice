var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;

// Each cell object
function Spot(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Draws the spot
  this.show = function(color) {
    fill(color);
    noStroke();
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Drawing area
  w = width / cols;
  h = height / rows;

  // create a two dimentional Array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // store weights
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Pick the start and end positions
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  // Initiate the starting point
  openSet.push(start);


  console.log(grid);
}

// Animation loop
function draw() {

  if (openSet.length > 0) {
    //we can keep going
  } else {
    // no solution
  }

  background(0);

  // Draw spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
}
