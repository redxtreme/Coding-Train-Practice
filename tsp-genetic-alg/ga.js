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
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.01); // Try different mutation rates
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

function crossOver(orderA, orderB) {
  var start = floor(random(orderA.length));
  var end = floor(random(start + 1, orderA.length));
  var newOrder = orderA.slice(start, end);

  //How many do we need to add
  //var left = totalCities - newOrder.length;
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!newOrder.includes(city))
      newOrder.push(city);
  }
  return newOrder;
}

function mutate(order, mutationRate) {
  for (var i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
