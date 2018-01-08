var cities = [];
var totalCities = 5;
var order = [];
var recordDistance;
var bestEver;
// Setup function required by p5
function setup() {
  createCanvas(400, 600);
  console.log('Project Started');

  // Create cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height)/2);
    cities[i] = v;
    order[i] = i;
  }

  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();

  textSize(64);
  var s = '';
  for (var i = 0; i < order.length; i++) {
    s += order[i];
  }
  fill(255);
  text(s, 20, height - 50);
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

  textSize(64);
  var s = '';
  for (var i = 0; i < order.length; i++) {
    s += order[i];
  }
  fill(255);
  text(s, 20, height - 50);
  nextOrder();
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

// Lexicographic order
function nextOrder() {
  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  swap(order, largestJ, largestI);

  // Reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}
