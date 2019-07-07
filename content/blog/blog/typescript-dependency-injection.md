---
title: "Typescipt Dependency Injection"
date: 2019-07-07 16:56:34
tags: typescript
---

[Full working code examples are available on github](https://github.com/trevor-atlas/Typescript-Inject)


Sometimes our classes rely on other services or values that need to be initialized on their own before our class interacts with it, or we want to use a mock implementation of a service or value for testing purposes. A common solution to this problem is dependency injection through a factory. (Sometimes called IOC or Inversion of Control). Today, I'll show you how to use typescript decorators along with a lazy factory to inject dependencies into your classes at runtime. This makes it easy to test your code and have precise control over runtime dependencies without having to spread that logic out across many different places.

To start things off, lets make sure our `tsconfig.json` is set up and ready to work with decorators by enabling two optional flags:

```json
...
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
...
```

Now in our source code we can set up a lazy factory. This class will be responsible for creating instances of whatever we want and can be as flexible as we need! We'll use the singleton pattern to ensure there's only ever one instance of the factory at a time to avoid duplication.

`di/LazyFactory.ts`
```ts
export class LazyFactory {

    // this is where we store our singleton reference to this class instance
    private static instance: LazyFactory;

    // hide constructor, must use getInstance
    private constructor() {}

    // if there is not yet an instance of this class, create it. Otherwise return that instance
    public static getInstance() {
        if (!LazyFactory.instance) {
            LazyFactory.instance = new LazyFactory();
        }
        return LazyFactory.instance;
    }
}
```

That's all we need to get rolling! now we can add methods to the `LazyFactory` to return whatever we need at runtime. Lets add one now to return an instance of `MyService`.
One of the benefits of our lazy factory is we can easily swap out implementations of what it returns for mocking purposes. We'll use an interface to define `MyService`'s public methods and fields, then we can implement that interface with a mock and real implementation. Our `LazyFactory` can then determine which version of the service to give us dynamically!

First we'll define the `IMyservice` interface like so:

`services/IMyService.ts`
```ts
export interface IMyService {
    sayHello(name: string): void;
}
```

Now we can define a mock and real implementation of the service using this interface:

`services/MyService.ts`
```ts
export class MyService implements IMyService {
    public sayHello(name: string): void {
       console.log(`Hello from the real service, ${name}!`)e
    }
}
```

`services/MockMyService.ts`
```ts
export class MockMyService implements IMyService {
    public sayHello(name: string): void {
        console.log(`Hello from the mock service, ${name}!`))
    }
}
```

Back in our `LazyFactory` we can create a method to return the correct implementation of `IMyService` - in this case I'll use the current environment to determine which instance to return:

`di/LazyFactory.ts`
```ts
export class LazyFactory {
    ...
    public myService() {
        if (process.env.ENV === 'production') {
            return new (require('../service/MyService')).MyService();
        }
        return new (require('../service/MockMyService')).MockMyService();
    }
}
```

> NOTE: You might be wondering why we're using this odd require syntax - it's not always necessary but I've seen some strange behaviour pop up when using this factory with some webpack configurations. it might not be necessary but your mileage may vary!

Phew! That's a lot - but we're almost done! The last thing we need to do is actually use our `LazyFactory`!

for this example, we'll be working in `app.ts` which has need of our `MyService`:

`app.ts`
```ts
import {LazyFactory} from './LazyFactory';

class App {
    private myService: IMyService;

    constructor() {
        this.myService = LazyFactory.getInstance().myService();
    }
    
    public main() {
        this.myService.sayHello('internet');
    }
}

new App().main();
```

and we're done! `LazyFactory` will look up the correct version of our `MyService` and return it. This makes testing code in isolation much easier to do since you can keep the mock versions of your services dumb.

You might be wondering about those decorator options we set up earlier, and I've not forgotten that - I just wanted to illustrate that this is completely possible to achieve without using decorators.

Now we'll define an `@Inject` typescript decorator that will handle the construction and assignment in `App` for us!

The code for `@Inject` looks like this:

`decorators/Inject.ts`
```ts
import {LazyFactory} from '../di/LazyFactory';

export const Inject = (target: any, key: string) => {
    let val = target[key]

    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: () => {
                // an ugly cast :(
                // if you know a good way to do this without converting LazyFactory to an object literal please let me know!
                const concrete = (LazyFactory.getInstance() as any)[key];
                if (concrete) {
                    val = concrete();
                }
                return val;
            },
            enumerable: true,
            configurable: true
        });
    }
};
```

What this does is look for `key` in `target` - `target` will be whatever class we use the `@Inject` decorator in. if it finds that key in `target` and our `LazyFactory` has a matching key, it will replace `key` with the match found in the `LazyFactory`. Sounds like a lot, but It's fairly simple, let's write some code that uses this decorator to get a better understanding of what's going on.

back in `app.ts`:

```ts
import {Inject} from './Inject';

class App { // <-- App will be the `target` referenced in the Inject function
    @Inject
    private myService!: IMyService; // <-- this field `myService` will be the key

    constructor() { /*...this is empty now! */ }

    public main() {
        this.myService.sayHello('internet');
    }
}

new App().main();
```

We can now add as many other services to our `LazyFactory` as we want, and `@Inject` them! As long as the method name in `LazyFactory` matches the field name where it's being injected it will work no problem.

But wait! There's more!

`LazyFactory` doesn't actually care what we return from any method - this is uper useful because it let's us swap out any kind of data we want. I've used it to return a `baseURL` that differs locally vs in production:

```ts
export class LazyFactory {
    ...
    public baseURL() {
        if (process.env.ENV === 'production') {
            return 'https://prod.myAPI.com';
        }
        return 'https://stage.myAPI.com';
    }
}
```

now back in `RealMyService` we can inject this baseURL as well!

```ts
export class RealMyService implements IMyService {

    @Inject
    private baseURL: string; // <-- this will change dynamically if we are running locally or in production! 

    public sayHello(name: string): void {
        console.log(`Hello from the real service, ${name}!`);
        console.log('baseURL is ', this.baseURL);
    }
}
```

[Full working code examples are available on github](https://github.com/trevor-atlas/Typescript-Inject)

I hope this has been a useful explanation of some of the benefits of dependency injection. While this method is not perfect, it is very flexible and lets you fine tune its behaviour as much as you want/need. 
