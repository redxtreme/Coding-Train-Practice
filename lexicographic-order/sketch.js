var vals = [0, 1, 2, 3, 4, 5];

// Setup function required by p5
function setup() {
  createCanvas(400, 300);
  console.log('Project Started');
}

// Animation loop
function draw() {
  background(50);
  console.log(vals);

  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largestI = -1;
  for (var i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  swap(vals, largestJ, largestI);

  // Reverse from largestI + 1 to the end
  var endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);

  textSize(64);
  var s = '';
  for (var i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255);
  text(s, 20, height / 2);
}

// Simple swap of elements in array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
