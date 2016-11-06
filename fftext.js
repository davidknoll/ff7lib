/**
 * Functions for encoding and decoding FF Text, which is
 * used to store strings in the English version of FFVII.
 *
 * @link http://wiki.qhimm.com/view/FF7/FF_Text
 */

'use strict';

/**
 * Decode an 0xFF-terminated FF Text field
 *
 * Note that this is a naive implementation that does not
 * properly treat characters outside of 7-bit ASCII.
 *
 * @param   {String} fftext
 * @returns {String}
 */
function defftext(fftext) {
	const result = [];
  for (const ch of fftext) {
    const cc = ch.charCodeAt(0);
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
 * @param   {String} str
 * @returns {String}
 */
function enfftext(str) {
  const result = [];
  for (const ch of str) {
    const cc = ch.charCodeAt(0);
    result.push(String.fromCharCode(cc - 0x20));
  }
  result.push(String.fromCharCode(0xFF));
  return result.join('');
}

module.exports = { defftext, enfftext };
