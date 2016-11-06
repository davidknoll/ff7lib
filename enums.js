/**
 * Names of characters, materia etc.
 */

'use strict';

// Names for portrait/character IDs
const PortraitEnum = {
  // Main party
  0: "Cloud",
  1: "Barret",
  2: "Tifa",
  3: "Aeris",
  4: "Red XIII",
  5: "Yuffie",
  6: "Cait Sith",
  7: "Vincent",
  8: "Cid",

  9: "Young Cloud",
  10: "Sephiroth",
  11: "Chocobo",
  255: "None"
};

// Names for Materia
const MateriaEnum = {
  // Independent
  0: "MP Plus",
  1: "HP Plus",
  2: "Speed Plus",
  3: "Magic Plus",
  4: "Luck Plus",
  5: "EXP Plus",
  6: "Gil Plus",
  7: "Enemy Away",
  8: "Enemy Lure",
  9: "Chocobo Lure",
  10: "Pre-emptive",
  11: "Long Range",
  12: "Mega All",
  13: "Counter Attack",
  // Command
  14: "Slash-All",
  15: "Double Cut",

  // Independent
  16: "Cover",
  17: "Underwater",
  18: "HP <-> MP",
  // Command
  19: "W-Magic",
  20: "W-Summon",
  21: "W-Item",
  // Support
  23: "All",
  24: "Counter",
  25: "Magic Counter",
  26: "MP Turbo",
  27: "MP Absorb",
  28: "HP Absorb",
  29: "Elemental",
  30: "Added Effect",
  31: "Sneak Attack",

  32: "Final Attack",
  33: "Added Cut",
  34: "Steal As Well",
  35: "Quadra Magic",
  // Command
  36: "Steal",
  37: "Sense",
  39: "Throw",
  40: "Morph",
  41: "Deathblow",
  42: "Manipulate",
  43: "Mime",
  44: "Enemy Skill",

  48: "Master Command",
  // Magic
  49: "Fire",
  50: "Ice",
  51: "Earth",
  52: "Lightning",
  53: "Restore",
  54: "Heal",
  55: "Revive",
  56: "Seal",
  57: "Mystify",
  58: "Transform",
  59: "Exit",
  60: "Poison",
  61: "Demi",
  62: "Barrier",

  64: "Comet",
  65: "Time",
  68: "Destruct",
  69: "Contain",
  70: "FullCure",
  71: "Shield",
  72: "Ultima",
  73: "Master Magic",
  // Summon
  74: "Choco/Mog",
  75: "Shiva",
  76: "Ifrit",
  77: "Ramuh",
  78: "Titan",
  79: "Odin",

  80: "Leviathan",
  81: "Bahamut",
  82: "Kujata",
  83: "Alexander",
  84: "Phoenix",
  85: "Neo Bahamut",
  86: "Hades",
  87: "Typhoon",
  88: "Bahamut ZERO",
  89: "Knights of Round",
  90: "Master Summon",

  255: "Empty Slot"
};

module.exports = { PortraitEnum, MateriaEnum };
