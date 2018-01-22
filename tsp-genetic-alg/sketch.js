var cities = [];
var totalCities = 5;
var population = [];
var fitness = [];
var recordDistance = Infinity;
var bestEver;

// Setup function required by p5
function setup() {
  createCanvas(400, 600);
  console.log('Project Started');

  var order = [];

  // Create cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height) / 2);
    cities[i] = v;
    order[i] = i;
  }

  for (var i = 0; i < 10; i++) {
    population[i] = shuffle(order);
  }

  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    fitness[i] = d;
  }

  // var d = calcDistance(cities);
  // recordDistance = d;
  // bestEver = order.slice();
  //
  // totalPermutations = factorial(totalCities);
  // console.log(totalPermutations);
  // count++;
}

// Animation loop
function draw() {
  background(51);
  fill(255);
  //frameRate(5);

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

  count++;
}
