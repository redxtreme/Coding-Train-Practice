// Cell constructor
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true] // top, right, bottom, left
  this.visited = false;

  // Highlights the cell (used to see where we are at currently)
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(100, 255, 100);
    rect(x, y, w, w);
  }

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
      fill(200, 0, 200, 100);
      rect(x, y, w, w);
    }
  }
}
