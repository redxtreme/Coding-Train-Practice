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

Node.prototype.visit = function() {
  if (this.left !== null)
    this.left.visit();

  console.log(this.value);

  if (this.right !== null)
    this.right.visit();
}

Node.prototype.search = function(val) {
  if (this.value === val)
    return this;
  else if (val < this.value && this.left !== null)
    return this.left.search(val);
  else if (val > this.value && this.right !== null)
    return this.right.search(val);

  return null;
}

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}
