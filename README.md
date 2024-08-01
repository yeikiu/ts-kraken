<img src=".ci_badges/npm-version-badge.svg" /> <img src=".ci_badges/npm-dependencies-badge.svg" /> <img src=".ci_badges/npm-devdependencies-badge.svg" />

<h1 align="center">
  <br>
  <img src=".github/ts_kraken_logo.png" width="640px" alt="ts-ts_kraken_logo" />
</h1>

<br /><br />

<h4 align="center">A <i>strongly typed library</i> to operate with the <a href="https://kraken.com">Kraken Crypto Exchange</a></h4>
<br />
<p align="center">
  <a href="#quick-start">Quick-Start</a> •
  <a href="#about-this-project">About</a> •
  <a href="#tldr-get-started">Use the library</a> •
  <a href="#installation">Use the REPL-cli</a> •
  <a href="#resources">Resources</a> •
  <a href="#acknowledgments">Acknowledgments</a>
</p>

## Quick-Start

1.- Add the dependency to your js/ts project

- `npm i ts-kraken`

2.- _Optionally_ add `KRAKEN_API_KEY` and `KRAKEN_API_SECRET` to your .env (only if you intend to use private methods, i.e. add orders or fetch balances)

3.- Find examples for the methods you need [in the documentation]()


## About this project
  
> **ts-kraken** is a **strongly-typed** _Typescript Library_ 

- Easily operate with Kraken [REST](https://docs.kraken.com/api/docs/category/rest-api/market-data) and [WebSocketV2](https://docs.kraken.com/websockets/) APIs

- Use [`ts-kraken` helper methods](src/api/rest/private/helpers) to build your own trading bots

- Subscribe to custom streams of data combining the RxJS Observables returned by the WebsocketV2 methods

- Get advantage of modern IDEs Typescript integrations (code autocompletion, suggested imports, etc.)


> It also features an **interactive _node REPL-cli_** to operate via command-shell or leave a socket open printing all updates to the terminal with a nice [jq](https://jqlang.github.io/jq/) format 🤓

- Kraken UI down durig high traffic or maintenance? You can still use the APIs!

- Use any of the available REST methods directly from your terminal

- Print nicely formatted data updates coming directly from WebsocketV2 subscriptions

<br />
---
<br />

## Use the library in your TypeScript/JS project:

> Get _IDE code-suggestions_ for any REST or WS request you need

````
cd dependant/project/path && npm i ts-kraken
````

<img src=".github/ts_kraken_ide.gif" width="640px" alt="ts_kraken_ide" />


## Demo playground snippet

<!-- TODO: link -->

---
<br />


## Use the REPL-cli

> You can create a `.env` file that the repl-cli will try to read from `cwd` (current working directory):

- `touch .env`

Use the following format:

```
# .env's file content holding your API key/secret

KRAKEN_API_KEY=yourApiKey
KRAKEN_API_SECRET=yourApiSecret
```

---

### Launch the REPL directly on your terminal with `npx`:

> Quickest way to test it! 🚀 (will automatically download the library as a global npm package)

`npx ts-kraken`

### Invoke the repl-cli after installing the dependency to your project's `node_modules`:

`npx kraken-repl`

### Set it up in a standalone directory:

> Recommended if planning to use regularly

````
git clone https://github.com/yeikiu/ts-kraken && cd ts-kraken && npm i

npm run kraken-repl
````

![ts_kraken_demo](.github/ts_kraken_demo.gif)


<br />
---
<br />

### REPL commands

<!-- TODO: link -->


<br />
---
<br />


## Resources

* [Kraken REST API docs](https://docs.kraken.com/api/docs/rest-api/add-order)
* [Kraken WebSocketsV2 API docs](https://docs.kraken.com/api/docs/websocket-v2/add_order)
* [jq Manual](https://stedolan.github.io/jq/manual)
* [jq Playground](https://jqkungfu.com/)

<br />
---
<br />


## Acknowledgments 

- 
