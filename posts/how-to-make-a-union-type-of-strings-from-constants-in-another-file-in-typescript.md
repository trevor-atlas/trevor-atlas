---
title: "TS union from constants in a JS file"
date: '2022-02-18'
tags:
  - typescript
banner: /images/blue-arrow.jpg
description: Do you have a file containing constants that you'd like to create a string union from? Here's how you can do that.
---

**The problem:**
You have a file containing many constants that you'd like to create a string union from the names or values of.

**The solution:**
Use `keyof` and `typeof` to create a union from the keys and values of an object.

## Example

in `constaints.ts`

```ts
export const MY_NAME = 'Trevor';
export const I_LIKE = 'Music';
export const MY_CAT = 'IS_CUTE';
```

in some other typescript file:

```ts
import * as Constants from './constants';

type ValueOf<T> = T[keyof T];

// 'MY_NAME' | 'I_LIKE' | 'MY_CAT';
export type KeyUnionOfConstants = keyof typeof Constants;

// 'Trevor' | 'Music' | 'IS_CUTE';
export type ValueUnionOfConstants = ValueOf<typeof Constants>;
```

Tada!

### Explanation
But why does this work?

```ts
import * as Constants from './constants';
```
imports each `export` from `constants.ts` as a key/value pair in an object that looks like this:

```ts
{
  MY_NAME: 'Trevor',
  I_LIKE: 'Music',
  MY_CAT: 'IS_CUTE'
}
```

`typeof Constants` is just that object expressed as a type, which looks identical.

```ts
type Constants = {
  MY_NAME: 'Trevor';
  I_LIKE: 'Music';
  MY_CAT: 'IS_CUTE';
}
```

`keyof typeof Constants` is each unique key in that type: `MY_NAME`, `I_LIKE`, and `MY_CAT`.

`ValueOf` is slightly more complicated, but essentially it's a way of saying "Get each `key` from some type called `T`, and use it to get the value inside `T`" or another way of thinking about it:

```ts
Object.values({
  MY_NAME: 'Trevor',
  I_LIKE: 'Music',
  MY_CAT: 'IS_CUTE'
}); // ['Trevor', 'Music', 'IS_CUTE']
```

`ValueOf` is doing something similar but with `type` information instead of actual runtime values. 'Give me the values contained inside a given object generically represented as `T`'.
