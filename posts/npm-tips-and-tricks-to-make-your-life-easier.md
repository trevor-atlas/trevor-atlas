---
title: "NPM tips and tricks to make your life easier"
date: '2019-08-14'
tags:
  - javascript
  - node
  - npm
banner: /images/npm.jpg
bannerAlt: a cool keyboard
bannerCredit:
  Photo by [Paul Esch-Laurent](https://unsplash.com/@pinjasaur)
---

If you've been using npm and Node for any amount of time, it's likely you've grown tired of typing out `install` or `--save-dev` every time you want to add a package. This article will cover some quality of life tips and tricks to make using npm a breeze!

| Command/flag | Shortcut |
| --- | ----------- |
| `install` | `i` |
| `test` | `t` |
| `--save-dev` | `-D` |
| `--save` | `-s` |
| `--save-exact` | `-E` |
| `--global` | `-g` |
| `--version` | `-v` |
| `--help` | `-h` |
| `--silent, --loglevel silent` | `-s` |
| `--quiet, --loglevel warn` | `-q` |
| `--loglevel info` | `-d` |
| `--verbose --loglevel verbose` | `-dd` |

## Install multiple npm packages at once

Most people know this trick, but here it is!

```bash
npm i express typescript react
```

_NOTE: `--save` or `-S` are not required if you are adding dependencies in_ [_npm version 5 or above_](https://github.com/npm/npm/issues/5108)_._

```bash
npm i -D express typescript react
```

```json
// package.json
"devDependencies": {
    "express": "^x.x.x",
    "typescript": "^x.x.x",
    "react": "^x.x.x"
}
```

You can also install multiple packages that start with the same prefix using the following syntax

```bash
npm i react{-router-dom,-bootstrap,-redux}
```

## Install a package from a Github repository

Similarly to packages hosted by NPM, you can install packages directly from GitHub repositories.
NPM understands how a Github repo works and knows what to do if you only specify the username and repo.

```bash
npm i https://github.com/microsoft/TypeScript.git
npm i microsoft/TypeScript
```

You can even specify a branch name in this manner!

```bash
npm i microsoft/TypeScript#add-gdpr-annotations
```

## Open a package's home page

```bash
npm home packagename
```

The `home` command will open the homepage specified in a package's `package.json`.

if you run `npm home typescript` it will open the http://www.typescriptlang.org website.

This command can be run without having the package installed locally or globally, so it's a nice way to verify that the package you're trying to install is the one you think it is!

## Open a package’s GitHub repository

```
npm repo packagename
```

The `repo` command will open the Github repository of the package. This command is similar to the `home` command and doesn't require the package to be installed.

## Npm init Defaults

Tired of manually entering your information every time you type `npm init`? You can easily set some defaults using `npm config`

```bash
npm config set init.author.name yourname
npm config set init.author.email youremail
npm config set save-prefix="~"
```

The ~ prefix tells npm to only upgrade the minor version when you install something, so it's much less likely to have breaking changes.

## Check for outdated dependencies

```bash
npm outdated
```

The `outdated` command will check with the npm registry and compare package versions - if it finds any that are out-of-date locally it will print them in a list with the current installed version, the 'wanted' version (the version specified in your package.json) and the latest version published.

## List all installed packages

```bash
npm ls --depth 0
```

To list the globally-installed packages, run the same command with `-g` flag

```bash
npm ls -g --depth 0
```

## Run node modules outside of npm

Occasionally, we find ourselves in need of a tool or library installed via npm in some other application, such as a Dockerfile, CI configuration or a shell script.

The traditional way to run `node_modules` in this way, is to execute them directly via the `node_modules/.bin` folder. While this method does still work, there's now an easier way!

Enter npx – npx is another utility that is now included with npm by default! Using npx is simple:

```bash
npx packagename
```

this will run whatever package you passed it as if it were a script in package.json! Let's look at another example:

```bash
npm i rimraf -D    # install rimraf as a dev dependency
npx rimraf ./build # delete the build directory
```

Now you can easily run node scripts and tools from your CI system or other CLI scripts.

* * *

These are just some of the cool things you can do with npm. While this is not an exhaustive list of everything it can do, I hope it was helpful and makes your life easier in some small way!
