---
title: Shell Utilities to Maximize Productivity
date: 2019-08-27
banner: /images/contrast-terminal.jpg
tags:
  - shell
  - productivity
---

If you are a developer, you probably spend a decent chunk of time interacting with a terminal Shell. Today We'll look at 6 different tools that will make your work that much easier!

## 1. Ripgrep

{% oglink url="https://github.com/BurntSushi/ripgrep" /%}

You've probably used grep before – it's one of the most ubiquitous tools in any devs toolbelt, and it gets the job done.

But what if there was something even better? Ripgrep is purpose-built for searching over large amounts of files recursively. It knows how to read your .gitignore file and automatically skips hidden files/directories as well as binary files.

Ripgrep is supported on all major operating systems! There are binaries available for every release. it's also 2-5 times faster than other searching tools – they have benchmarks listed on [their github repo](https://github.com/BurntSushi/ripgrep).

Enough about Ripgrep, let's give it a whirl:

```bash
# Recursively search the current directory for a regex pattern:
rg pattern

# Search for pattern including all .gitignored and hidden files:
rg -uu pattern

# Search for a pattern only in a certain filetype (e.g., html, css, etc.):
rg -t filetype pattern

# Search for a pattern only in a subset of directories:
rg pattern set_of_subdirs

# Search for a pattern in files matching a glob (e.g., `README.*`):
rg pattern -g glob

# Only list matched files -- useful when piping to other commands:
rg --files-with-matches pattern

# Show lines that do not match the given pattern:
rg --invert-match pattern
```

## 2. Bat

{% oglink url="https://github.com/sharkdp/bat" /%}

A `cat` clone with syntax highlighting and Git integration.

`bat` supports syntax highlighting for a large number of programming and markup languages such as markdown
`bat` is  `git` aware, and can show modified lines as well

![](/assets/2019/08/Screenshot-2019-08-26-19.28.27-1024x256.png)

Bat also has a super nice feature where if the output is too large for the screen, it will smartly pipe its output to your default pager (probably `less` unless you changed this yourself)

```bash
# Print the contents of a file to the standard output:
bat file

# Concatenate several files into the target file:
bat file1 file2 > target_file

# Append several files into the target file:
bat file1 file2 >> target_file

# Number all output lines:
bat -n file

# Syntax highlight a json file:
bat --language json file.json

# Display all supported languages:
bat --list-languages
```

## 3. Exa

[Website](https://the.exa.website/)

`exa` is a modern replacement for the command-line program `ls` that ships with \*nix operating systems.

`exa` has more features and better defaults – It uses color to distinguish files and metadata. It understands symlinks, extended attributes, and Git. And it’s small, fast, and contained within a single binary.

![](/assets/2019/08/Screenshot-2019-08-27-17.28.15-1024x413.png)

`exa -glam --group-directories-first`

exa is a nice drop-in replacement for the default ls command. I've set an alias for it

```bash
alias ls="exa -glam --group-directories-first"
```

## 4. JQ

{% oglink url="https://github.com/stedolan/jq" /%}

jq is like `sed` for JSON data - you can use it to slice, filter, map and transform structured data with the same ease that `sed`, `awk`, `grep` and friends let you play with text in the shell.

```bash
# list all of the commands under the 'scripts' key in package.json
jq '.scripts' package.json

# Output a JSON file, in pretty-print format:
jq . file.json

# Output all elements from arrays (or all key-value pairs from objects) in a JSON file:
jq '.[]' file.json

# Read JSON objects from a file into an array, and output it (inverse of `jq .[]`):
jq --slurp . file.json

# Output the first element in a JSON file:
jq '.[0]' file.json

# Output the value of a given key of the first element in a JSON text from `stdin`:
cat file.json | jq '.[0].key_name'

# Output the value of a given key of each element in a JSON text from `stdin`:
cat file.json | jq 'map(.key_name)'

# Combine multiple filters:
cat file.json | jq 'unique | sort | reverse'

# Output the value of a given key to a string (and disable JSON output):
cat file.json | jq --raw-output '"some text: \(.key_name)"'
```

## 5. FZF

{% oglink url="https://github.com/junegunn/fzf" /%}

fzf is a general-purpose fuzzy finder for your terminal shell.

It can be used with any list; files, command history, processes, hostnames, bookmarks, git commits, etc.

FZF is Portable and has no dependencies, is Blazingly fast and provides a flexible layout.
It also has some really great features out of the box such as Vim/Neovim plugins, key bindings and fuzzy auto-complete.

By default FZF runs in 'full-screen' mode, but you can pass flags to resize and change the layout

```bash
# handy function to search for a file, with a nice preview window!
select_file() {
  given_file="$1"
  fzf --preview="cat {}" --preview-window=right:70%:wrap --query="$given_file"
}

# open a fuzzy searched file with vim
vim $(select_file)

# Start finder on all files from arbitrary locations:
find path/to/search -type f | fzf

# Start finder on running processes:
ps aux | fzf

# Select multiple files with `Shift + Tab` and write to a file:
find path/to/search_files -type f | fzf -m > filename

# Start finder with a given query:
fzf -q "query"

# Start finder on entries that start with core and end with either go, rb, or py:
fzf -q "^core go$ | rb$ | py$"

# Start finder on entries that not match pyc and match exactly travis:
fzf -q "!pyc 'travis"

```

Hopefully you find some of these shell tools as useful as I do, please leave a comment and share the article if you found it useful!
