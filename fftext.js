/**
 * Functions for encoding and decoding FF Text, which is
 * used to store strings in the English version of FFVII.
 *
 * @link http://wiki.qhimm.com/view/FF7/FF_Text
 */

'use strict';

const Struct = require('struct');
Struct.prototype.defftext = defftext;
Struct.prototype.enfftext = enfftext;

/**
 * Decode an 0xFF-terminated FF Text field
 *
 * Note that this is a naive implementation that does not
 * properly treat characters outside of 7-bit ASCII.
 *
 * "this" needs to be an array object as returned by struct's get(),
 * which is not iterable and is not an actual array.
 *
 * @returns {String}
 */
function defftext() {
	const result = [];
  for (let i = 0; i < this.length(); i++) {
    const cc = this.get(i);
    if (cc === 0xFF) break;
    result.push(String.fromCharCode(cc + 0x20));
  }
  return result.join('');
}

/**
 * Encode a string to 0xFF-terminated FF Text
 *
 * Note that this is a naive implementation that does not
 * properly treat characters outside of 7-bit ASCII.
 *
 * "this" needs to be an array object as returned by struct's get(),
 * which is not iterable and is not an actual array.
 *
 * @param {String} str
 */
function enfftext(str) {
  const result = str.split('').map(ch => ch.charCodeAt(0) - 0x20);
  for (let i = 0; i < this.length(); i++) {
    if (i >= result.length) {
      this.set(i, 0xFF);
    } else {
      this.set(i, result[i]);
    }
  }
}
