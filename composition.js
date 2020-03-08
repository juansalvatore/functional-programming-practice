import { slice, pipe, curry } from "ramda";

const take = slice(0);

console.log(take(20)([2, 3, 4]));

const add = curry((x, y) => x + y);
const concat = curry((y, x) => x + y);
const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const first = xs => xs[0];

//const compose = (f, g) => x => f(g(x))
//const pipe = (f, g) => x => g(f(x))
const shout = pipe(first, toUpper, exclaim);
shout("hello");
