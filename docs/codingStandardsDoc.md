# 📘 Coding Standards Document

## Purpose

This document defines the **naming conventions** and **formatting standards** to ensure:

- Code consistency
- Readability
- Maintainability
- Team collaboration efficiency

---

# 🏷 Naming Conventions

## Variables & Functions

- Use **camelCase**
- Names must be descriptive
- Avoid single-letter names (except loop counters like `i`)

### ✅ Good

```javascript
let userName;
let totalPrice;

function calculateTotal() {}
function getUserData() {}
```

### ❌ Bad
```javascript
let x;
let data1;
```

### Classes

- Use **PascalCase**
- Use singular nouns

```javascript
class User {}
class OrderService {}
```

### Constants

- Use **UPPER_SNAKE_CASE**
- Only for values that never change

```javascript
const MAX_USERS = 100;
const API_URL = "https://api.example.com";
```

### Files

- Use **kebab-case**

```code
user-service.js
order-controller.js
auth-middleware.js
```

### Boolean Variables

Prefix with:

 - `is`
 - `has`
 - `can`
 - `should`

```javascript
let isLoggedIn;
let hasPermission;
let canEdit;
```

# 🎨 Formatting Standards

### Indentation

- Use 2 or 4 spaces
- Never mix tabs and spaces
- Be consistent across the project

### Braces Style

Opening brace on the same line:

```javascript
if (isLoggedIn) {
  console.log("Welcome");
}
```

### Line Length

- Maximum: **80-120 characters**
- Break long lines properly

### Spacing

Add spaces:

- Around operators
- After commas
- After keywords

### ✅ Good

```javascript
let total = price + tax;
```

### ❌ Bad

```javascript
let total=price+tax;
```

### Semicolons

- Always use semicolons

```javascript
let count = 10;
```

### Comments

- Use meaningful comments
- Avoid obvious comments

### ✅ Good

```javascript
// Calculate total price including tax
```

### ❌ Bad

```javascript
// Add two numbers
let total = a + b;
```

# 🧹 Tools for Enforcing Standards

- ESLint (linting)
- Prettier (automatic formatting)
- Husky (pre-commit hooks)

# 📌 Summary

| Element   | Convention        |
|:----------|:------------------|
| Variables | camelCase         |
| Functions | camelCase         |
| Classes   | PascalCase        |
| Constants | UPPER_SNAKE_CASE  |
| Files     | kebab-case        |


