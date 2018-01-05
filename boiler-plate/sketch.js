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

}

// Animation loop
function draw() {
  background(200);
}
