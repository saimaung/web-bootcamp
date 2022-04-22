/********************************************************************
 *************************** SCOPES *********************************
 *******************************************************************/

/**
 * 1. Function Scope
 * all three variables are scoped to the lol function
 */
function lol() {
  let person = 'Tom';
  const age = 45;
  var color = 'Teal';
}
lol();


/** All undefined outside of lol - function scope
 * console.log(person); 
 * console.log(age);
 * console.log(color);
*/

// All let, const, var behave the same
let bird = 'Mandarin Bird';

function bird_watch() {
  let bird = 'Pheasant';
  // console.log(bird);
}

// console.log(bird); // 'Mandarin Bird'


/**
 * 2. Block Scope
 */
let radius = 8;

// Note that BLOCK {}. Also note that { a: 1 } (object) isn't the same as BLOCK
// let and const have different scoping rule than var
// var is only scope to function, there's no block scope for var, 
// meaning that if a var is declared inside a block, we have access to it outside of that block 
if (radius >= 8) {
  const PI = 3.14;
  let circ = 2 * PI * radius;
  var minsPerSeconds = 60; // var is 
}

// console.log(radius); // 8
// console.log(PI); // Not defined
// console.log(circ); // Not defined
// console.log(minsPerSeconds);

/**
 * Problematic Scenario if used var incorrectly
 */
let animals = ['Dog', 'Bird', 'Panda'];

for (var i=0; i<animals.length; i++) {
  // console.log(i, animals[i]);
}

console.log(i); // Still exists and it got incremented to 3 from the for loop Not Block scope


function doubleArray(arr) {
  const doubleArr = [];
  for(element of arr) {
    let res = element * 2; // let scope to block, thus not accessible outside of for block. Changing to var will get access outside of this block
    doubleArr.push(res);
  }
  // console.log(res); // res is not defined runtime error if block scope (let). Can change to var
  return doubleArr;
}

/**
 * Lexical Scope
 * refers to the fact that nested functions are lexically bound to their parent function. Note that it's a one way relationship.
 * It doesn't work the other way around
 */
function outer() {
  let movie = 'Scarface';

  function inner() {
    // it first looks for movie in current scope, if it isn't there, it keeps moving up (nearest scope) to the parent scope
    // let movie = 'The Wire';
    // console.log(movie.toUpperCase()); // 'The Wire'
    
    // console.log(movie.toUpperCase()); // Lexical Scope To Parent Function
    let x = 10; // Not the other way around
  }
  // console.log(x); // No access - not the other way around
  inner();
}

outer(); // SCARFACE

/**
 * Function Expressions
 * Can store (annonymous) function to a variable since functions are objects
 */
const square = function (num) {
  return num * num;
}

// We can define function with a name and assign it to a const
const product = function multiply(x, y) {
  return x * y;
}
// console.log(product(3, 4)); // 12
// console.log(multiply(3, 4)); // UNDEFINED - app.js:107 Uncaught ReferenceError: multiply is not defined

function sqrt(num) {
  return num * num;
}

// console.log(sqrt(7)); // 49
// console.log(square(7)); // 49
// console.dir(square); // display in object format -> proof that functions are object
// console.dir(sqrt);

/**
 * Method
 */
const multiply = function(x, y) {
  return x * y;
}

const math = {
  product: multiply
}

// console.log(math.product(2, 3)); // this is method. Similar to "sai".toUpperCase()


/*******************************************************************************************
 * Higher Order Functions
 *   Functions that:
 *     - accept other functions as arguments
 *     - return a function
 ********************************************************************************************/

// Example: accept a function as argument
function callTwice(func) {
  func();
  func();
}

function laugh() {
  // console.log('LOL');
}

// console.log(callTwice(laugh)); // pass a function as an argument

function loopNTimes(func, n) {
  for(let i=0; i<n; i++) {
    func();
  }
}

function cheer() {
  // console.log('FriYay');
}

loopNTimes(cheer, 10);

