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
