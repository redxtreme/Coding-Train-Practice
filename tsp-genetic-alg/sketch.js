var cities = [];
var totalCities = 12;
var popSize = 500;
var population = [];
var fitness = [];
var recordDistance = Infinity;
var bestEver;
var currentBest;

// Setup function required by p5
function setup() {
  createCanvas(600, 600);
  console.log('Project Started');

  var order = [];

  // Create cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height) / 2);
    cities[i] = v;
    order[i] = i;
  }

  for (var i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }
}

// Animation loop
function draw() {
  background(51);
  fill(255);
  noStroke();

  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  // Draw the cities
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  // Draw the best path
  beginShape();
  noFill();
  strokeWeight(4);
  stroke(255, 0, 255);
  for (var i = 0; i < bestEver.length; i++) {
    var cityN = bestEver[i];
    vertex(cities[cityN].x, cities[cityN].y);
  }
  endShape();

  // Draw the paths
  //translate(0, height / 2);
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(255);
  for (var i = 0; i < bestEver.length; i++) {
    var cityN = bestEver[i];
    vertex(cities[cityN].x, cities[cityN].y);
  }
  endShape();

  // Draw the best path
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(150, 150, 255);
  //translate(0, height / 2);
  for (var i = 0; i < currentBest.length; i++) {
    var cityN = currentBest[i];
    vertex(cities[cityN].x, cities[cityN].y);
    ellipse(cities[cityN].x, cities[cityN].y, 16, 16);
  }
  endShape();
}

// Simple swap of elements in array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// Find the total distance
function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];

    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