function pickOne(func_one, func_two) {
  const random = Math.random();
  if (random<0.5) {
    func_one();
  } else {
    func_two();
  }
}

pickOne(laugh, cheer);

// Example: Returning Function (Factory Function) - Making more function

function multiplyBy(n) {
  return function(num) {
    return n * num;
  }
}

const multiplyEightBy = multiplyBy(8);
const halve = multiplyBy(0.5);

// console.log(multiplyEightBy(3));
// console.log(halve(8));

function makeBetweenFunc(n, m) {
  return function(num) {
    return (num >= n) && (num <= m);
  }
}

const isBetweenOneAndTen = makeBetweenFunc(1, 10);
// console.log(isBetweenOneAndTen(1)); 
// console.log(isBetweenOneAndTen(10));
// console.log(isBetweenOneAndTen(5));
// console.log(isBetweenOneAndTen(11));


/*******************************************************************************************
 * 
 * CALLBACK FUNCTIONS
 *   A call back function is a function passed into another function
 *   as an argument, which is then invoked inside the outer function.
 * 
 ********************************************************************************************/

 function callTwice(func) {
  func();
  func();
}

function laugh() {
  // console.log('LOL');
}

// In this example, laugh is a call back function
callTwice(laugh);

// Passing in Annoymous Function to
// setTimeout() - to be executed after Timer(ms) expired
setTimeout(function(){
  console.log('Annoymous Function Got Executed In setTimeOut() after 5s')
}, 5000);

const btn = document.querySelector('button');
btn.addEventListener('click', function() {
  console.log('BOOM: Dude I Told You To Not Click The Button');
});

/*******************************************************************************************
 * 
 * Hoisting
 *   - ✅ var
 *   - ❌ let  
 *   - ❌ const
 *   - ✅ function declaration
 *   - ❌ annoymous functions
 ********************************************************************************************/
var animal = 'Tapir';
// console.log(animal);

// what if the order is switched. Get undefined for animalOrderSwitched. However,
// didn't get ReferenceError like console.log(animalNoVariable);. Why?
//  - Hoisting: JS hoist up varible (animalOrderSwitched) declaration.
// It doesn't really move up or reorganize your code.
// It run:
//    var animalOrderSwitched;
//    console.log(animalOrderSwitched);
//    nimalOrderSwitched = 'Red Tapir';
// console.log(animalOrderSwitched); // undefined
var animalOrderSwitched = 'Red Tapir';
// console.log(animalOrderSwitched); // 'Red Tapir'

// functions.js:251 Uncaught ReferenceError: animalNoVariable is not defined
// console.log(animalNoVariable);

let shrimp = 'Harlequin Shrimp';
// console.log(shrimp); // 'Harlequin Shrimp'

// Uncaught ReferenceError: Cannot access 'incorrectOrderShrimp' before initialization
// console.log(letShrimp);
// let letShrimp = 'Harlequin Shrimp';

// Uncaught ReferenceError: Cannot access 'constShrimp' before initialization
// console.log(constShrimp);
// const constShrimp = 'Harlequin Shrimp';

howl(); // 'AWOOOOOOOO'
function howl() {
  // console.log('AWOOOOOOOO');
}

// hoot(); // Uncaught TypeError: hoot is not a function
console.log(hoot) // Undefined. VAR got HOISTED UP
var hoot = function() {
  console.log('HOOOO HOOOO');
}

// letHoot(); // Uncaught ReferenceError: Cannot access 'letHoot' before initialization
// console.log(letHoot) // Uncaught ReferenceError: Cannot access 'letHoot' before initialization
let letHoot = function() {
  // console.log('HOOOO HOOOO');
}


/*******************************************************************************************
 * 
 * Apply Functions to Collections of Data
 *
 ********************************************************************************************/

/**
 * Array Callback Methods Intro
 *   arrow function syntax
 *      - forEach
 *      - map
 *      - filter
 *      - find
 *      - reduce
 *      - some
 *      - every
 */

/**
 * forEach accepts a callback function.
 * calls the function once per element in the array.
 */
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const sqre = function(n) {
  const sqre = n * n;
  // console.log(sqre);
  return sqre;
}
nums.forEach(sqre);

