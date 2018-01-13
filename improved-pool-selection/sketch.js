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

  // Normalize the scores
  var sum = 0;
  for (var i = 0; i < fruits.length; i++) {
    sum += fruits[i].score;
  }
  for (var i = 0; i < fruits.length; i++) {
    fruits[i].prob = fruits[i].score / sum;
    fruits[i].count = 0;
  }

  // Varify that the fruits are getting picked
  // proportionally to their probabiliy
  for (var i = 0; i < 100; i++) {
    var fruit = pickOne(fruits);
    fruit.count++;
  }

  console.log(fruits);
}

// Animation loop
function draw() {
  background(200);
}

// Pick an item from a list based on its probability
function pickOne(list) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - list[index].prob;
    index++;
  }

  // Decrease by one because we autoincriment before
  // exiting the loop
  index --;
  return list[index];
}
