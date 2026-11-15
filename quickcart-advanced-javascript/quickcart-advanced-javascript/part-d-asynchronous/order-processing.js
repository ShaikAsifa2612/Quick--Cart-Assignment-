"use strict";

// Part D - Asynchronous JavaScript
// Order flow: validate -> check availability -> payment -> order id -> confirmation
// Tasks 2-4 use the three steps from the assignment (validate, pay, confirm).

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------- Task 1: Event loop ----------------
function eventLoopDemo() {
  console.log("---- Part D | Task 1: Event loop ----");
  console.log("Order Started");
  setTimeout(() => console.log("Payment Processing"), 0);
  Promise.resolve().then(() => console.log("Payment Successful"));
  console.log("Order Completed");
}

/*
  Output order:
    Order Started
    Order Completed
    Payment Successful
    Payment Processing

  Q1. Why does the Promise callback run before setTimeout()?
  Promise callbacks go to the microtask queue and setTimeout callbacks go to
  the macrotask queue. After the main code finishes, the event loop empties
  all microtasks first, and only then picks a macrotask.

  Q2. What are the microtask and macrotask queues?
  Microtasks: promise .then/.catch, queueMicrotask. Macrotasks: setTimeout,
  setInterval, DOM events, I/O.

  Q3. What role does the call stack play?
  It keeps track of the function that is running now. JS runs one thing at a
  time, and synchronous code finishes on the stack before any queue is checked.

  Q4. What does the event loop do?
  It watches the call stack, and when the stack is empty it moves the next
  task from the queues (microtasks first) onto the stack.
*/

// ---------------- Task 2: Callbacks ----------------
function validateOrder(cb) {
  setTimeout(() => {
    console.log("Order Validated");
    cb();
  }, 1000);
}

function processPayment(cb) {
  setTimeout(() => {
    console.log("Payment Completed");
    cb();
  }, 1000);
}

function sendConfirmation(cb) {
  setTimeout(() => {
    console.log("Confirmation Sent");
    cb();
  }, 1000);
}

function runCallbacks(done) {
  console.log("\n---- Part D | Task 2: Callbacks ----");
  // nested callbacks -> this is callback hell
  validateOrder(() => {
    processPayment(() => {
      sendConfirmation(() => {
        console.log("All steps done (callbacks)");
        done();
      });
    });
  });
}

/*
  Why is callback hell hard to maintain?
  Every new step adds another level of nesting, so the code moves to the right
  like a pyramid. It is hard to read, error handling has to be repeated at
  every level, and changing the order of steps is risky.
*/

// ---------------- Task 3: Promises ----------------
function validateOrderPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order Validated");
      resolve();
    }, 1000);
  });
}

function processPaymentPromise(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Payment failed"));
        return;
      }
      console.log("Payment Completed");
      resolve();
    }, 1000);
  });
}

function sendConfirmationPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Confirmation Sent");
      resolve();
    }, 1000);
  });
}

function runPromises() {
  console.log("\n---- Part D | Task 3: Promises ----");
  return validateOrderPromise()
    .then(() => processPaymentPromise())
    .then(() => sendConfirmationPromise())
    .then(() => console.log("All steps done (promises)"))
    .catch((err) => console.log("Order failed:", err.message));
}

// ---------------- Task 4: async/await ----------------
async function placeOrder(paymentShouldFail = false) {
  try {
    await validateOrderPromise();
    await processPaymentPromise(paymentShouldFail);
    await sendConfirmationPromise();
    console.log("Order placed successfully!");
  } catch (error) {
    console.log("Order failed:", error.message);
  }
}

async function runAsyncAwait() {
  console.log("\n---- Part D | Task 4: async/await (success) ----");
  await placeOrder();
  console.log("\n---- Part D | Task 4: async/await (failure) ----");
  await placeOrder(true);
}

// ---------------- Task 5: Promise combinators ----------------
const productsAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Products Loaded"), 1000));

const paymentAPI = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject("Payment Service Failed"), 1500)
  );

const deliveryAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Delivery Loaded"), 2000));

async function runCombinators() {
  console.log("\n---- Part D | Task 5: Promise combinators ----");

  // Promise.all -> fails as soon as one rejects
  try {
    const results = await Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("all():", results);
  } catch (err) {
    console.log("all() failed ->", err);
  }

  // Promise.allSettled -> status of every request
  const settled = await Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("allSettled():");
  settled.forEach((r, i) => {
    console.log(`  API ${i + 1}: ${r.status} ->`, r.value ?? r.reason);
  });

  // Promise.race -> first one to settle (success or failure)
  const first = await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("race():", first);

  // Promise.any -> first successful result
  const firstSuccess = await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("any():", firstSuccess);
}

/*
  Q1. Difference between all() and allSettled()?
  all() rejects as soon as one promise rejects, and we lose the other results.
  allSettled() waits for every promise and gives the status of each
  (fulfilled or rejected), so it never rejects.

  Q2. Does race() wait for success or just the first settled result?
  Just the first settled result. It can be a success or a failure.

  Q3. How is any() different from race()?
  any() ignores rejections and returns the first fulfilled promise. race()
  returns whichever settles first, even if it is a rejection.

  Q4. What happens when every promise in any() rejects?
  It rejects with an AggregateError that holds all the rejection reasons.
*/

// run everything one after another
eventLoopDemo();
setTimeout(() => {
  runCallbacks(async () => {
    await runPromises();
    await runAsyncAwait();
    await runCombinators();
  });
}, 100);
