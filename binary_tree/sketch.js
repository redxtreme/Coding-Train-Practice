var tree;

// Setup function required by p5
function setup() {
  noCanvas();
  tree = new Tree();

  // Insert random numbers
  for (var i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 100)));
  }
  console.log(tree);
  tree.traverse();
}
