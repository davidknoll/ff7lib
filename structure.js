/**
 * Definitions of structures in the .ff7 file format.
 */

'use strict';

const Struct = require('struct');

function build() {
  const Preview = Struct()
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

  const Rgb = Struct()
    .word8('r')
    .word8('g')
    .word8('b');

  const WindowColours = Struct()
    .struct('upper-left', Rgb)
    .struct('upper-right', Rgb)
    .struct('lower-left', Rgb)
    .struct('lower-right', Rgb);

  const Stats = Struct()
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

  const Materia = Struct()
    .word8('id')
    .array('ap', 3, 'word8');

  const CharacterRecord = Struct()
    .word8('id')
    .word8('level')
    .struct('stats', Stats)
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
    .array('weapon-materia', 8, Materia)
    .array('armour-materia', 8, Materia)
    .word32Ule('lvl-exp');

  const Stock = Struct()
    .array('items', 320, 'word16Ule')
    .array('materia', 200, Materia)
    .array('stolen-materia', 48, Materia)
    .array('zz-unknown-z_3', 32, 'word8')
    .word32Ule('gil');

  const Timer = Struct()
    .word32Ule('playtime')
    .word32Ule('countdown')
    .word32Ule('playtime-fraction')
    .word32Ule('countdown-fraction');

  const WorldMap = Struct()
    .word32Ule('cur-map-dw')
    .word16Ule('cur-map')
    .word16Ule('cur-loc')
    .word16Ule('zz-alignment')
    .word16Sle('x')
    .word16Sle('y')
    .word16Ule('triangle')
    .word8('direction');

  const RandomBattle = Struct()
    .word8('seed')
    .word8('offset');

  const Phs = Struct()
    .word16Ule('locking')
    .word16Ule('visibility');

  const Config = Struct()
    .word8('battle-speed')
    .word8('battle-msg-speed')
    .word16Ule('general')
    .array('ctrl-mapping', 16, 'word8')
    .word8('msg-speed');

  const Save = Struct()
    .word32Ule('checksum')
    .struct('preview', Preview)
    .struct('window-colours', WindowColours)
    .array('character-records', 9, CharacterRecord)
    .array('party-members', 3, 'word8')
    .word8('zz-alignment')
    .struct('stock', Stock)
    .struct('timer', Timer)
    .struct('map', WorldMap)
    .struct('random-battle', RandomBattle)
    .word8('zz-alignment-2')
    .array('field-script', 5 * 256, 'word8')
    .struct('phs', Phs)
    .array('zz-unknown-z_39', 48, 'word8')
    .struct('config', Config)
    .array('zz-unknown-z_40', 7, 'word8');

  const FF7File = Struct()
    .array('header', 9, 'word8')
    .array('saves', 15, Save);

  return FF7File;
}

module.exports = build;
