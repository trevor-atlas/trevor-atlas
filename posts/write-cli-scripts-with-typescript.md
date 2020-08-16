---
title: "Write CLI scripts with Typescript"
date: '2019-08-17'
---

At some point in your career, it's likely you'll need to write scripts for the command line – there are cases where it makes sense to use vanilla bash scripting for this and that will usually work just fine for simple tasks like renaming things and deleting folders.

If you're anything like me though, it's much more enjoyable and productive to write these tools in a familiar language like Javascript, or even better – Typescript.

You get all the niceties of a modern language without any of the weird gotchas of bash and terminal syntax/behaviour.

In this article I'll cover a simple method for writing command line scripts in Typescript.

So! First things first. we need to create a directory where our scripts will live.

If you're on a mac or linux machine, I recommend creating a directory in your `home` folder `~` simply called `scripts`.

Within this folder we'll create a file called `hello-world.ts` and globally install our 2 required dependencies (If you haven’t already, download and install [node](https://nodejs.org/), but you probably knew that!)

```bash
mkdir ~/scripts && cd ~/scripts
npm i -g typescript ts-node
tsc --init
touch hello-world.ts
```

[Learn about the handy npm shortcuts above](https://codinal.co/npm-tips-and-tricks-to-make-your-life-easier/)

Note: If you know of a clean way to do this without  
globally installing ts-node and typescript, I'd love to hear about it!

Now we can place the following code in our `hello-world.ts` file

```typescript
#!/bin/sh 
":" //#; exec /usr/bin/env ts-node -P ~/scripts/tsconfig.json "$0" "$@"

console.log('Hello, World!');
```

Credit to [Sam over at sambal.org for this clever shebang trick](http://sambal.org/2014/02/passing-options-node-shebang-line/)

Finally, we need to make this file executable with `chmod`

```bash
chmod +x hello-world.ts
```

And now we can run it!

```bash
./hello-world.ts
Hello, World!
```

Note: You may see an error from ts-node about an unrecognized  
option 'esModuleInterop' – if this happens to you, you can simply  
remove that line from `~/scripts/tsconfig.json`

* * *

So far we've created our scripts directory where our scripts will live, installed the required dependencies to run them and set up a simple script to get us started.

Next we'll do some housekeeping to make our lives easier as our library of scripts grows over time.

One of the first things I do when I write a new script is create an alias to run it – I'll assume we're all running bash, but if you're using zsh or some other shell the steps here will be very similar.

First we'll edit our .bashrc to add an alias for our new script

```bash
echo "alias hello_world='~/scripts/hello-world.ts'" >> ~/.bashrc
source ~/.bashrc
```

Now we can run `hello_world` from anywhere on our machine and get the same script!

```bash
cd some/other/directory
hello_world
Hello, World!
```

## More advanced scripts

So we've created a simple script for outputting to the console, what if we want something a little more useful?

Let's create a script that prints out the 'scripts' portion of the package.json for whatever directory we're in. This can be useful if you're not sure what package scripts are available for any given project.

First we create our script file – I'll call it `list-package-scripts.ts`

Within `list-package-scripts.ts` I'll add the following code:

```typescript
#!/bin/sh 
":" //#; exec /usr/bin/env ts-node -P ~/scripts/tsconfig.json "$0" "$@"

import { readFile } from 'fs';

readFile(`${process.cwd()}/package.json`, (err, data) => {
    if (err) {
        throw err;
    }
    const parsed = JSON.parse(data.toString('utf-8'));
    console.log(parsed.scripts);
});

```

Now we need to make this script executable!

```bash
chmod +x list-package-scripts.ts
```

now we can run this command in any node project and see what npm scripts are available to us:

```bash
cd some/other/node/project
~/scripts/list-package-scripts.ts
# example output, will be different for every project!
{ start: 'npm run watch',
  'build:ts': 'tsc',
  'watch:ts': 'tsc --watch',
  watch: 'npm run clean && npm run build:ts & npm run watch:ts & gulp watch & wait',
  test: 'gulp test' }

```

Hopefully this article provides a good jumping off point for your own scripts!

Please leave a comment or share the article if you found this useful – happy coding!
