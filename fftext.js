/**
 * Functions for encoding and decoding FF Text, which is
 * used to store strings in the English version of FFVII.
 *
 * @link http://wiki.qhimm.com/view/FF7/FF_Text
 * @flow
 */

'use strict';

// Library imports
const Struct = require('struct');

// Mapping of printable FF-Text characters to UTF-8, according to Qhimm
const ffTextMap = [
/* eslint-disable */
// -0   -1   -2   -3   -4   -5   -6   -7   -8   -9   -A   -B   -C   -D   -E   -F
  ' ', '!', '"', '#', '$', '%', '&','\'', '(', ')', '*', '+', ',', '-', '.', '/', // 0-
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', // 1-
  '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', // 2-
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[','\\', ']', '^', '_', // 3-
  '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', // 4-
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~',  '', // 5-

  'Ä', 'Á', 'Ç', 'É', 'Ñ', 'Ö', 'Ü', 'á', 'à', 'â', 'ä', 'ã', 'å', 'ç', 'é', 'è', // 6-
  'ê', 'ë', 'í', 'ì', 'î', 'ï', 'ñ', 'ó', 'ò', 'ô', 'ö', 'õ', 'ú', 'ù', 'û', 'ü', // 7-
  '⌘', '°', '¢', '£', 'Ù', 'Û', '¶', 'ß', '®', '©', '™', '´', '¨', '≠', 'Æ', 'Ø', // 8-
  '∞', '±', '≤', '≥', '¥', 'µ', '∂', 'Σ', 'Π', 'π', '⌡', 'ª', 'º', 'Ω', 'æ', 'ø', // 9-
  '¿', '¡', '¬', '√', 'ƒ', '≈', '∆', '«', '»', '…',  '', 'À', 'Ã', 'Õ', 'Œ', 'œ', // A-
  '–', '—', '“', '”', '‘', '’', '÷', '◊', 'ÿ', 'Ÿ', '⁄', '¤', '‹', '›', 'ﬁ', 'ﬂ', // B-
  '■', '▪', '‚', '„', '‰', 'Â', 'Ê', 'Ë', 'Á', 'È', 'í', 'î', 'ï', 'ì', 'Ó', 'Ô', // C-
  ' ', 'Ò', 'Ù', 'Û',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '',  '', // D-
   '','\t', ',','."','..."','','\n',  '',  '',  '',  '',  '',  '',  '',  '',  '', // E-
   '',  '',  '',  '',  '',  '','〇', '△', '☐', '✕',  '',  '',  '',  '',  '',  '', // F-
/* eslint-enable */
];

/**
 * Decode an 0xFF-terminated FF Text field
 *
 * Non-printable characters will be ignored.
 *
 * "this" needs to be an array object as returned by struct's get(),
 * which is not iterable and is not an actual array.
 *
 * @returns {String} UTF-8
 */
function defftext() {
  const result = [];
  for (let i = 0; i < this.length(); i++) {
    const cc = this.get(i);
    if (cc === 0xFF) break;
    result.push(ffTextMap[cc]);
  }
  return result.join('');
}
Struct.prototype.defftext = defftext;

/**
 * Encode a string to 0xFF-terminated FF Text
 *
 * Characters not mapped in FF-Text will be ignored.
 *
 * "this" needs to be an array object as returned by struct's get(),
 * which is not iterable and is not an actual array.
 *
 * @param {String} str UTF-8
 */
function enfftext(str) {
  // Split the string into individual characters.
  // Find their FF-Text equivalents. Filter out any that don't have one.
  const result = str.split('')
    .map(ch => ffTextMap.indexOf(ch))
    .filter(cc => cc !== -1);

  // For the length of the FF-Text field, copy characters from the string,
  // and fill the rest of the space with 0xFF.
  for (let i = 0; i < this.length(); i++) {
    if (i >= result.length) {
      this.set(i, 0xFF);
    } else {
      this.set(i, result[i]);
    }
  }
}
Struct.prototype.enfftext = enfftext;
