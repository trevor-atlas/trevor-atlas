---
title: "Typescipt 'any' is a code smell"
date: '2019-03-06'
tags:
- typescript
banner: /images/any-stinks.jpg
bannerAlt: Some minty fresh greens
bannerCredit:
  Photo by [Victor Serban](https://unsplash.com/@victorserban)
---

Typescript is a really powerful tool for making javascript more maintainable, easier to refactor and faster to write.
one of Typescript's strengths is that any javascript code is also valid Typescript so the migration of a legacy js codebase is easy!
While using any is about convenience, I consider it a code smell. Why?

### No advantage over vanilla js

When you use the `any` type, you are saying "please don't typecheck this" typescript will ignore any error you may make in using this type,

### Harder to change in the future

When you use `any`, you change the contract for your application and make it harder to refactor in the future. since there is no type safety, it's inherently harder to reason about and change.

### It's the bare minimum

Using `any` (except in the cases listed below) makes your code inherently harder to maintain and reason about. It's impolite to not at least provide a minimal typedef for your code.

## When to use any

There are a few cases where using `any` is acceptable:

 1. When you are using a library that doesn't have types
 2. When you are using a library that has types but they are wrong
 3. When you are using a library that has types but they are incomplete
 4. When you are working with a legacy codebase that has no types, and you don't yet know what the types are


## What to do instead

instead of using `any` I recommend fleshing your types out as much as possible. Even if you only know part of the type definition, it's better to have something than nothing.

```ts
type MyType = {
    someField: number,
    otherFunc(): void
    // ...maybe other stuff
}
```

The benefits here are numerous, namely that:

 1. This is MUCH easier to refactor, even if it is incomplete
 2. I get basic intellisense now when I use this type
 3. The compiler will now complain if we use it incorrectly
 4. You don't look lazy, yay!