// Useful if you need the INDEX of the collection
const sqreWithIndex = function(n, idx) {
  const sqre = n * n;
  // console.log(idx, sqre);
  return sqre;
}

// forEach is not only passing in element but also passing in index
nums.forEach(sqreWithIndex);

/**
 * MAP
 *  - creates a new array with the results of calling a callback on every element in the array
 */
const texts = ['rofl', 'lol', 'omg', 'ttyl'];
const capitalize = function(text) {
  return text.toUpperCase();
}
const caps = texts.map(capitalize);
// console.log(caps);

const numbers = [20, 21, 22, 23, 24, 25, 26, 27];
const double = function(number) {
  return number * 2;
}
const doubleNumbers = numbers.map(double);
// console.log(doubleNumbers);

const isNumEven = function(number) {
  return {
    value: number,
    isEven: (number % 2) === 0
  }
}
const isElementEven = numbers.map(isNumEven);
// console.log(isElementEven);

const words = ['asap', 'byob', 'rsvp', 'diy'];
const capDelimiterized = function(element) {
  return element.toUpperCase().split('').join('.');
}
const capAndDelim = words.map(capDelimiterized);
// console.log(capAndDelim);

/**
 * Arrow Functions
 *  - Syntactically compact alternative to a regular function expression
 *  - Behaves differently in keyword 'this'
 */
const squareArrow = (x) => { return x * x; }
// parens are optional if there's only one parameter
const isEven = num => { return num % 2 === 0; }
const multiplyArror = (x, y) => { return x * y; }
const greet = () => { console.log('Greetings!'); }

// Arrow Functions Implicit Return. Uses () instead of {}. No ; inside ()
const isEvenImplicitReturn = num => ( num % 2 === 0 );

// multiple expressions confuse JS in implicit return. Doesn't work
// const isEvenImplicitReturnInvalid = num => ( 
//   console.log('isEven');
//   num % 2 === 0 
// );

// Can leave out () in a same line expression,
// Ex: not same line - long array ['abababbabbababbaa', 'cdasdfadafdfadsfadf', 'qasdfadfadffasdf']
// const multiplyImplicitReturn = (x, y) => (
//    x * y // not same line but only one expression
// );
// it looks cleaner to have longer definition on have it on a new line

const multiplyImplicitReturn = (x, y) => x * y; // same line one expression
const toDoubleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const doubleArrow = num => num * 2;
const doubled = toDoubleNums.map(doubleArrow);

/**
 * Array.find
 *   - returns the value of the **first element** in the array that satisfies the provided
 *     testing functions
 *   - annoymous function needs to return a boolean
 */
const movies = [
  'The Fantastic Mr. Fox',
  'Mr. and Mrs. Smith',
  'Mrs. Doubtfire',
  'Mr. Deeds'
]

const smith = movie => (movie.includes('Smith'));
const smithMovie = movies.find(smith);

const mrs = movie => (movie.indexOf('Mrs') === 0);
const doubtFire = movies.find(mrs);

/**
 * Array.filter
 *    - creats a new array with all elements that pass the test implemented by
 *      the provided function
 *    - call back functions needs to return boolean, true get filtered
 */
const numsFilter = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const odd = num => num % 2 === 1;
const oddVals = numsFilter.filter(odd);

const books = [
  {
    title: 'Good Omens',
    authors: ['Terry Pratchett', 'Neil Gaiman'],
    rating: 4.25,
    genres: ['fiction', 'fantasy']
  },
  {
    title: 'Changing My Mind',
    authors: ['Zadie Smith'],
    rating: 3.83,
    genres: ['nonfiction', 'essays']
  },
  {
    title: 'Bone: The Complete Edition',
    authors: ['Jeff Smith'],
    rating: 4.42,
    genres: ['fiction', 'graphic novel', 'fantasy']
  },
  {
    title: 'American Gods',
    authors: ['Neil Gaiman'],
    rating: 4.11,
    genres: ['fiction', 'fantasy']

  },
  {
    title: 'Clean Code',
    author: ['Robert Cecil'],
    rating: 4.4,
    genres: ['computer science']
  }
]

