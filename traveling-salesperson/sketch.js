var cities = [];
var totalCities = 3;

// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('Project Started');

  // Create cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }
}

// Animation loop
function draw() {
  background(51);
  fill(255);

  // Draw the cities
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  beginShape();
  noFill();
  strokeWeight(2);
  stroke(255);
  // Draw the paths
  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();
}

function swap(a, i, j)) {

}
