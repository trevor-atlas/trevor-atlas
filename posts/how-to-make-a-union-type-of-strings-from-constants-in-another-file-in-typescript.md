---
title: "TS union from constants in a JS file"
date: '2022-02-18'
tags:
  - typescript
banner: /images/blue-arrow.jpg
---

I have a file containing constants that I would like to create a string union from. How can I do that?

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

But why does this work?

`import * as Constants from './constants';` imports each `export` from `constants.ts` as a key/value pair in an object that looks like this:

```ts
{
	MY_NAME: 'Trevor',
	I_LIKE: 'Music',
	MY_CAT: 'IS_CUTE'
}
```

`typeof Constants` is just that object expressed as a type, which looks identical.

`keyof typeof Constants` is each unique key in that type: `MY_NAME`, `I_LIKE`, and `MY_CAT`.

`ValueOf` is slightly more complicated, but essentially it's a way of saying "Get each `key` from some type called `T`, and use it to get the value inside `T`" or another way of thinking about it:

```ts
const example = {
  MY_NAME: 'Trevor',
  I_LIKE: 'Music',
  MY_CAT: 'IS_CUTE'
};

const valuesFromExample = [];
for (const key in example) {
  valuesFromExample.push(example[key]);
}
console.log(valuesFromExample); // ['Trevor', 'Music', 'IS_CUTE']
```

`ValueOf` is doing something similar but with `type` information instead of actual runtime values. 'Give me the values contained inside a given object generically represented as `T`'.