const csBook = book => book.genres.includes('computer science');
const cs = books.filter(csBook); 


/** EVERY
 * Array.every
 *    - tests whether all elements in the array pass the test function
 *    - it returns a Boolean value (Boolean call back function)
 */
const everyWords = ['dog', 'dig', 'log', 'bag', 'wag'];
const longWord = everyWords.every(word => word.length > 3); // false
const dPrefixWord = everyWords.every(word => word[0] === 'd'); // false
const postfixG = everyWords.every(word => word[word.length -1] === 'g'); // true

/** SOME
 * Array.some
 *    - tests whether ANY elements in the array pass the test function
 *    - it returns a Boolean value (Boolean call back function)
 */
const mixWords = ['dog', 'jello', 'log', 'cupcake', 'bag', 'wag'];
const atLeastLenOfFour = mixWords.some(word => word.length > 4); // true

/** SORT
 *  - Mutable
 * Array.sort()
 *  - default sort: convert all to String and sort them as string
 * 
 * Array.sort(comapreFunc(a, b))
 *    - If compareFunc(a, b) returns less than 0, sort a before b
 *    - If compareFunc(a, b) returns 0, leave a and b unchanged with respect to each other
 *    - If compareFunc(a, b) returns greater than 0, sort b before a
 * 
*/
const prices = [400.50, 3000, 99.90, 35.99, 12.00, 9500];
prices.sort(); // prices = [12, 3000, 35.99, 400.5, 9500, 99.9]
console.log(prices);

const asscCompare = (a, b) => {
  return a - b; 
}
prices.sort(asscCompare); // prices mutated
console.log(prices); // [12, 35.99, 99.9, 400.5, 3000, 9500]


const descCompare = (a, b) => b - a;
/*
400.50, 3000: 3000 - 400.50 = +, sort b before a, 3000, 400.50
*/
prices.sort(descCompare); // prices mutated
console.log(prices); // [9500, 3000, 400.5, 99.9, 35.99, 12]

/**
 * REDUCE
 *  - Executes a reducer function (callback in reducer formate) on each element of the array,
 *    resulting in a single value
 *  - callback function arguments: (accumulator, currentValue) - accumulator = total
 */
const sumReduce = (accumulator, currentVal) => accumulator + currentVal;
const daysInWeek = [1, 2, 3, 4, 5, 6, 7]; // accumulator = 1, currentVal = 2, return value = 3. accumulator = 3, currentVal = 3, return value = 6
const sumDaysInWeek = daysInWeek.reduce(sumReduce);

// find a max val
const grades = [87, 64, 96, 92, 88, 99, 73, 70, 64];
const maxGrade = (currentMax, currentVal) => (Math.max(currentMax, currentVal));
console.log(grades.reduce(maxGrade));


const sumGrades = (currentTotal, currentVal) => {
  console.log(`currentTotal: ${currentTotal}`);
  console.log(`currentVal: ${currentVal}`);
  return currentTotal + currentVal;
}

// initial value: 100
console.log(grades.reduce(sumGrades, 100));

// Example: Tallying
const votes = ['y', 'n', 'y', 'y', 'n', 'y', 'y', 'n', 'y', 'n', 'y', 'n', 'n', 'y', 'n'];
/*
{
  y: yVal,
  n: nVal
}
*/
const votesCount = (tally, currentVote) => {
  // (undefined || 0) = 0
  // (number || 0) = number
  tally[currentVote] = (tally[currentVote] || 0) + 1;
  return tally;
}

// console.log(votes.reduce(votesCount, {}));

const groupBookByRating = (grouped, book) => {
  const rating = Math.floor(book.rating);
  if (!grouped[rating]) grouped[rating] = [];
  grouped[rating].push(book);
  return grouped;
}

const groupBooks = books.reduce(groupBookByRating, {});