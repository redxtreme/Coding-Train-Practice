var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

// Find an element and erase it from the given array
function removeFromArray(arr, elt) {

  //TODO use indexOf instead

  for (var i = arr.length; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

// Find the raw distance between two points
function heuristic(a, b) {

  // Euclitian distance
  var d = dist(a.i, a.j, b.i, b.j);

  // Manhattin distance
  //var d = abs(a.i - b.i) + abs(a.j - b.j); // dist is part of p5
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
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3)
    this.wall = true;

  // Draws the spot
  this.show = function(color) {
    //fill(color);

    // Change color if spot is a wall
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    }
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

    // Diagonal neighbors
    if (i > 0 && j > 0)
      this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0)
      this.neighbors.push(grid[i + 1][j - 1]);
    if (i > 0 && j < rows - 1)
      this.neighbors.push(grid[i - 1][j + 1]);
    if (i < cols - 1 && j < rows - 1)
      this.neighbors.push(grid[i + 1][j + 1]);
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
  start.wall = false;
  end.wall = false;

  // Initiate the starting point
  openSet.push(start);
}

// Animation loop
function draw() {

  if (openSet.length > 0) {

    // Find the best spot in the openSet
    // TODO tree datastructure would be better
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    // If we reached the end
    if (current === end) {

      // Stop the looping
      noLoop();
      console.log('DONE!');
    }

    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // If the neighbor is not in the closed set and not a wall
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        var newPath = false;

        // Is this something I've evaluated before
        if (openSet.includes(neighbor)) {

          // Is this new path more efficient than the old path
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else { // Wasn't in the openSet
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Only update if a newPath has been found
        if (newPath) {

          // Guess how long it will take using heuristics
          neighbor.h = heuristic(neighbor, end);

          // Calculate the score for the neighbor
          neighbor.f = neighbor.g + neighbor.h;

          // Set the parent node
          neighbor.previous = current
        }
      }
    }
  } else {
    console.log('No solution');
    noLoop();
    return;
  }

  background(200);

  // Draw spots
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // // Draw the closed set
  // for (var i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show(color(255, 0, 0));
  // }
  //
  // // Draw the open set
  // for (var i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0));
  // }

  // Find the path via tracing backwards from the current spot
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  // // Draw the current optimal path
  // for (var i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }

  // Draw path as line
  noFill();
  stroke(200, 0, 255);
  strokeWeight(w / 2);
  beginShape();
  // Draw the current optimal path
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}
