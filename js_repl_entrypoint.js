#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register();
require('dotenv').config();
require('./src/ts-kraken-repl/repl_cli.ts');
