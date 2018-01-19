var vehicle
var food = [];

function setup() {
  createCanvas(640, 360);
  vehicle = new Vehicle(width / 2, height / 2);
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  var target = createVector(mouseX, mouseY);

  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(target.x, target.y, 48, 48);

  for (var i = 0; i < food.length; i++) {
    fill(255, 0, 255);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  //vehicle.seek(target);
  vehicle.eat(food);
  vehicle.update();
  vehicle.display();
}
