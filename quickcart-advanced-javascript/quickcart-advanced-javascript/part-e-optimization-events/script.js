"use strict";

// Part E - Performance Optimization & DOM Events

// ---------------- Task 1: Debouncing ----------------
// Runs the callback only after the user stops calling it for `delay` ms
function debounce(callback, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId); // cancel the previous timer
    timerId = setTimeout(() => callback.apply(this, args), delay);
  };
}

const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

const runSearch = (event) => {
  searchResult.textContent = `Searching for "${event.target.value}" at ${new Date().toLocaleTimeString()}`;
};

searchInput.addEventListener("input", debounce(runSearch, 500));

// ---------------- Task 2: Throttling ----------------
// Runs the callback at most once per `delay` ms
function throttle(callback, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}

const scrollCountEl = document.getElementById("scrollCount");
const scrollPosEl = document.getElementById("scrollPos");
let scrollCount = 0;

const handleScroll = () => {
  scrollCount++;
  scrollCountEl.textContent = scrollCount;
  scrollPosEl.textContent = Math.round(window.scrollY);
};

window.addEventListener("scroll", throttle(handleScroll, 1000));

/*
  Q1. Difference between debouncing and throttling?
  Debounce waits until the events stop for some time and then runs once.
  Throttle runs the function at a fixed rate (once per interval) while events
  keep happening.

  Q2. Which suits search suggestions?
  Debouncing - we only want to search after the user has stopped typing.

  Q3. Which suits scroll and resize events?
  Throttling - we want regular updates while scrolling, but not hundreds of calls.
*/

// ---------------- Task 3: Memoization ----------------
function calculateDiscount(price, percentage) {
  return price - (price * percentage) / 100;
}

// wrapper that caches results. The cache lives in a closure.
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log(`Cache hit for ${key}`);
      return { value: cache[key], fromCache: true };
    }
    console.log(`Fresh calculation for ${key}`);
    const result = fn(...args);
    cache[key] = result;
    return { value: result, fromCache: false };
  };
}

const memoizedDiscount = memoize(calculateDiscount);

document.getElementById("calcBtn").addEventListener("click", () => {
  const price = Number(document.getElementById("priceInput").value);
  const percent = Number(document.getElementById("percentInput").value);
  const { value, fromCache } = memoizedDiscount(price, percent);
  document.getElementById("discountResult").textContent = `₹${value}`;
  document.getElementById("discountSource").textContent = fromCache
    ? "From cache"
    : "Fresh calculation";
});

/*
  Q1. What is memoization?
  Saving the result of a function for given arguments, so the next call with
  the same arguments returns the saved result.

  Q2. How does it improve performance?
  It avoids repeating expensive calculations for the same input.

  Q3. What role do closures play?
  The returned function remembers the `cache` variable of memoize() even after
  memoize() has finished, so the cache stays private and persists between calls.
*/

// ---------------- Task 4: Event bubbling and delegation ----------------
const productList = document.getElementById("productList");
const eventLog = document.getElementById("eventLog");
const stopToggle = document.getElementById("stopToggle");

function logEvent(message) {
  const li = document.createElement("li");
  li.textContent = message;
  eventLog.appendChild(li);
}

// Delegation: ONE listener on the parent handles clicks of all Remove buttons
productList.addEventListener("click", (event) => {
  logEvent(
    `Parent handler ran. target = ${event.target.tagName}, currentTarget = ${event.currentTarget.tagName}`
  );

  if (event.target.classList.contains("remove-btn")) {
    const item = event.target.closest("li");
    logEvent(`Removed: ${item.firstChild.textContent.trim()}`);
    item.remove();
  }
});

// Bubbling demo: the parent handler above runs on every button click because
// the click bubbles up from the button to the list.
// When the checkbox is ticked, the button's own handler calls
// stopPropagation(), so the click never reaches the parent handler.
document.querySelectorAll(".remove-btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (stopToggle.checked) {
      event.stopPropagation();
      logEvent("stopPropagation() called - parent handler will NOT run");
      // the parent will not remove it now, so remove the item here
      event.target.closest("li").remove();
    }
  });
});

/*
  Q1. What is event bubbling?
  When an event happens on an element, it first runs handlers on that element
  and then moves up through its parents (parent, grandparent ... document).

  Q2. What is event delegation?
  Adding one listener on a parent and using event.target to find which child
  was clicked, instead of adding a listener to every child.

  Q3. Why is delegation useful for dynamically created elements?
  New children added later are covered automatically, because the listener is
  on the parent. No need to attach listeners again.

  Q4. What does event.stopPropagation() do?
  It stops the event from bubbling up to parent elements.

  Q5. Difference between event.target and event.currentTarget?
  target is the element that was actually clicked. currentTarget is the element
  that the running handler is attached to.
*/
