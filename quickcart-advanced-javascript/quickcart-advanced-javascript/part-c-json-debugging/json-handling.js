"use strict";

// Part C - JSON Handling & Output-Based Debugging

// ---------------- Task 1: JSON.stringify() and JSON.parse() ----------------
console.log("---- Part C | Task 1: stringify and parse ----");

const order = {
  orderId: 501,
  customer: "Rahul",
  amount: 5000,
  deliveryDate: undefined,
  discount: null,
  calculateTax() {
    return 500;
  },
};

const jsonString = JSON.stringify(order);
console.log("JSON string:", jsonString);

const parsedOrder = JSON.parse(jsonString);
console.log("Parsed back:", parsedOrder);

console.log("Has deliveryDate?", "deliveryDate" in parsedOrder);
console.log("Has calculateTax?", "calculateTax" in parsedOrder);
console.log("discount is kept as:", parsedOrder.discount);

/*
  Properties lost: deliveryDate (undefined) and calculateTax (function).
  discount: null is kept because null is a valid JSON value.

  Why do functions and undefined behave differently?
  JSON is a text format that only supports string, number, boolean, null,
  array and object. Functions and undefined do not exist in JSON, so
  JSON.stringify skips them when they are object properties. (Inside arrays
  they become null so that the positions do not shift.)
*/

// ---------------- Task 2: Predict the output ----------------
console.log("\n---- Part C | Task 2: Predict the output ----");

// Q1 - undefined in an object
// Output: {"name":"Rahul"}
// Reason: properties with undefined value are skipped.
console.log("Q1:", JSON.stringify({ name: "Rahul", age: undefined }));

// Q2 - undefined in an array
// Output: [10,null,30]
// Reason: in arrays undefined becomes null to keep the index positions.
console.log("Q2:", JSON.stringify([10, undefined, 30]));

// Q3 - NaN and Infinity
// Output: {"price":null,"discount":null}
// Reason: JSON has no NaN or Infinity, so they are converted to null.
console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));

// Q4 - invalid JSON
// Output: SyntaxError (Expected property name or '}' ...)
// Reason: JSON needs double quotes around keys and strings. Here keys have no
// quotes and 'Rahul' uses single quotes.
try {
  console.log("Q4:", JSON.parse("{name: 'Rahul', age: 25}"));
} catch (err) {
  console.log("Q4: Error ->", err.name);
}

// Q5 - circular reference
// Output: TypeError: Converting circular structure to JSON
// Reason: user.self points back to user, so stringify would loop forever.
const user = { name: "Rahul" };
user.self = user;
try {
  console.log("Q5:", JSON.stringify(user));
} catch (err) {
  console.log("Q5: Error ->", err.name);
}

// Q6 - Date object
// Output: {"createdAt":"2026-01-01T00:00:00.000Z"}
// Reason: Date has a toJSON() method that returns an ISO date string.
console.log("Q6:", JSON.stringify({ createdAt: new Date("2026-01-01") }));
