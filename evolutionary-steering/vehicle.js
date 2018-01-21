// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Vehicle(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);
  this.r = 4.0;
  this.maxspeed = 5; // Maximum speed
  this.maxforce = 0.5; // Maximum steering force

  this.health = 1;

  this.dna = [];

  // Food weight
  this.dna[0] = random(-2, 2);
  // Poison weight
  this.dna[1] = random(-2, 2);
  // Food perception
  this.dna[2] = random(0, 100);
  // Poison perception
  this.dna[3] = random(0, 100);

  this.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  };

  this.dead = function() {
    return (this.health < 0);
  }

  this.display = function() {
    //background(255,0,0);
    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Draw weight vectors
    strokeWeight(3);
    noFill();
    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0] * 20);
    ellipse(0, 0, this.dna[2] * 2);
    strokeWeight(2);
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 20);
    ellipse(0, 0, this.dna[3] * 2);

    fill(200, 100);
    stroke(0);
    strokeWeight(1);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);

    // Rocket body
    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var col = lerpColor(rd, gr, this.health); // Color in between red and green
    fill(col);
    stroke(col);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();

    pop();
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  };

  // Apply weighted steering forces
  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, 0.2, this.dna[2]);
    var steerB = this.eat(bad, -0.5, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.eat = function(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;

    for (var i = list.length - 1; i > 0; i--) {
      var d = this.position.dist(list[i]);

      // Eat the item if it's close
      if (d < this.maxspeed) {

        // Eat 1 of the closest
        list.splice(i, 1);
        this.health += nutrition;
      } else {

        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    // Seek the closest
    if (closest)
      return this.seek(closest);

    // Seek nothing
    return createVector(0, 0);
  }

  // We accumulate a new acceleration each time based on three rules
  this.flock = function(boids) {
    var sep = this.separate(boids); // Separation
    var ali = this.align(boids); // Alignment
    var coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  };

  // Method to update location
  this.update = function() {

    this.health -= 0.01;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  };

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);

    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  };

  this.render = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + radians(90);
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  };

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  };

  // Separation
  // Method checks for nearby boids and steers away
  this.separate = function(boids) {
    var desiredseparation = 25.0;
    var steer = createVector(0, 0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  };

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  this.align = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  };

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  this.cohesion = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  };

  this.boundaries = function() {

    var d = 25; // Distance from the edge it wants to stay away
    var desired = null;

    if (this.position.x < d)
      desired = createVector(this.maxspeed, this.maxspeed);
    else if (this.position.x > width - d)
      desired = createVector(-this.maxspeed, this.maxspeed);

    if (this.position.y < d)
      desired = createVector(this.velocity.x, this.maxspeed);
    else if (this.position.y > height - d)
      desired = createVector(this.velocity.x, -this.maxspeed);

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  };
}
