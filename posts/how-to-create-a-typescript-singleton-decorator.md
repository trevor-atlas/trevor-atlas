---
title: "How to create a Typescript Singleton Decorator"
date: '2019-08-16'
---

The Singleton pattern is one of the most basic and powerful patterns for creating shared class instances. You may consider using the singleton pattern when you have a class that is a shared dependency for many other classes - such as an ORM(Object Relational Mapper) or database connection, which may be costly to recreate each time you need access to the database.

The basic idea behind the Singleton pattern is to store a reference to the instance of a class, and return that reference each time something asks for a new instance of that class, instead of creating a new instance each time.

We'll look at an old school example of a Javascript singleton before moving on to a typescript version, and finally a decorator that can turn almost any class into a singleton!

In traditional Javascript you might see something similar this:

```javascript
const Store = (function() {
    const data = [];

    function add(item) {
        data.push(item);
    }

    function get(id) {
        return data.find((d) => d.id === id);
    }

    return {
        add, get
    };
}());
```

Note: the code above is making use of the [iife pattern](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) as well

When this code runs, `Store` will be set to the return value of `Store` — an object that exposes two functions, `add` and `get` but that does not grant direct access to the collection of data.

This is beneficial enough, but it is more verbose than we really need and it doesn't give us any safety guarantees since this is just vanilla Javascript – there's nothing to prevent us from doing nefarious things!

This code is also not reusable, which means we will have to reimplement the same code for any object that needs to be a Singleton!

For the Typescript version, we will do essentially the same thing, but with a class.

```typescript
class Store {
    private static instance: Store;
    private data: {id: number}[];
    private constructor() {}

    public static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    public add(item: {id: number}) {
        this.data.push(item);
    }

    public get(id: number) {
        return this.data.find((d) => d.id === id);
    }
}

const wontWork = new Store() // throws an Error: constructor of 'Store' is private

const myStore = Store.getInstance();
myStore.add({id: 1});
myStore.add({id: 2});
myStore.add({id: 3});

const anotherStore = Store.getInstance();
anotherStore.get(2); // returns `{id: 2}`!
```

This is slightly improved over the pure javascript version. We now have type safety through the Typescript compiler and I think it's a little more readable, but this code is still verbose and could be drastically simplified.

Another problem with this version is that you have to use that weird `getInstance` method instead of the normal `new Store()` syntax we're all used to.

So now that we've compared the vanilla Javascript method to the Typescript method, let's make the concept of a Singleton reusable! One of the best ways to accomplish this is through the use of a [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html)!

The next example is going to go over how to implement a `@Singleton` decorator that is reusable.

The first thing we're going to do is use a Javascript [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) to create a unique key that represents the instance of whatever class we are converting to a singleton. We do this because otherwise, we have to worry about the possibility of overwriting a field or method name on the original class.

```typescript
export const SINGLETON_KEY = Symbol();
```

Next we define the type for a Singleton – a class that is the same as the original class, which also uses the `SINGLETON_KEY` to create a unique field that represents the instance.

```typescript
export type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
};
```

Finally, we implement a function that will act as the decorator itself. There's a lot going on here, but at its core this is a simple process.

 Note: You can read more about [decorators and their syntax here](https://www.typescriptlang.org/docs/handbook/decorators.html)

Our Singleton decorator function takes in a single parameter called `type`.  
`type` represents a class, before it has been initialize - a type indeed!

It then returns a new Javascript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) which we use to build a [construct trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct) - essentially we hijack the original constructor of `type` and replace it with our own implementation which will create the instance if it doesn't exist, or return the existing instance!

```typescript
export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
    new Proxy(type, {
        // this will hijack the constructor
        construct(target: Singleton<T>, argsList, newTarget) {
            // we should skip the proxy for children of our target class
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argsList, newTarget);
            }
            // if our target class does not have an instance, create it
            if (!target[SINGLETON_KEY]) {
                target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            // return the instance we created!
            return target[SINGLETON_KEY];
        }
    });
```

Put that all together in a file called Singleton.ts and this is what is should look like:

```typescript
export const SINGLETON_KEY = Symbol();

export type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
};

export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
    new Proxy(type, {
        // this will hijack the constructor
        construct(target: Singleton<T>, argsList, newTarget) {
            // we should skip the proxy for children of our target class
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argsList, newTarget);
            }
            // if our target class does not have an instance, create it
            if (!target[SINGLETON_KEY]) {
                target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            // return the instance we created!
            return target[SINGLETON_KEY];
        }
    });
```

Now we can use this decorator on our Store class and remove all of the Singleton specific code from it!

Note: You will need to enable the experimental decorator   
flags for typescript in order for this to work!

```typescript
// in tsconfig.json add the following
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
```

```typescript
import {Singleton} from './Singleton';

@Singleton
class Store {
    private data: {id: number}[];

    public add(item: {id: number}) {
        this.data.push(item);
    }

    public get(id: number) {
        return this.data.find((d) => d.id === id);
    }
}

const myStore = new Store();
myStore.add({id: 1});
myStore.add({id: 2});
myStore.add({id: 3});

const anotherStore = new Store();
anotherStore.get(2); // returns `{id: 2}`!
```

I don't know about you, but that's much more readable to me - and as a bonus, `@Singleton` is reusable across our entire codebase! We won't have to write Singleton specific logic in each class that needs to be a Singleton!

This is just one of many design patterns available to us today. If you found this article helpful, let me know in a comment or share it around!
