var cols;
var rows;
var w = 40;
var grid = [];
var current;

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('A*');
  frameRate(5);

  // Drawing area
  cols = floor(width / w);
  rows = floor(height / w);

  // Insert cells into array
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // Starting point
  current = grid[0];
}

// Animation loop
function mousePressed() {
  background(51);

  // Create a two dimentional Array
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    removeWalls(current, next);

    current = next;
  }
}

// Calculate the index of the one dimentional array
function index(i, j) {

  // If the index is out of founds (edge cases)
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
    return -1;

  return i + j * cols;
}

// Cell constructor
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true] // top, right, bottom, left
  this.visited = false;

  // Check the neighbors
  this.checkNeighbors = function() {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var left = grid[index(i - 1, j)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];

    // If edge exists and is not visited
    if (top && !top.visited)
      neighbors.push(top);
    if (left && !left.visited)
      neighbors.push(left);
    if (right && !right.visited)
      neighbors.push(right);
    if (bottom && !bottom.visited)
      neighbors.push(bottom);

    // Pick a random neighbor
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else
      return undefined;
  }

  // Draw the cell
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

    // Color if visited
    if (this.visited) {
      noStroke();
      fill(150, 0, 150);
      rect(x, y, w, w);
    }
  }
}

// Remove the shared walls between two cells
function removeWalls(a, b) {
  var x = a.i - b.i;

  // If b is to the left of a
  if (x === 1) {
    a.walls[3] = false; // remove left wall
    b.walls[1] = false; // remove right wall
  } else if (x === -1) {
    a.walls[1] = false; // remove right wall
    b.walls[3] = false; // remove left wall
  }

  var y = a.j - b.j;

  // If b is above a
  if (y === 1) {
    a.walls[0] = false; // remove top wall
    b.walls[2] = false; // remove bottom wall
  } else if (y === -1) {
    a.walls[2] = false; // remove bottom wall
    b.walls[0] = false; // remove top wall
  }
}
