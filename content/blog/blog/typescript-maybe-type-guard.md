---
title: "Typescript 'Maybe' Type Guard"
date: "2019-08-30"
---

Pretend you're at your favorite coffee shop, and you order a cappuccino. The cashier places the order and disappears into the kitchen, only to return a few minutes later, empty-handed. “_I’m sorry,_” she says “_I couldn't get your drink_”

Are they out of coffee or milk? Is the espresso machine on fire? Did the barista die?!

There are two distinct error states here - one is "We don't have that" and the other is "Shit's on fire, yo"

How can we better represent these types of errors, and account for them with our code? Today I'll present some ideas for handling these with a Typescript type guard, drawing inspiration from some functional programming concepts, namely the `Maybe` monad.

Using a database request as an example, we can imagine three potential outcomes:

- We got the record we were looking for (success)
- We could not find the record we were looking for, or it does not exist (empty/missing)
- there was an error at the database layer (error/exception)

## Enter the Type Guard

Let's use type composition to implement a `MaybeCoffee` typeguard - this will give us an easy way to represent the above scenario.

First we will define our Coffee class

```typescript
class Coffee {
    public found: true = true; // the magic sauce
    public id: number;
    public size: number;
    public drinkName: 'cappuccino' | 'americano';
}
```

next we'll define a class to represent a 'no coffee' state

```typescript
class CoffeeNotFound {
    public found: false = false;
}
```

Finally, we can define a union of `Coffee` and `CoffeeNotFound`

```typescript
type MaybeCoffee = Coffee | CoffeeNotFound
```

  
In the service that is handling this imaginary database query, we would have specific logic to handle returning `new Coffee()` vs `new CoffeeNotFound()`.

```typescript
class BaristaService {
...
public async getCoffee(): Promise<MaybeCoffee> {
    try {
        const drink = await getCoffeeFromDatabase();
        if (drink) {
            return new Coffee(drink);
        } else {
            return new CoffeeNotFound();
        }
    } catch(err) {
        throw new Error('Something went wrong with the database!');
    }
}
...
}
```

Now inside our calling code we can reliably check for the existence of our drink!

```typescript
class Cashier {

@Inject
private baristaService: BaristaService;
...
private async orderCoffee() {
    const coffee = await this.baristaService.getCoffee();
    if (!coffee.found) {
        // handle no coffee case!
    }
    // you now know for sure that coffee exists!
}
...
}
```

_[Learn more about Decorators and dependency injection](https://trevoratlas.com/blog/typescript-dependency-injection/)_

So why do this? What's the real benefit?

The main point is that Typescript knows the only reliable intersection between `Coffee` and `CoffeeNotFound` is the found property, which will always be true for `Coffee` and false for `CoffeeNotFound`.

This forces you to check for the existence of Coffee before continuing, because otherwise you're talking about a different type!
