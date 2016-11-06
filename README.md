ff7lib
======

A library for editing Final Fantasy VII game saves.
Bring back Aeris! Max out your gil!

Made using [information](http://wiki.qhimm.com/view/FF7/Savemap)
from the Qhimm wiki.

**Please note that this is still experimental and incomplete,
and does things like adding functions to the prototype of the `struct` library,
which it uses underneath.**

Reading some information:
```javascript
const fs = require('fs');
const FF7Lib = require('ff7lib');

const rawbuf = fs.readFileSync('save00.ff7');
const savefile = new FF7Lib(rawbuf);

const leader = savefile.getpath('saves.0.preview.name').defftext();
const location = savefile.getpath('saves.0.preview.location').defftext();
const gil = savefile.getpath('saves.0.preview.gil');

console.log(`Leader is ${leader}`);
console.log(`Location is ${location}`);
console.log(`You have ${gil} gil`);
```

Changing [FF-Text](http://wiki.qhimm.com/view/FF7/FF_Text) fields:
```javascript
savefile.getpath('saves.0.character-records.4.name').enfftext('Nanaki');
```

Changing numeric fields:
```javascript
savefile.setpath('saves.0.stock.gil', 9001);
```

Saving (please note, there is a checksum that needs to be recalculated,
which I don't do yet):
```javascript
fs.writeFileSync('save01.ff7', savefile.buffer());
```
