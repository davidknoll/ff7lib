/**
 * A library for editing Final Fantasy VII game saves
 *
 * @author David Knoll <david@davidknoll.me.uk>
 * @file
 * @flow
 */

'use strict';

// Library imports
const Struct = require('struct');
// Project imports
const enums = require('./enums');
const structure = require('./structure');
require('./fftext');

/**
 * Constructor for an FF7Lib save file object
 *
 * @param   {Buffer} buf Raw contents of file being loaded, optional
 * @returns {FF7Lib}
 */
function FF7Lib(buf /* :?Buffer*/) {
  const myStructure = structure();
  if (buf) {
    myStructure._setBuff(buf);
  } else {
    myStructure.allocate();
  }
  return myStructure;
}

/**
 * Allows a structure member to be retrieved by one text string as a path
 *
 * @param   {String} prop Dot-separated path to some property
 * @returns {mixed}       Value of that property, which may be another Struct
 */
function getpath(prop) {
  const elements = prop.split('.');
  let current = this;
  elements.forEach((element) => {
    // $FlowIssue https://github.com/facebook/flow/issues/1234
    current = current.get(element);
  });
  return current;
}
Struct.prototype.getpath = getpath;

/**
 * Allows a structure member to be set by one text string as a path
 *
 * @param {String} prop Dot-separated path to some property
 * @param {mixed}  data New value of that property
 */
function setpath(prop, data) {
  const elements = prop.split('.');
  const last = elements.pop();
  const parent = getpath(elements.join('.'));
  // $FlowIssue https://github.com/facebook/flow/issues/1234
  parent.set(last, data);
}
Struct.prototype.setpath = setpath;

FF7Lib.enum = enums;
module.exports = FF7Lib;
