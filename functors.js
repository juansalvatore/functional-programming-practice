const _ = require("ramda");
const result = ["a"].map(x => x.toUpperCase()).map(x => String.fromCharCode(x));
result;

// Functor
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: `Box(${x})`
});

const nextCharForNumberString = str =>
  Box(str)
    .map(x => x.trim())
    .map(trimmed => parseInt(trimmed, 10))
    .map(number => new Number(number + 1))
    .fold(String.fromCharCode);

const res = nextCharForNumberString("64");
console.log(res);

const first = xs => xs[0];

// const halfTheFirstLargeNumber = xs => {
//   const found = xs.filter(x => x >= 20);
//   const answer = first(found) / 2;
//   return `The answer is ${answer}`;
// };

const halfTheFirstLargeNumber = xs =>
  Box(xs)
    .map(_.filter(x => x >= 20))
    .map(found => first(found) / 2)
    .fold(answer => `The answer is ${answer}`);

console.log(halfTheFirstLargeNumber([1, 4, 50]));

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  toString: () => `Box(${x})`
});

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
/*
const moneyToFloat = str =>
  parseFloat(str.replace(/\$/, ''))
*/
const moneyToFloat = str =>
  Box(str)
    .map(x => x.replace(/\$/, ""))
    .fold(parseFloat);

QUnit.test("Ex1: moneyToFloat", assert => {
  assert.equal(String(moneyToFloat("$5.00")), 5);
});

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
/*
const percentToFloat = str => {
  const float = parseFloat(str.replace(/\%/, ''))
  return float * 0.0100
}
*/
const percentToFloat = str =>
  Box(str)
    .map(x => x.replace(/\%/, ""))
    .map(parseFloat)
    .fold(x => x * 0.01);

QUnit.test("Ex2: percentToFloat", assert => {
  assert.equal(String(percentToFloat("20%")), 0.2);
});

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
/*
const applyDiscount = (price, discount) => {
  const cents = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cents - (cents * savings)
}
*/
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price)).fold(cents =>
    Box(percentToFloat(discount)).fold(savings => cents - cents * savings)
  );

QUnit.test("Ex3: Apply discount", assert => {
  assert.equal(String(applyDiscount("$5.00", "20%")), 4);
});
