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
const leader = savefile
  .get('saves').get(0).get('preview').get('name')
  .defftext();
const location = savefile
  .get('saves').get(0).get('preview').get('location')
  .defftext();
const gil = savefile
  .get('saves').get(0).get('preview').get('gil');

console.log(`Leader is ${leader}`);
console.log(`Location is ${location}`);
console.log(`You have ${gil} gil`);

const party = savefile.get('saves').get(0).get('party-members');
console.log('In party:');
for (let i = 0; i < party.length(); i++) {
  const orig = FF7Lib.enum.character[party.get(i)];
  const chosen = savefile
    .get('saves').get(0).get('character-records')
    .get(party.get(i)).get('name').defftext();
  console.log(`Original: ${orig} Chosen: ${chosen}`);
}
