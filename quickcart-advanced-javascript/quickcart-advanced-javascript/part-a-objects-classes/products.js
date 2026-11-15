"use strict";

// Part A - Objects, Prototypes & ES6 Classes

// ---------------- Task 1: Prototype based products ----------------
function runTask1() {
  console.log("---- Part A | Task 1: Prototype ----");

  // constructor function
  function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  // method added on the prototype so all products share one copy
  Product.prototype.displayProduct = function () {
    return `${this.productName} | ${this.category} | ₹${this.price}`;
  };

  const p1 = new Product("Laptop", 50000, "Electronics");
  const p2 = new Product("T-Shirt", 799, "Clothing");
  const p3 = new Product("Mouse", 800, "Accessories");

  console.log(p1.displayProduct());
  console.log(p2.displayProduct());
  console.log(p3.displayProduct());

  // both products point to the same function in memory
  console.log("Same method shared?", p1.displayProduct === p2.displayProduct);

  /*
    Q1. Why add displayProduct() to the prototype instead of the constructor?
    If we write it inside the constructor, every new product gets its own copy
    of the function, which wastes memory. On the prototype there is only one
    copy and every object shares it.

    Q2. Difference between __proto__ and prototype?
    - prototype is a property of a constructor function. It is the object that
      will become the parent of the objects created using "new".
    - __proto__ is a property on every object that points to its parent
      (the prototype it inherits from). So p1.__proto__ === Product.prototype.

    Q3. What happens when JS cannot find a property on an object?
    It looks in the object's prototype, then that prototype's prototype, and so
    on (the prototype chain) until it reaches null. If it is still not found,
    it returns undefined (and for a method call it throws a TypeError).
  */
}

// ---------------- Task 2: ES6 classes ----------------
function runTask2() {
  console.log("\n---- Part A | Task 2: ES6 Classes ----");

  class Product {
    constructor(productName, price, category) {
      this.productName = productName;
      this.price = price;
      this.category = category;
    }

    getProductDetails() {
      return `${this.productName} - ₹${this.price} (${this.category})`;
    }
  }

  class ElectronicProduct extends Product {
    constructor(productName, price, warrantyYears) {
      super(productName, price, "Electronics"); // must come before this
      this.warrantyYears = warrantyYears;
    }

    // unique method
    getWarrantyInfo() {
      return `${this.productName} comes with ${this.warrantyYears} year(s) warranty`;
    }
  }

  class ClothingProduct extends Product {
    constructor(productName, price, size) {
      super(productName, price, "Clothing");
      this.size = size;
    }

    // unique method
    getSizeInfo() {
      return `${this.productName} is available in size ${this.size}`;
    }
  }

  const laptop = new ElectronicProduct("Laptop", 50000, 2);
  const shirt = new ClothingProduct("T-Shirt", 799, "M");

  console.log(laptop.getProductDetails());
  console.log(laptop.getWarrantyInfo());
  console.log(shirt.getProductDetails());
  console.log(shirt.getSizeInfo());

  /*
    Q1. Purpose of extends?
    It makes a child class inherit from a parent class, so the child can reuse
    the parent's properties and methods and add its own.

    Q2. Why must super() be called before using this?
    In a child class, the "this" object is created by the parent constructor.
    Until super() runs, "this" does not exist, so using it gives a
    ReferenceError.

    Q3. Are ES6 classes completely different from prototype inheritance?
    No. Classes are just a cleaner syntax (syntactic sugar) over the same
    prototype system. Under the hood, methods still live on the prototype and
    "extends" sets up the prototype chain.
  */
}

// ---------------- Task 3: ES6 syntax in checkout ----------------
function runTask3() {
  console.log("\n---- Part A | Task 3: ES6 syntax ----");

  // (A) arrow function for final price after discount
  const getFinalPrice = (price, discountPercent) =>
    price - (price * discountPercent) / 100;
  console.log("(A) Final price:", getFinalPrice(50000, 10));

  // (B) template literal
  const customerName = "Rahul";
  const productName = "Laptop";
  const total = 50000;
  console.log(
    `(B) Hello ${customerName}, your order of ${productName} is confirmed. Total: ₹${total}.`
  );

  // (C) destructuring
  const customer = { name: "Rahul", email: "rahul@gmail.com", city: "Mumbai" };
  const { name, email } = customer;
  console.log("(C) Name:", name, "| Email:", email);

  // (D) rest operator
  function calculateTotal(...prices) {
    return prices.reduce((sum, price) => sum + price, 0);
  }
  console.log("(D) Total:", calculateTotal(50000, 800, 1500, 12000));

  // (E) spread to copy product with a new price
  const product = { productName: "Laptop", price: 50000, category: "Electronics" };
  const updatedProduct = { ...product, price: 45000 };
  console.log("(E) Original:", product);
  console.log("(E) Copy with new price:", updatedProduct);
}

runTask1();
runTask2();
runTask3();
