# 🍎 Phaser3 Planck Physics Plugin
This plugin integrates the [Planck.js](http://piqnt.com/planck.js/) (Based on [Box2d](http://box2d.org/documentation/)) physics engine with [Phaser3](https://phaser.io/phaser3), allowing for advanced collision detection and dynamic body types. This plugin is still in development, please feel free to submit a PR or issue to help us improve this integration.

## Features
⭐ Support for Planck bodies (Box, Circle, Edge, Polygon).
⭐ Continuous Collision Detection (CCD) for bodies with 'Bullet' property.
⭐ Distance Joints, Revolute Joints
⭐ ...and more!

## Installation

You can install the latest version of **phaser3-planck** via npm or yarn.
```
npm install -S phaser3-planck
```
or...
```
yarn add phaser3-planck
```

## Usage
### Setup

First, import the package and update your global game configuration to include the plugin.

```js
import PhaserPlanck from 'phaser3-planck'
```
```js
const  config = {
	type:  Phaser.AUTO,
	width:  800,
	height:  600,
	plugins: {
		scene: [{
			key:  'PhaserPlanck',
			plugin:  PhaserPlanck,
			mapping:  'planck'
		}]
	},
	physics: {
		planck: {
			gravity: {
				x:  0,
				y:  3
			},
			scaleFactor: 30,
			debug: false
		}
	},
	scene: []
};

new  Phaser.Game(config);
```

### Creating Bodies

You can create different bodies in your scene using the following syntax:
```js
// Box
this.planck.add.box(400, 100, 30, 30)
// Circle
this.planck.add.circle(300, 20, 10)
// Edge (Line)
this.planck.add.edge(200, 300, 600, 300)
// Polygon
this.planck.add.polygon(340, 100, [[0, 0], [0, 70], [50, 100]])
```

### Configuring Bodies
The central Body class that all bodies extend, provides similar API methods / properties to Planck. A list of these properties / methods is listed below.

``` TODO ```

## Status
#### Bodies
| Type | Status |
|--|--|
| Box | ✔️ |
| Circle | ✔️ |
| Edge | ✔️ |
| Polygon | ✔️ |

#### Joints
| Type | Status |
|--|--|
| Distance | ✔️ |
| Friction |  |
| Gear |  |
| Motor |  |
| Mouse |  |
| Prismatic |  |
| Pulley |  |
| Revolute | ✔️ |
| Rope |  |
| Weld |  |
| Wheel |  |

## Contributing
Please feel free to post a PR / issue, we are looking for contributors to help with this effort. Thanks!

*You are welcome to contact me on:*
Discord: **notchris#4207**
IRC (Freenode): **notchris**