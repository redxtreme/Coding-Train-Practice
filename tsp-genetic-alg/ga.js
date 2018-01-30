function calculateFitness() {
  var currentRecord = Infinity;

  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    
    fitness[i] = 1 / (d + 1);
  }
}

function normalizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  var newPopulation = [];

  for (var i = 0; i < population.length; i++) {
    var order = pickOne(population, fitness);
    mutate(order);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

// Pick an item from a list based on its probability
function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }

  // Decrease by one because we autoincriment before
  // exiting the loop
  index--;
  return list[index].slice();
}

function mutate(order, mutationRate) {
  var indexA = floor(random(order.length));
  var indexB = floor(random(order.length));
  swap(order, indexA, indexB);
}
