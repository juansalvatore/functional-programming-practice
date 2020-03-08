// Isomorphic
const toPair = f => ([x, y]) => f(x, y);
const fromPair = f => (x, y) => f([x, y]);
const flip = f => (x, y) => f(y, z);

const add = (a, b) => a + b;
console.log(toPair(add)([1, 2]));

const curry = f => x => y => f(x, y);
const uncurry = f => (x, y) => f(x)(y);

const curriedAdd = curry(add);
const increment = curriedAdd(1);
console.log(increment(4));

const modulo = curry((x, y) => y % x);
const isOdd = modulo(2);
console.log(!!isOdd(1));

const filter = curry((f, xs) => xs.filter(f));
const getOdds = filter(isOdd);
console.log(getOdds([1, 2, 3, 4, 5, 6]));
