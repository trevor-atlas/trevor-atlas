---
title: Functional Programming
date: '2016-10-28'
banner: /images/functional.png
tags:
  - javascript
draft: true
---

# Functional Programming in ES6

Since I migrated one of the bigger projects at work to ES6, I've been more and more interested in functional programming and the idea of having little to no state mutation.

I feel that Javascript lends itself very well to functional programming paradigms, especially with the changes presented in ES6. You can use the basic prototype methods of the existing data structures right out of the box and be 90% of the way there. You just have to understand what's happening internally.

One of the ways that I've been improving my understanding and skills recently has been with [CodeWars](https://www.codewars.com). Free code kata are a great way to challenge yourself with new problems and creative solutions. Since the problems presented on CodeWars are designed by the community, I've seen unique solutions to problems that I never would have dreamed of.

For example I saw one particular problem solved in 1 line of code with a reverse lookup RegEx. While it wasn't entirely practical since you would have to explain how it worked to almost everyone else on the team, it was exciting to see such a creative solution.

_Here's one example of a recent problem I solved:_


## Convert number to reversed array of digits
<blockquote>Given a random number, You have to return the digits of this number within an array in reverse order.
example: 348597 -> [7,9,5,8,4,3]</blockquote>


And my solution could look like this (there are shorter methods, but this is the one I wrote):

```js
const digitize = n => n.toString().split('').reverse().map(s => parseInt(s));
```


No variables are created, no existing data is mutated. It operates like a coin machine, data in, data out.



Here's another problem:

## Double String

<blockquote>Given a string, you have to return a string in which each character (case-sensitive) is repeated once.
example: doubleChar("String") ==> "SSttrriinngg"</blockquote>

And my solution:

```js
const doubleChar = str => str.split('').map((t) => t+t).join('');
```


Simple and easy to understand.

If you haven't given it a try, I highly recommend CodeWars as a place to improve your skills and see new ways to solve old problems.
