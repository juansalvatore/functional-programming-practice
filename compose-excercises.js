// Setup
//==============
const _ = R;
const { formatMoney } = accounting;

// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
];

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.
/*
const isLastInStock = cars => {
  var reversed_cars = _.last(cars)
  return _.prop('in_stock', reversed_cars)
}
*/
const isLastInStock = _.pipe(_.last, _.prop("in_stock"));

QUnit.test("Ex1: isLastInStock", assert => {
  assert.deepEqual(isLastInStock(CARS), false);
});

("");

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = _.pipe(_.head, _.prop("name"));

QUnit.test("Ex2: nameOfFirstCar", assert => {
  assert.equal(nameOfFirstCar(CARS), "Ferrari FF");
});

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function(xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be
/*
const averageDollarValue_ = function(cars) {
  const dollar_values = _.map(_.prop('dollar_value'), cars);
  return _average(dollar_values);
};

var averageDollarValue = function(cars) {
  var dollar_values = _.map(function(c) { return c.dollar_value; }, cars);
  return _average(dollar_values);
};
*/
const averageDollarValue = _.pipe(_.map(_.prop("dollar_value")), _average);

QUnit.test("Ex3: averageDollarValue", assert => {
  assert.equal(averageDollarValue(CARS), 790700);
});

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = _.replace(/\W+/g, "_"); //<-- leave this alone and use to sanitize

const sanitizeNames = _.map(_.pipe(_.prop("name"), _.toLower, _underscore));

QUnit.test("Ex4: sanitizeNames", assert => {
  assert.deepEqual(sanitizeNames(CARS), [
    "ferrari_ff",
    "spyker_c12_zagato",
    "jaguar_xkr_s",
    "audi_r8",
    "aston_martin_one_77",
    "pagani_huayra"
  ]);
});

// Bonus 1:
// ============
// Refactor availablePrices with compose.
/*
const availablePrices = function(cars) {
  const available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(x => formatMoney(x.dollar_value)).join(', ');
}
*/
const formatDolarValue = _.pipe(_.prop("dollar_value"), formatMoney);
const availablePricesArray = _.pipe(
  _.filter(_.prop("in_stock")),
  _.map(formatDolarValue)
);
const availablePrices = _.pipe(availablePricesArray, _.join(", "));

QUnit.test("Bonus 1: availablePrices", assert => {
  assert.deepEqual(availablePrices(CARS), "$700,000.00, $1,850,000.00");
});

// Bonus 2:
// ============
// Refactor to pointfree.
/*
const fastestCar = function(cars) {
  const sorted = _.sortBy(car => car.horsepower, cars);
  const fastest = _.last(sorted);
  return fastest.name + ' is the fastest';
}
*/
const append = _.flip(_.concat);
const fastestCar = _.pipe(
  _.sortBy(_.prop("horsepower")),
  _.last,
  _.prop("name"),
  append(" is the fastest")
);
QUnit.test("Bonus 2: fastestCar", assert => {
  assert.equal(fastestCar(CARS), "Aston Martin One-77 is the fastest");
});
