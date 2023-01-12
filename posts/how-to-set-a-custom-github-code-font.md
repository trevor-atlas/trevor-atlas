---
title: How to set a custom Github code font
date: 2023-01-02
description:
  Learn how to set your own font for the github UI with the Refined Github
  Chrome extension
tags:
  - github
meta:
  keywords:
    - github
    - chrome
    - extension
banner: /images/unsplash-XJXWbfSo2f0.png
bannerAlt: turned on gray laptop computer
bannerCredit:
  Photo by [Luca
  Bravo](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwzOTI4NjJ8MHwxfHNlYXJjaHwxfHxob3ctdG8tc2V0LWEtY3VzdG9tLWdpdGh1Yi1jb2RlLWZvbnR8ZW58MHx8fHwxNjcyNzE0NTM1&ixlib=rb-4.0.3)
---

Something I didn't think of until recently despite spending large amounts of time setting my editor up just how I like, is that I don't love Github's default font.
So I set it to my favorite coding font, [Comic Code.](https://tosche.net/fonts/comic-code).

![Comic Code](/images/comic-code-github.png)

## Prerequisites
Install [Refined GitHub](https://github.com/refined-github/refined-github#install).
It's a Chrome extension that adds a bunch of useful features to GitHub.

## Setup
Open Refined GitHub's settings and paste in this CSS:

```css
/* optional, you can also just use system fonts. */
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.react-code-text, .react-code-lines, pre, code, .blob-code, .blob-code-marker {
  font-family: 'Comic Code Ligatures', 'Fira Code', monospace !important;
}
```

You can change this to any font you'd like using [Google Fonts](https://fonts.google.com) or another font provider of your choice.


## Alternatives
If you're using the [Arc Browser](https://arc.net/) you can create a 'Boost' that does this too.
