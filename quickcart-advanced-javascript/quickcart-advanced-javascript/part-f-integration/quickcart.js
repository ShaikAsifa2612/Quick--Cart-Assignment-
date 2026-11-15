"use strict";

// Part F - Final Integration Challenge
// Uses: class, destructuring, map, filter, reduce, Set, Map, Object.freeze,
// JSON.stringify, async/await with try/catch and a template literal.

class Product {
  constructor(id, name, price, qty) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }

  // total price of this product line
  getTotal() {
    return this.price * this.qty;
  }
}

// product data
const productData = [
  { id: 1, name: "Laptop", price: 50000, qty: 1 },
  { id: 2, name: "Mouse", price: 1000, qty: 2 },
  { id: 3, name: "Monitor", price: 15000, qty: 1 },
  { id: 4, name: "Keyboard", price: 2000, qty: 1 },
];

const products = productData.map(({ id, name, price, qty }) => new Product(id, name, price, qty));

// frozen order configuration
const orderConfig = Object.freeze({
  customer: "Rahul",
  currency: "₹",
  confirmationDelay: 1000,
});

// simulates order confirmation with a delay
function confirmOrder(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function placeOrder() {
  const { customer, currency, confirmationDelay } = orderConfig;

  // map() for product totals
  const productTotals = products.map((product) => ({
    name: product.name,
    total: product.getTotal(),
  }));

  // filter() for products over 5000
  const expensiveProducts = products.filter((product) => product.price > 5000);

  // reduce() for the order total
  const orderTotal = productTotals.reduce((sum, item) => sum + item.total, 0);

  // Set of unique product ids
  const uniqueIds = new Set(products.map((product) => product.id));

  // Map for inventory
  const inventory = new Map(products.map((product) => [product.id, product]));

  // JSON.stringify on the order
  const order = {
    customer,
    items: productTotals,
    total: orderTotal,
    expensiveCount: expensiveProducts.length,
    inventorySize: inventory.size,
  };
  const orderJson = JSON.stringify(order);

  // print summary using template literals
  console.log("====== QUICKCART ORDER SUMMARY ======");
  console.log(`Customer: ${customer}`);
  console.log("Products:");
  productTotals.forEach(({ name, total }) => {
    console.log(`${name} - ${currency}${total}`);
  });
  console.log(`\nTotal Order Amount: ${currency}${orderTotal}`);
  console.log(`Unique Products: ${uniqueIds.size}`);

  // async/await confirmation with try/catch
  try {
    console.log("\nOrder Status: Processing...");
    await confirmOrder(confirmationDelay);
    console.log("Order Status: Confirmed Successfully!");
  } catch (error) {
    console.log(`Order Status: Failed - ${error.message}`);
  }
  console.log("=====================================");

  console.log("\nOrder JSON:", orderJson);
  console.log("Products over ₹5000:", expensiveProducts.map((p) => p.name).join(", "));
}

placeOrder();
