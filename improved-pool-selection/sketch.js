var rows;
var cols;
var w;
var h;

var fruits = [
  {name: "mango", score: 5},
  {name: "blueberry", score: 3},
  {name: "cherry", score: 1},
  {name: "apple", score: 1},
]
// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('Project Started');

  // Drawing area
  w = width / cols;
  h = height / rows;

  // Create a two dimentional Array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

}

// Animation loop
function draw() {
  background(200);
}
