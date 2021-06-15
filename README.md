<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

<h1 align="center">
  <br>
  <img src=".github/ts_kraken_logo.png" width="640px" alt="ts-ts_kraken_logo" />
</h1>

<br /><br />

<h4 align="center">A versatile unofficial <i>ts-lib & node-repl-cli</i> to operate against the <a href="https://kraken.com">Kraken Crypto Exchange</a></h4>
<br />
<p align="center">
  <a href="#about">About</a> •
  <a href="#tldr-get-started">TLDR</a> •
  <a href="#installation">Installation</a> •
  <a href="#resources">Resources</a> •
  <a href="#upcoming-features">Upcoming</a>
</p>

<br />

---

<br />


## About
  
> **ts-kraken** is a **highly-typed** _Typescript Library_ to operate against the **[Kraken](https://kraken.com) Crypto Exchange** [REST](https://docs.kraken.com/rest/) and [WebSocket](https://docs.kraken.com/websockets/) APIs

> It also features an **interactive** _node REPL-cli_ to operate via command-shell 🤓

![ts_kraken_demo](.github/ts_kraken_demo.gif)

<br />

---

<br />


## TLDR; Get started
## Launch the REPL directly on your terminal with `npx`:

> Quickest way to test it out! 🚀 - _Unreleased,_ coming soon!

````
npx ts-kraken
````

<br /><br />

### REPL commands

<table>
  <thead>
  <hr><td>Command</td><td>Arguments</td><td>Usage demo</td></hr>
  </thead>
  <tbody>
    <tr>
      <td><strong>.help</strong></td><td> - </td><td><pre>.help</pre></td>
    </tr>
    <tr>
      <td><strong>.setkeys</strong></td><td> - </td><td><pre>.setkeys</pre></td>
      </tr>
    <tr>
      <td><strong>.showkeys</strong></td><td> - </td><td><pre>.showkeys</pre></td>
    </tr>
    <tr>
      <td><strong>.get</strong></td><td>PublicEndpoint <i>params? jqFilter?</i></td><td><pre>.get Time .rfc1123</pre></td>
    </tr>
    <tr>
      <td><strong>.post</strong></td><td>PrivateEndpoint <i>params? jqFilter?</i></td><td><pre>.post OpenOrders .open as $open|.open|keys|map($open[.].descr) -table</pre></td>
    </tr>
    <tr>
      <td><strong>.pubsub</strong></td><td>PublicChannel <i>params? jqFilter?</i></td><td><pre>.pubsub ticker pair[]=XBT/USD&pair[]=ETH/USD . as $base|{pair:.[3],price:$base[1].c[0]}</pre></td>
    </tr>
    <tr>
      <td><strong>.privsub</strong></td><td>PrivateChannel <i>params? jqFilter?</i></td><td><pre>.privsub openOrders .[0]|map(. as $order|keys[0]|$order[.])</pre></td>
    </tr>
    <tr>
      <td><strong>.unsuball</strong></td><td> - </td><td><pre>.unsuball</pre></td>
    </tr>
  </tbody>
</table>

<br />

---

<br />

## Installation
### Setup in a standalone directory and have fun with the REPL:

> Recommended if planning to use regularly

````
git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i
````

You can create a `.env` file like the following under project's root directory to reuse the keys:

````
touch .env
````

````
# .env's file content holding your api/secret

KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
````

Check out the REPL's [demo doc](/TODO) for some cool advanced request examples 👀

<br />

---

<br />


### Setup as a library in your TypeScript/JS project:

> Get _IDE code-suggestions_ for any REST or WS request you need

````
cd dependant/project/path && npm i ts-kraken
````

<img src=".github/TODO.png" width="640px" alt="ts_kraken_ide" />

<br />

---

<br />


## Resources

* [Kraken REST API docs](https://docs.kraken.com/rest/)
* [Kraken WebSockets API docs](https://docs.kraken.com/websockets/)
* [jq Manual](https://stedolan.github.io/jq/manual)

<br />

---

<br />


## Upcoming features

- Option to record all requests and incoming streams to json files
- Wrapper-REPL-Command prompting user for request params (with pre-flight validations) for each endpoint/subscription

<br />

---

<br />
