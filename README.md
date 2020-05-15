## Installation

To install this plugin you'll need npm or yarn

### npm
```
npm install -S phaser3-planck
```

### yarn
```
yarn add phaser3-planck
```

## Usage

### Setup

First let us import the package and add the config to your game configs global plugins

```js
import PhaserPlanck from 'phaser3-planck'

plugins: {
  scene: [
    { key: 'PhaserPlanck', plugin: PhaserPlanck, mapping: 'planck' }
  ]
},
physics: {
  planck: {
    gravity: {
      x: 0,
      y: 3
    }
  }
}
```