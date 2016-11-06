/**
 * Definitions of structures in the .ff7 file format.
 *
 * @flow
 */

'use strict';

// Library imports
const struct = require('struct');

/**
 * Construct a struct representing an FF7 save file
 *
 * @returns {struct}
 */
function build() {
  // Details shown in the load/save screen, no effect in-game
  const preview = struct()
    .word8('level')
    .array('portraits', 3, 'word8')
    .array('name', 16, 'word8')
    .word16Ule('cur-hp')
    .word16Ule('max-hp')
    .word16Ule('cur-mp')
    .word16Ule('max-mp')
    .word32Ule('gil')
    .word32Ule('playtime')
    .array('location', 32, 'word8');

  // An RGB colour used in a menu/window
  const rgb = struct()
    .word8('r')
    .word8('g')
    .word8('b');

  // Colours used in menu/window backgrounds
  const windowColours = struct()
    .struct('upper-left', rgb)
    .struct('upper-right', rgb)
    .struct('lower-left', rgb)
    .struct('lower-right', rgb);

  // A character's major stats
  const stats = struct()
    .word8('strength')
    .word8('vitality')
    .word8('magic')
    .word8('spirit')
    .word8('dexterity')
    .word8('luck')
    .word8('strength-bonus')
    .word8('vitality-bonus')
    .word8('magic-bonus')
    .word8('spirit-bonus')
    .word8('dexterity-bonus')
    .word8('luck-bonus');

  // Information about one piece of Materia
  // Note that struct has no 24-bit integer type
  const materia = struct()
    .word8('id')
    .array('ap', 3, 'word8');

  // Records for one character- their name, stats, equipment
  const characterRecord = struct()
    .word8('id')
    .word8('level')
    .struct('stats', stats)
    .word8('limit-level')
    .word8('limit-bar')
    .array('name', 12, 'word8')
    .word8('weapon')
    .word8('armour')
    .word8('accessory')
    .word8('status')
    .word8('order')
    .word8('level-bar')
    .word16Ule('limit-skills')
    .word16Ule('kills')
    .array('limit-uses', 3, 'word16Ule')
    .word16Ule('cur-hp')
    .word16Ule('base-hp')
    .word16Ule('cur-mp')
    .word16Ule('base-mp')
    .word32Ule('unknown')
    .word16Ule('max-hp')
    .word16Ule('max-mp')
    .word32Ule('cur-exp')
    .array('weapon-materia', 8, materia)
    .array('armour-materia', 8, materia)
    .word32Ule('lvl-exp');

  // What the party owns that is not equipped
  const stock = struct()
    .array('items', 320, 'word16Ule')
    .array('materia', 200, materia)
    .array('stolen-materia', 48, materia)
    .array('zz-unknown-z_3', 32, 'word8')
    .word32Ule('gil');

  // Total play time, and countdown when used
  const timer = struct()
    .word32Ule('playtime')
    .word32Ule('countdown')
    .word32Ule('playtime-fraction')
    .word32Ule('countdown-fraction');

  // Relating to the party's position and location
  const worldMap = struct()
    .word32Ule('cur-map-dw')
    .word16Ule('cur-map')
    .word16Ule('cur-loc')
    .word16Ule('zz-alignment')
    .word16Sle('x')
    .word16Sle('y')
    .word16Ule('triangle')
    .word8('direction');

  // Used by the random number generator to decide on battle stuff
  const randomBattle = struct()
    .word8('seed')
    .word8('offset');

  // PHS masks to lock out certain characters dependent on game phase
  const phs = struct()
    .word16Ule('locking')
    .word16Ule('visibility');

  // Configuration options
  const config = struct()
    .word8('battle-speed')
    .word8('battle-msg-speed')
    .word16Ule('general')
    .array('ctrl-mapping', 16, 'word8')
    .word8('msg-speed');

  // One of several saves within a bank
  const save = struct()
    .word32Ule('checksum')
    .struct('preview', preview)
    .struct('window-colours', windowColours)
    .array('character-records', 9, characterRecord)
    .array('party-members', 3, 'word8')
    .word8('zz-alignment')
    .struct('stock', stock)
    .struct('timer', timer)
    .struct('map', worldMap)
    .struct('random-battle', randomBattle)
    .word8('zz-alignment-2')
    .array('field-script', 5 * 256, 'word8')
    .struct('phs', phs)
    .array('zz-unknown-z_39', 48, 'word8')
    .struct('config', config)
    .array('zz-unknown-z_40', 7, 'word8');

  // The file on disk contains a header and several saves
  const ff7file = struct()
    .array('header', 9, 'word8')
    .array('saves', 15, save);

  return ff7file;
}

module.exports = build;
