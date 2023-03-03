---
title: Why do we have `satisfies`?
date: 2023-03-02
description:
  The `satisfies` typescript keyword has been out for a little while now, but
  why do we have it?
tags:
  - typescript
meta:
  keywords: []
draft: true
banner: /images/unsplash-y9K5K1B-guw.png
bannerAlt: cave interior
bannerCredit:
  Photo by [Ademir
  Alves](https://images.unsplash.com/photo-1469797384183-f961931553e9?ixid=MnwzOTI4NjJ8MHwxfHNlYXJjaHwyfHx3aHktZG8td2UtaGF2ZS1zYXRpc2ZpZXN8ZW58MHx8fHwxNjc3ODExNDgw&ixlib=rb-4.0.3)
---

## Overview

Part of what can make Typescript more difficult to learn is that it has a lot of ways to accomplish similar things.
For example, there are _three_ ways to assign a type to a value! For newcomers this can be confusing,
but it's important to understand that each of these ways has a different purpose.

I'll start with a code example of good ol' colon annotation. This is the most common way to assign a type to a value:

```typescript
const record: Record<string, string> = {}
record.id = "123"; // All good!
```

When you see a colon annotation, you can think of it as a way to say "this value _must_ be of this type".

```typescript
// Type 'number' is not assignable to type 'string'.
const str: string = 123;
```

This also means that you can assign a type to a value that is *wider* than the value! (but what does that mean?)

```typescript
let id: number | undefined = undefined;

if (typeof id === "undefined") {
  id = 123;
}
```

This can be useful when you want to assign a type to a value that will be reassigned, but it does also come with a downside.
When using colon annotation, the type supercedes the value. This means that if you declare a wider type (such as `Record`) and then try to assign and access a narrower value (such as `{id: 123}`), you will get an error because the type is wider than the actual values.


```typescript
const routes: Record<string, string> = {
  "/": {}
  "/about": {}
  "/admin": {}
};

// No errors, because Record<string, string> could contain this, even though our value doesn't!
routes.thisDoesNotExist;
```

You also won't get autocomplete for the values, because the type is wider and not specific about what values might be in the object.

## How does `satisfies` help?

The `satisfies` keyword is a way to say "this value _satisfies_ this type".
This means that the value must be of the type, but it can also be more specific. (the value supercedes the type!) This is useful when you want to ensure a value is of the correct type, while keeping it as narrow as possible.

```typescript
const routes = {
  "/": {},
  "/about": {},
  "/admin": {},
} satisfies Record<string, {}>;

// Property 'thisDoesNotExist' does not exist on type '{ "/": {}; "/about": {}; "/admin": {}; }'.
routes.thisDoesNotExist;
```

`satisfies` also helps protect you from doing the wrong thing, much like colon annotation. For example, if you try to assign a value that is not of the type, you will get an error.

```typescript
const routes = {
  "/": {},
  "/about": {},
// Type 'string' is not assignable to type '{}'.
  "/admin": '123',
} satisfies Record<string, {}>;
```

## What about `as`?

The `as` keyword is basically a way lie to Typescript, or to say "I know what I'm doing, Typescript, so don't worry about it".
Unlike `satisfies` and colon annotation, `as` doesn't actually check that the value is of the type, it just says "this value is of this type".

```typescript
const routes = {} as Record<string, { config: string }>;

// No errors, but this will break at runtime!
routes["/"].config
```

There are also a few limitations to `as` - You can't force Typescript to convert a value to a type that is not compatible with the value.
(Unless you use `as-as` which is a bit of a hack)

```typescript
// Type 'string' is not assignable to type 'number'.
const num = "123" as number;

// This is probably not good, but it works! (until you try to use it as a number)
const num = "123" as unknown as number;
```

`as` does have some valid uses though, such as when you're converting an object to a known type:

```typescript
type User = {
  id: number;
  name: string;
};

const userBeingCreated = {} as User;

userBeingCreated.id = 123;
userBeingCreated.name = "John";
```

but if you're using `as` to annotate most of your variables, you're probably doing something wrong.
It might look safe, but as soon as you expand your `User` type, you'll start to have problems because nothing is ensuring that your variables are fulfilling the type.

```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

const userBeingCreated = {} as User;

userBeingCreated.id = 123;
userBeingCreated.name = "John";
// No errors, but we are not setting `age`!
```

## In closing

I hope this helps you understand the difference between the different ways to assign types in Typescript, and why you might want to use one over the other.

One closing note on `satisfies`:
Some people make the mistake of assuming they should use `satisfies` everywhere, but this is not the case.
It's fine for simple cases like this:

```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

const defaultUser = {
  id: 123,
  name: "John",
  age: 30,
} satisfies User;
```

but most of the time when you assign a type to a variable, you _want_ the type to be wider, for example:

```typescript
  // colon annotation
  let id: number | undefined = undefined;
  if (typeof id === "undefined") {
  // This is fine, because `id` is a number or undefined, and we're assigning a number to it.
    id = 123;
  }


  // satisfies
  let id = undefined satisfies number | undefined;
  if (typeof id === "undefined") {
    // Type 'number' is not assignable to type 'undefined'.
    id = 123;
  }

```


`satisfies` should not be your default. It's for handling edge cases and when:
- You want the EXACT type of the variable, not the WIDER type.
- The type is complex enough that you want to make sure you didn't mess it up


