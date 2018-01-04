var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;

// Find an element and erase it from the given array
function removeFromArray(arr, elt) {

  //TODO use indexOf instead

  for (var i = arr.length; i >= 0; i--) {
    if(arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

// Find the raw distance between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j); // dist is part of p5
  return d;
}

// Each cell object
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  // Draws the spot
  this.show = function(color) {
    fill(color);
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }

  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;

    if (i < cols - 1)
    this.neighbors.push(grid[i + 1][j]);
    if (i > 0)
    this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1)
    this.neighbors.push(grid[i][j + 1]);
    if (j > 0)
    this.neighbors.push(grid[i][j - 1]);
  }
}

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // Drawing area
  w = width / cols;
  h = height / rows;

  // Create a two dimentional Array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  // Init the spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  // Find and add the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
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

    // Find the best spot in the openSet
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    // If we reached the end
    if (current === end) {
      console.log('DONE!');
    }

    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // If the neighbor is not in the closed set
      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + 1;

        // Is this something I've evaluated before
        if (openSet.includes(neighbor)) {

          // Is this new path more efficient than the old path
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        }
        else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        // Guess how long it will take using heuristics
        neighbor.h = heuristic(neighbor, end);

        // Calculate the score for the neighbor
        neighbor.f = neighbor.g + neighbor.h;

      }
    }

    //we can keep going
  }
  else {
    // no solution
  }

  background(0);

  // Draw spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
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
