#!/usr/bin/node
/**
 * A quick test of the ff7lib module
 */

'use strict';

const fs = require('fs');
const ff7lib = require('./ff7lib');

const rawbuf = fs.readFileSync(process.argv[2]);
const savefile = new ff7lib(rawbuf);

const zz = savefile.get('saves').get(0).get('preview').get('location').defftext();
console.log(zz);

const blank = new ff7lib();
console.log(blank.buffer().length);
