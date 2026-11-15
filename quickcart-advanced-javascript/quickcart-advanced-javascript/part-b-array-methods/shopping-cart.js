"use strict";

// Part B - Higher-Order Functions, Map, Set & Object Methods

const cart = [
  { id: 101, name: "Laptop", price: 50000, qty: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, qty: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, qty: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, qty: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, qty: 2, category: "Accessories" },
];

// ---------------- Task 1: Array methods ----------------
console.log("---- Part B | Task 1: Array methods ----");

// map() -> names with total item price
const itemTotals = cart.map((item) => ({
  name: item.name,
  total: item.price * item.qty,
}));
console.log("map():", itemTotals);

// filter() -> products above 2000
const expensiveItems = cart.filter((item) => item.price > 2000);
console.log("filter():", expensiveItems.map((item) => item.name));

// reduce() -> total cart value
const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log("reduce() cart total: ₹" + cartTotal);

// forEach() -> log name, category and quantity
console.log("forEach():");
cart.forEach(({ name, category, qty }) => {
  console.log(`  ${name} | ${category} | Qty: ${qty}`);
});

// combined -> total value of all Electronics products
const electronicsTotal = cart
  .filter((item) => item.category === "Electronics")
  .reduce((sum, item) => sum + item.price * item.qty, 0);
console.log("Electronics total: ₹" + electronicsTotal);

/*
  Q1. Difference between map() and forEach()?
  map() returns a new array with the results of the callback. forEach() just
  runs the callback for each item and returns undefined.

  Q2. Does filter() change the original array?
  No. It returns a new array with only the items that pass the test. The
  original array stays the same.

  Q3. Why is reduce() useful for totals?
  It keeps an accumulator and combines all elements into one single value, so
  it is perfect for sum, count, average etc.

  Q4. Which method returns a new transformed array?
  map().
*/

// ---------------- Task 2: Map and Set ----------------
console.log("\n---- Part B | Task 2: Map and Set ----");

// A. Inventory using Map (key = product id, value = product details)
const inventory = new Map();
cart.forEach((item) => inventory.set(item.id, { ...item }));

console.log("Get 102:", inventory.get(102));

// update quantity
const mouse = inventory.get(102);
mouse.qty = 10;
inventory.set(102, mouse);
console.log("After update, qty of 102:", inventory.get(102).qty);

// delete one
inventory.delete(103);
console.log("Has 103 after delete?", inventory.has(103));

// loop over all entries
console.log("Loop over inventory:");
for (const [id, product] of inventory) {
  console.log(`  ${id} -> ${product.name} (qty ${product.qty})`);
}

// B. Remove duplicates with Set
const emails = [
  "rahul@gmail.com",
  "priya@gmail.com",
  "rahul@gmail.com",
  "arjun@gmail.com",
  "priya@gmail.com",
];
const uniqueEmails = [...new Set(emails)];
console.log("Unique emails:", uniqueEmails);

/*
  Q1. How is Map different from a plain object?
  A Map can have any type as a key (even objects), keeps insertion order, has a
  .size property and is easy to loop over. A plain object only uses strings or
  symbols as keys.

  Q2. Why is Set good for removing duplicates?
  A Set only stores unique values, so adding the same value twice keeps just one.

  Q3. Can a Map use an object as a key?
  Yes. Keys are compared by reference.

  Q4. Does Set keep insertion order?
  Yes, values come out in the order they were first added.
*/

// ---------------- Task 3: Object.freeze() vs Object.seal() ----------------
console.log("\n---- Part B | Task 3: freeze vs seal ----");

const productConfig = { name: "Laptop", price: 50000, stock: 20 };

const frozenConfig = Object.freeze({ ...productConfig });
const sealedConfig = Object.seal({ ...productConfig });

// "use strict" makes silent failures throw errors, so we use try/catch to log
function tryChanges(label, obj) {
  console.log(`[${label}]`);

  try {
    obj.price = 40000;
  } catch (err) {
    console.log("  change price -> Error:", err.message);
  }
  console.log("  price is now:", obj.price);

  try {
    obj.color = "Black";
  } catch (err) {
    console.log("  add property -> Error:", err.message);
  }
  console.log("  color is now:", obj.color);

  try {
    delete obj.stock;
  } catch (err) {
    console.log("  delete property -> Error:", err.message);
  }
  console.log("  stock is now:", obj.stock);
}

tryChanges("frozen", frozenConfig);
tryChanges("sealed", sealedConfig);

// shallow freeze demo
const order = Object.freeze({ id: 1, details: { city: "Mumbai" } });
order.details.city = "Delhi"; // works, because nested object is not frozen
console.log("Nested object after shallow freeze:", order.details.city);

/*
  Q1. Difference between freeze() and seal()?
  freeze() makes the object fully read-only: no change, no add, no delete.
  seal() does not allow adding or deleting properties, but existing ones can
  still be changed.

  Q2. Can a property be changed after seal()?
  Yes, existing property values can be changed.

  Q3. Are nested objects frozen automatically?
  No. Only the first level is frozen.

  Q4. What is shallow freezing?
  Object.freeze only freezes the top-level properties. Objects inside it can
  still be modified unless we freeze them too (deep freeze).
*/
