var cols;
var rows;
var w = 10;
var grid = [];
var current;
var stack = [];

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('Maze');
  //frameRate(5);

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
function draw() {
  background(51);

  // Create a two dimentional Array
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  var old = current;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // If the previous node as has neighbors
    if (old.checkNeighbors())
      stack.push(old);

    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

// Calculate the index of the one dimentional array
function index(i, j) {

  // If the index is out of founds (edge cases)
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
    return -1;

  return i + j * cols;
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
