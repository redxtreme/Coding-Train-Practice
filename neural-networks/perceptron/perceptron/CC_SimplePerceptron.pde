Perceptron p;

void settings() {
  size(200, 200);
}

void setup() {
  p = new Perceptron();
  
  float[] inputs = {-1, 0.5};
  
  int guess = p.guess(inputs);
  println(guess);
}

void draw() {
  //background(153);
  //line(0, 0, width, height);
}
