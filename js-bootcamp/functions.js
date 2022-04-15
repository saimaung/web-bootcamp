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
  console.log(bird);
}

console.log(bird); // 'Mandarin Bird'


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

console.log(radius); // 8
// console.log(PI); // Not defined
// console.log(circ); // Not defined
console.log(minsPerSeconds);

/**
 * Problematic Scenario if used var incorrectly
 */
let animals = ['Dog', 'Bird', 'Panda'];

for (var i=0; i<animals.length; i++) {
  console.log(i, animals[i]);
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
    
    console.log(movie.toUpperCase()); // Lexical Scope To Parent Function
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
console.log(product(3, 4)); // 12
// console.log(multiply(3, 4)); // UNDEFINED - app.js:107 Uncaught ReferenceError: multiply is not defined

function sqrt(num) {
  return num * num;
}

console.log(sqrt(7)); // 49
console.log(square(7)); // 49
console.dir(square); // display in object format -> proof that functions are object
console.dir(sqrt);

/**
 * Method
 */
const multiply = function(x, y) {
  return x * y;
}

const math = {
  product: multiply
}

console.log(math.product(2, 3)); // this is method. Similar to "sai".toUpperCase()


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
  console.log('LOL');
}

console.log(callTwice(laugh)); // pass a function as an argument

function loopNTimes(func, n) {
  for(let i=0; i<n; i++) {
    func();
  }
}

function cheer() {
  console.log('FriYay');
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

console.log(multiplyEightBy(3));
console.log(halve(8));

function makeBetweenFunc(n, m) {
  return function(num) {
    return (num >= n) && (num <= m);
  }
}

const isBetweenOneAndTen = makeBetweenFunc(1, 10);
console.log(isBetweenOneAndTen(1)); 
console.log(isBetweenOneAndTen(10));
console.log(isBetweenOneAndTen(5));
console.log(isBetweenOneAndTen(11));


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
  console.log('LOL');
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
console.log(animal);

// what if the order is switched. Get undefined for animalOrderSwitched. However,
// didn't get ReferenceError like console.log(animalNoVariable);. Why?
//  - Hoisting: JS hoist up varible (animalOrderSwitched) declaration.
// It doesn't really move up or reorganize your code.
// It run:
//    var animalOrderSwitched;
//    console.log(animalOrderSwitched);
//    nimalOrderSwitched = 'Red Tapir';
console.log(animalOrderSwitched); // undefined
var animalOrderSwitched = 'Red Tapir';
console.log(animalOrderSwitched); // 'Red Tapir'

// functions.js:251 Uncaught ReferenceError: animalNoVariable is not defined
// console.log(animalNoVariable);

let shrimp = 'Harlequin Shrimp';
console.log(shrimp); // 'Harlequin Shrimp'

// Uncaught ReferenceError: Cannot access 'incorrectOrderShrimp' before initialization
// console.log(letShrimp);
// let letShrimp = 'Harlequin Shrimp';

// Uncaught ReferenceError: Cannot access 'constShrimp' before initialization
// console.log(constShrimp);
// const constShrimp = 'Harlequin Shrimp';

howl(); // 'AWOOOOOOOO'
function howl() {
  console.log('AWOOOOOOOO');
}

// hoot(); // Uncaught TypeError: hoot is not a function
console.log(hoot) // Undefined. VAR got HOISTED UP
var hoot = function() {
  console.log('HOOOO HOOOO');
}

// letHoot(); // Uncaught ReferenceError: Cannot access 'letHoot' before initialization
console.log(letHoot) // Uncaught ReferenceError: Cannot access 'letHoot' before initialization
let letHoot = function() {
  console.log('HOOOO HOOOO');
}


/*******************************************************************************************
 * 
 * Apply Functions to Collections of Data
 *
 *
 *
 *
 *
 ********************************************************************************************/

// 1. Array Callback Methods

