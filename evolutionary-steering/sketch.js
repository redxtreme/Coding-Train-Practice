var vehicle
var food = [];
var poison = [];

function setup() {
  createCanvas(640, 360);
  vehicle = new Vehicle(width / 2, height / 2);

  // Populate poison
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  // Populate poison
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }
}

function draw() {
  background(51);

  // var target = createVector(mouseX, mouseY);

  // fill(127);
  // stroke(200);
  // strokeWeight(2);
  // ellipse(target.x, target.y, 48, 48);

  // Draw food
  for (var i = 0; i < food.length; i++) {
    fill(255, 0, 255);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  // Draw poison
  for (var i = 0; i < poison.length; i++) {
    fill(0, 150, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  //vehicle.seek(target);
  vehicle.eat(food);
  vehicle.eat(poison);
  vehicle.update();
  vehicle.display();
}
