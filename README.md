<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

<h1 align="center">
  <br>
  <img src=".github/ts_kraken_logo.png" width="640px" alt="ts-ts_kraken_logo" />
</h1>

<h4 align="center">A versatile unofficial <i>ts-lib & node-repl-cli</i> to operate against the <a href="https://kraken.com">Kraken Crypto Exchange</a></h4>
<br />
<p align="center">
  <a href="#about">About</a> •
  <a href="#tldr-get-started">TLDR</a> •
  <a href="#installation">Installation</a> •
  <a href="#resources">Resources</a> •
  <a href="#upcoming-features">Upcoming</a>
</p>

<br /><br />

---

<br /><br />


## About
  
> **ts-kraken** is a **highly-typed** _Typescript Library_ to operate against the **[Kraken](https://kraken.com) Crypto Exchange** [REST](https://docs.kraken.com/rest/) and [WebSocket](https://docs.kraken.com/websockets/) APIs

> It also features an **interactive** _node REPL-cli_ to operate via command-shell 🤓

![ts_kraken_demo](.github/ts_kraken_demo.gif)

<br /><br />

---

<br /><br />


## TLDR; Get started
## Launch the REPL directly on your terminal with `npx`:

> Quickest way to test it out! 🚀 - _Unreleased,_ coming soon!

````
npx ts-kraken
````

<br /><br />

---

<br /><br />

## Installation
### Setup in a standalone directory and have fun with the REPL:

> Recommended if planning to use regularly

````
git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i
````

You can create a `.env` filelike the following under project's root directory to reuse the keys:

````
touch .env
````

````
# .env's file content holding your api/secret

KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
````

Check out the REPL's [demo doc](/TODO) for some cool advanced request examples 👀

<br /><br />

---

<br /><br />


### Setup as a library in your TypeScript/JS project:

> Get _IDE code-suggestions_ for any REST or WS request you need

````
cd dependant/project/path && npm i ts-kraken
````

<img src=".github/TODO.png" width="640px" alt="ts_kraken_ide" />

<br /><br />

---

<br /><br />


## Resources

* [Kraken REST API docs](https://docs.kraken.com/rest/)
* [Kraken WebSockets API docs](https://docs.kraken.com/websockets/)
* [jq Manual](https://stedolan.github.io/jq/manual)

<br /><br /><br />

---

<br /><br />


## Upcoming features

- Option to record all requests and incoming streams to json files
- Wrapper-REPL-Command prompting user for request params (with pre-flight validations) for each endpoint/subscription
