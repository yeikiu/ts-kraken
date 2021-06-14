<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

<h1 align="center">
  <br>
  <img src=".github/ts_kraken_logo.png" width="640px" alt="ts-kraken" />
</h1>

<h4 align="center">A versatile unofficial _ts-lib/node-repl-cli_ to operate against the <a href="https://kraken.com">Kraken Crypto Exchange</a></h4>
      
<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#updating">Updating</a> •
  <a href="#features">Features</a> •
  <a href="#binds">Binds</a> •
  <a href="#wiki">Wiki</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a>
</p>

---

## About
  
> **ts-kraken** is a **highly-typed** _Typescript Library_ to operate against the **[Kraken](https://kraken.com) Crypto Exchange** [REST](https://docs.kraken.com/rest/) and [WebSocket](https://docs.kraken.com/websockets/) APIs

> **ts-kraken** is also an **interactive** _node REPL-cli_ to operate via command-shell

![ts_kraken_demo](.github/ts_kraken_demo.gif)

## TLDR; Get started

## Launch the REPL directly on your terminal with `npx`:

> Quickest way to test it out! 🚀

````
npx ts-kraken
````

## Setup in a standalone directory and have fun with the REPL:

> Recommended if planning to use regularly.

````
git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i
````

You can create a `.env` filelike the following under project's root directory to reuse the keys:

````
KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
````

Check out the REPL's demo doc for some cool advanced request examples 👀
