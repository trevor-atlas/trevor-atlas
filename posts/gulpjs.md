---
title:  GulpJS
date: 2014-11-06
description: Gulping up our build system
tags:
  - javascript
meta:
  keywords:
    - gulpjs
    - CI/CD
    - javascript
banner: /images/gulp.jpg
bannerAlt: A tiny fish
bannerCredit:
  Photo by [yu tang
  on unsplash](https://unsplash.com/@tangyu)
---

Working on websites regularly leaves you needing certain things automated from time to time. Scripts minified and concatenated, Scss compiled autoprefixed and minified, code linted and built for production.

Our team at [The Wired Mouse](http://www.thewiredmouse.com/) had been using the default tools included with the [Omega 4](https://www.drupal.org/project/omega) starter theme. While it does get the job done, much of it is extremely slow and cumbersome when compared to the task runners of today, namely [GulpJS](http://gulpjs.com/). Gulp is great because you can write a simple package.json to cover all of your dependencies, and all of your tasks are written in simple Javascript.

---

After several months lamenting over the sad state of our build system I was finally able to take some time and get a basic Gulpfile set up.
In that short amount of time I was able to completely remove our dependency on [Compass](http://compass-style.org/), have all of our scripts concatenated, tested and minified into one master file and set up a watch task to recompile everything whenever a change is detected.

I am hoping to add [Browsersync](http://www.browsersync.io/) soon and [Gulp-sass](https://github.com/dlmanning/gulp-sass) when [LibSass](http://libsass.org/) reaches feature parity with the Ruby based Sass branch.
