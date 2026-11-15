# QuickCart – Advanced JavaScript Practical Assignment

## Overview
QuickCart is an e-commerce order management system. In this assignment I fixed, implemented and optimised its features using modern JavaScript (ES6+) with no frameworks or libraries. The work is split into six parts covering objects and classes, array methods, JSON handling, asynchronous programming, performance optimisation with DOM events, and a final integration challenge.

## Technologies Used
- JavaScript (ES6+)
- HTML5 and CSS3 (Part E)
- Node.js (to run the console-based parts)

## Project Structure
```
quickcart-advanced-javascript/
├── part-a-objects-classes/products.js
├── part-b-array-methods/shopping-cart.js
├── part-c-json-debugging/json-handling.js
├── part-d-asynchronous/order-processing.js
├── part-e-optimization-events/index.html, script.js, style.css
├── part-f-integration/quickcart.js
└── README.md
```

## How to Run
Parts A, B, C, D and F run in Node.js:
```
node part-a-objects-classes/products.js
node part-b-array-methods/shopping-cart.js
node part-c-json-debugging/json-handling.js
node part-d-asynchronous/order-processing.js
node part-f-integration/quickcart.js
```
Part E runs in the browser: open `part-e-optimization-events/index.html` (or use the VS Code Live Server extension).

## Explanation of Each Part

**Part A – Objects, Prototypes & ES6 Classes**
Created a `Product` constructor with a shared `displayProduct()` method on the prototype, then rebuilt it using ES6 classes with `ElectronicProduct` and `ClothingProduct` extending it through `super()`. Also used arrow functions, template literals, destructuring, rest and spread in a checkout example.

**Part B – Higher-Order Functions, Map, Set & Object Methods**
Used `map`, `filter`, `reduce` and `forEach` on the cart data. Built an inventory with `Map`, removed duplicate emails with `Set`, and compared `Object.freeze()` with `Object.seal()` including shallow freezing.

**Part C – JSON Handling & Output-Based Debugging**
Converted an order object with `JSON.stringify()` and `JSON.parse()` and observed that `undefined` and functions are lost. Predicted and verified the output of six edge cases (undefined, NaN/Infinity, invalid JSON, circular reference, Date).

**Part D – Asynchronous JavaScript**
Explained the event loop (microtasks vs macrotasks) and built the order flow three ways: callbacks, Promises and async/await. Compared `Promise.all`, `allSettled`, `race` and `any` using three mock APIs.

**Part E – Performance Optimization & DOM Events**
Implemented `debounce` for search (500 ms), `throttle` for scroll (1000 ms), a memoized discount calculator using closures, and event bubbling / delegation with a Remove button list.

**Part F – Final Integration Challenge**
Combined classes, destructuring, `map`, `filter`, `reduce`, `Set`, `Map`, `Object.freeze`, `JSON.stringify`, async/await with try/catch and template literals to print the QuickCart order summary. All values are calculated, not hardcoded.

## Screenshots
Add screenshots of the Part E DOM features here:

- Debounced search: `screenshots/debounce.png`
- Throttled scroll: `screenshots/throttle.png`
- Memoized discount: `screenshots/memoization.png`
- Bubbling and delegation: `screenshots/delegation.png`

## Submission Links
- GitHub Repository: https://github.com/ShaikAsifa2612/Quick--Cart-Assignment-/edit/main/quickcart-advanced-javascript/quickcart-advanced-javascript/
- Loom Video: https://www.loom.com/share/8090c84c2d094a9cb1a8f3a0d55f9c67
- Live Link: https://quick-cart-assignment.vercel.app/quickcart-advanced-javascript/quickcart-advanced-javascript/part-e-optimization-events/
