---
title: To arrow, or not to arrow. That is the question!
date: 2023-03-02
description:
  JS arrow functions are great, but when should we use them? And why might we
  choose not to use them?
tags:
  - javascript
  - typescript
meta:
  keywords: []
draft: false
banner: /images/unsplash-H_tdgaW-0fU.png
bannerAlt: low angle photography of plane contrail
bannerCredit: Photo by [Nick
  Fewings](https://images.unsplash.com/photo-1517933508318-acc52a49cc04?ixid=MnwzOTI4NjJ8MHwxfHNlYXJjaHwyfHx0by1hcnJvdy1vci1ub3QtdG8tYXJyb3ctdGhhdC1pcy10aGUtcXVlc3Rpb258ZW58MHx8fHwxNjc3ODE0NTA4&ixlib=rb-4.0.3)
---

JS arrow functions are great.

- ✅ Concise
- ✅ Optional implicit return
- ✅ Don't have their own “this” context

But, I don't recommended using them everywhere.

We should prefer function declarations for _top-level_ functions, here's why.

```typescript
// Looks like a variable at a glance (especially in larger files, this can seriously hurt readability) 👎
// Order matters, since it's not hoisted 👎
const add = (a: number, b: number) => a + b;

// Looks like a function at a glance 👍
// Order doesn't matter, since it's hoisted 👍
function add(a: number, b: number) {
  return a + b;
}
```

You might say, "But the `this` context safety of arrow functions makes better!"
To which I say _no_ it doesn't - if you have need of a `this` context, it's not relevant to top-level functions, and isn't relevant for most functional style code either.

As with all things, use the right tool for the job. If you need to worry about `this` context, then handle that in the best way for your usecase.

Function declarations are weirdly looked down on nowadays compared to arrow functions, yet many people don't know there are [some niche cases](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) where arrow functions don't support the same things as function declarations.

The way I think about this:
Do I need a callback or one-liner? Is this function nested? Use an arrow.

```typescript
[1, 2, 3].map((n) => n ** n);

somePromise
  .then(() => {
    /* do something */
  })
  .catch(() => {
    /* do something else */
  });

useEffect(() => {
  // do something
}, []);
```

Everything else as `function`.

```typescript
function add(a: number, b: number) {
  return a + b;
}

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => add(c, 1));
  };

  return (
    <div>
      <span>{count}</span>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}
```
