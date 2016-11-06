/**
 * A library for editing Final Fantasy VII game saves
 *
 * @author David Knoll <david@davidknoll.me.uk>
 * @file
 */

'use strict';

const enums = require('./enums');
const fftext = require('./fftext');
const structure = require('./structure');

function ff7lib(buf) {
  const myStructure = structure();
  if (buf) {
    myStructure._setBuff(buf);
  } else {
    myStructure.allocate();
  }
  return myStructure;
}

ff7lib.defftext = fftext.defftext;
ff7lib.enfftext = fftext.enfftext;

module.exports = ff7lib;
