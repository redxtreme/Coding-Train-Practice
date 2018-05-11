
class Point {
  float x;
  float y;
  int label;
  
  Point() {
    x = random(width);
    y = random(height);
    
    if (x > y)
      label = 1;
    else
      label = -1;
  }
}
