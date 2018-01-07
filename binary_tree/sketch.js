var tree;

// Setup function required by p5
function setup() {
  noCanvas();
  tree = new Tree();
  tree.addValue(5);
  tree.addValue(3);
  tree.addValue(7);
  tree.addValue(6);
  console.log(tree);
}

function Tree() {
  this.root = null;
}

Tree.prototype.addValue = function(val) {
  var n = new Node(val);

  if (this.root === null)
    this.root = n;
  else
    this.root.addNode(n);
}

Node.prototype.addNode = function(n) {

  // If the value is less than the current node's value
  if (n.value < this.value) {

    // If there's no left child
    if (this.left === null)
      this.left = n;
    else
      // Recursively call this function
      this.left.addNode(n);
  }
  // If the value is greater than the current node's value
  else if (n.value > this.value) {

    // If there's no right child
    if (this.right === null)
      this.right = n;
    else
      // Recursively call this function
      this.right.addNode(n);
  }
}

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}
