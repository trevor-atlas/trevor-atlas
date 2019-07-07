---
title: "Typescipt 'any' is a code smell"
date: 2019-03-06 16:56:34
tags: typescript
---

Typescript is a really powerful tool for making javascript more maintainable, easier to refactor and faster to write.
one of Typescript's strengths is that any javascript code is also valid Typescript so the migration of a legacy js codebase is easy!
While using any is about convenience, I consider it a code smell. Why?

### No advantage over vanilla js

When you use the `any` type, you are saying "please don't typecheck this" typescript will ignore any error you may make in using this type,

### Harder to change in the future

When you use `any`, you change the contract for your application and make it harder to refactor in the future. since there is no type safety, it's inherently harder to reason about and change.

### Makes you look lazy

Using `any` (except in the cases listed below) makes me think you were too lazy to do this the right way and provide a minimal typedef for your code.

## What to do instead

instead of using `any` I recommend fleshing it out as much as possible:

```ts
type MyType = {
    someField: number,
    otherFunc(): void
    // ...maybe other stuff
}
```

you can also use the optional operator for more flexibility:

```ts
type MyType = {
    someField?: number,
    otherFunc()?: void
    // ...maybe other stuff
}
```

The benefits here are numerous, namely that:

 1. This is MUCH easier to refactor, even if it is incomplete
 2. I get basic intellisense now when I use this type
 3. The compiler will now complain if we use it incorrectly
 4. You don't look lazy, yay!
