// Type definitions for phaser3-planck [1.0.0]
// Project: [phaser3-planck]
// Definitions by: [Austyn Studdard] <[https://github.com/KingCosmic]>

/*~ On this line, import the module which this module adds to */
import * as phaser from 'phaser';

import Plugin from '../src/index';

/*~ Here, declare the same module as the one you imported above */
declare module 'phaser' {
  interface Scene {
    planck: Plugin
  }
}