var cities = [];
var totalCities = 10;
var recordDistance;
var bestEver;
// Setup function required by p5
function setup() {
  createCanvas(400, 400);
  console.log('Project Started');

  // Create cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }

  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

// Animation loop
function draw() {
  background(51);
  fill(255);

  // Draw the cities
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  // Draw the paths
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(255);
  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  // Draw the best path
  beginShape();
  noFill();
  strokeWeight(4);
  stroke(255, 0, 255);
  for (var i = 0; i < bestEver.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  // Swap two elements in the cities array
  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);

  // If we have a better total distance
  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
  }
}

// Simple swap of elements in array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// Find the total distance
function calcDistance(points) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].x);
    sum += d;
  }
  return sum;
}
