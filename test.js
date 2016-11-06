#!/usr/bin/node
/**
 * A quick test of the ff7lib module
 */

'use strict';

// Builtin imports
const fs = require('fs');
// Project imports
const FF7Lib = require('./ff7lib');

// Load a file
const rawbuf = fs.readFileSync(process.argv[2]);
const savefile = new FF7Lib(rawbuf);

// Look at some details
const leader = savefile.getpath('saves.0.preview.name').defftext();
const location = savefile.getpath('saves.0.preview.location').defftext();
const gil = savefile.getpath('saves.0.preview.gil');

console.log(`Leader is ${leader}`);
console.log(`Location is ${location}`);
console.log(`You have ${gil} gil`);

const party = savefile.getpath('saves.0.party-members');
console.log('In party:');
for (let i = 0; i < party.length(); i++) {
  const orig = FF7Lib.enum.character[party.get(i)];
  const chosen = savefile
    .getpath('saves.0.character-records')
    .get(party.get(i)).get('name').defftext();
  console.log(`Original: ${orig} Chosen: ${chosen}`);
}

const save0 = savefile.getpath('saves.0');
const oldsum = save0.get('checksum').toString(16);
save0.checksum();
const newsum = save0.get('checksum').toString(16);
console.log(`Orig sum: ${oldsum} Calc sum: ${newsum}`);

savefile.setpath('saves.0.preview.gil', 9001);
