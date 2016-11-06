/**
 * A library for editing Final Fantasy VII game saves
 *
 * @author David Knoll <david@davidknoll.me.uk>
 * @file
 */

'use strict';

// Project imports
const enums = require('./enums');
const fftext = require('./fftext');
const structure = require('./structure');

/**
 * Constructor for an FF7Lib save file object
 *
 * @param   {Buffer} Raw contents of file being loaded, optional
 * @returns {FF7Lib}
 */
function FF7Lib(buf) {
  const myStructure = structure();
  if (buf) {
    myStructure._setBuff(buf);
  } else {
    myStructure.allocate();
  }
  return myStructure;
}

FF7Lib.enum = enums;
module.exports = FF7Lib;
