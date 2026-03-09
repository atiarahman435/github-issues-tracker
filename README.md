## Questions

### 1. What is the difference between var, let, and const?

`var`, `let`, and `const` are used to declare variables in JavaScript.

- `var` is the older way of declaring variables and it is function-scoped.
- `let` is block-scoped and can be reassigned later.
- `const` is also block-scoped but its value cannot be reassigned after it is declared.

Because of better scoping and safer behavior, `let` and `const` are commonly used in modern JavaScript.

---

### 2. What is the spread operator (...)?

The spread operator (`...`) is used to expand elements of an array or object.  
It allows us to copy or merge arrays and objects easily.

Example:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];
3. Difference between map(), filter(), and forEach()

These are array methods used to work with lists of data.

map() creates a new array by transforming each element.

filter() creates a new array that contains only elements that match a condition.

forEach() loops through an array and performs an action but does not return a new array.
4. What is an arrow function?

An arrow function is a shorter way to write functions in JavaScript using the => syntax.

Example:
const add = (a, b) => a + b;
5. What are template literals?

Template literals are a way to write strings using backticks (`) instead of quotes.

They allow variables to be inserted inside strings using ${}.

Example:
const name = "John";
const message = `Hello ${name}`;