#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
require('ts-node').register();
require('./ts-kraken-repl/repl_cli.ts');
