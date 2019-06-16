---
layout: post
title:  "Integrating VelocityJS"
date:   2014-10-05 2:30:00
categories: web javascript ui/ux design
---

Seeing recent trends with animation and how they increase overall esthetic and engagement is really cool. I love that the web is finally reaching a stage where animations and content live together natively.

That said, I am not a huge fan of the work required to write large animation sequences in Sass/css.
Hover and other simple effects are easy and performant to implement and use, but everything else gets complex and unweildy very quickly.

To solve this I've been using [Julian Shapiro's](https://twitter.com/Shapiro) [VelocityJS](http://julian.com/research/velocity/) in all of my recent projects.

One of the really great features of Velocity is that it is decoupled from other libraries, so you can use it with or without jQuery.(I used [Zepto](http://zeptojs.com/) on this site.) Having that much animation power in such a simple drop in syntax is really nice.

Since there are plenty of demos using VelocityJS around the web (many of them conveniently on Julian's [Codepen](http://codepen.io/julianshapiro/)) I am not going to go over demos. I will cover some use cases I've run into and places I would recommend avoiding use of Velocity in favor of sass/css.


### Where I find Velocity particularly useful:

---

* Page load animations (slideDownBigIn, fadeIn etc...) Just don't have animations that are long enough to slow down the apparent speed of your page.
+ Task completion such as submitting a form, placing an order or clicking a call to action.
+ Complex multi part animations (Multiple elements doing several things at specific intervals)
* Callouts and items that will conditionally need to be animated (missed form fields, important information/links etc...)


### Where I find velocity is unnecessary:

---


* Hover animations. Generally are easy to accomplish in css and shouldn't be overly complex anyway.
* Animations that happen continually. Unless they are complex, css is probably better suited to this.

I try to keep animations under 400ms(ideally <300ms) from start to finish. Go over that and you start to adversly affect user experience and it becomes an annoyance rather than a cool feature.

Before you animate something, really consider if it's actually adding anything or if you're just doing it because you can. Weigh the possible benefits vs the potential hits to performance, whether or not it's going to be "spammy" (happening very frequently and becoming an annoyance) or any other negative factors. The golden rule here is usually "Less is more".
