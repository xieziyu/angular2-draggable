# angular2-draggable
[![npm version](https://badge.fury.io/js/angular2-draggable.svg)](http://badge.fury.io/js/angular2-draggable)
[![npm downloads](https://img.shields.io/npm/dm/angular2-draggable.svg)](https://npmjs.org/angular2-draggable)
[![Build Status](https://travis-ci.org/xieziyu/angular2-draggable.svg?branch=master)](https://travis-ci.org/xieziyu/angular2-draggable)

Angular directive (for version >= 4.x ) that makes the DOM element draggable.

+ [Online Demo](https://xieziyu.github.io/angular2-draggable)
+ [Online Docs](https://xieziyu.github.io/angular2-draggable/api-doc)

## Table of contents 
1. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Events](#events)

# Getting Started
angular2-draggable is an angular (ver >= 4.x) directive that makes the DOM element draggable. (Note that: It's different from drag-and-drop)

# Latest Update
+ 2018.04.10: 1.3.2
  + Provide `[outOfBounds]` option. Set it to allow element get out of bounds from the direction. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/usage/boundary). (PR [#57](https://github.com/xieziyu/angular2-draggable/issues/58) by [waldo2188](https://github.com/waldo2188))

+ 2018.03.15: 1.3.1
  + Provide `(movingOffset)` event emitter: emit position offset when moving
  + Provide `(endOffset)` event emitter: emit position offset when stop moving

+ 2018.03.09: 1.3.0
  + Provide `[position]` option: to set initial position offset.

+ 2018.02.08: 1.2.1
  + Bugfix: `[preventDefaultEvent]` should not prevent events of elements outside the handle.

+ 2018.02.07: 1.2.0
  + **BREAKING CHANGE**: use `Renderer2` of angular-core. So we don't support angular version < 4.0.
  + Provide: `resetPosition()` method to reset position. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/usage/api) for details.
  + Bugfix: `[trackPosition]` was not working as expected.
  + Change: The directive now `exportAs: 'ngDraggable'`. For example we can use `<div ngDraggable #block="ngDraggable"></div>` to assign this directive to a variable.
  + Change: `[preventDefaultEvent]` set default to false.

+ 2018.02.01: 1.1.0

  + Provide `[trackPosition]` option: whether to track the element's movement. (PR by [Blackbaud-MikitaYankouski](https://github.com/Blackbaud-MikitaYankouski))
  + Provide `[scale]` option: to fix scaling issue [#31](https://github.com/xieziyu/angular2-draggable/issues/31)
  + Provide `[preventDefaultEvent]` option: whether to prevent default mouse or touch event. (default: true)

+ 2017.12.20: 1.1.0-beta.0

  + Provide `[zIndex]` and `[zIndexMoving]` to control z-index property.
  + Provide `[bounds]`, `(edge)` and `[inBounds]` to do boundary check and limit element staying in the bounds.
  + Update [demo](https://xieziyu.github.io/angular2-draggable) page.


+ 2017.09.19: Fix an issue when dragging with touch.

+ 2017.08.26: Fix an issue: clicking before dragging leading to unexpected offset ([PR #12](https://github.com/xieziyu/angular2-draggable/pull/12) by [bmartinson13](https://github.com/bmartinson13))

+ 2017.07.24: Fix cross-browser compatibility issues.

+ 2017.07.05: Publish `UMD` bundle

# Installation
```
npm install angular2-draggable --save
```

# How to use it with:
+ `SystemJS`: For example: angular `quickstart`. You need to modify `systemjs.config.js` file just like:

```javascript
{
  map: {
    // ...

    // angular2-draggable
    'angular2-draggable':                   'npm:angular2-draggable',
  },
  packages: {
    // other packages ...

    //angular2-draggable
    'angular2-draggable': {
      defaultExtension: 'js',
      main: 'bundles/angular2-draggable.umd.min.js'
    }
  }
}
```

# Usage
Please refer to the [demo](https://xieziyu.github.io/angular2-draggable) page.

1. Firstly, import `AngularDraggableModule` in your app module (or any other proper angular module):
    ```typescript
    import { AngularDraggableModule } from 'angular2-draggable';

    @NgModule({
      imports: [
        ...,
        AngularDraggableModule
      ],
      ...
    })
    export class AppModule { }
    ```

2. Then: use `ngDraggable` directive to make the DOM element draggable.
    + Simple example:

      + html:
      ```html
      <div ngDraggable>Drag me!</div>
      ```

    + Use `[handle]` to move parent element:

      + html:
      ```html
      <div ngDraggable [handle]="DemoHandle" class="card">
        <div #DemoHandle class="card-header">I'm handle. Drag me!</div>
        <div class="card-block">You can't drag this block now!</div>
      </div>
      ```

# API

## Directive:
`ngDraggable` directive support following input porperties:
+ `ngDraggable`: boolean. You can toggle the draggable capability by setting `true`/`false` to `ngDraggable`

+ `handle`: HTMLElement. Use template variable to refer to the handle element. Then only the handle element is draggable.

+ `zIndex`: string. Use it to set z-index property when element is not moving.

+ `zIndexMoving`: string. Use it to set z-index property when element is moving.

+ `bounds`: HTMLElemnt. Use it to set the boundary.

+ `inBounds`: boolean, default is `false`. Use it make element stay in the bounds.

+ `outOfBounds`: { top: boolean; bottom: boolean; right: boolean; left: boolean }, default are `false`. Set it to allow element get out of bounds from the direction. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/usage/boundary)

+ `position`: IPosition: `{ x: number, y: number }`, default is `{ x:0, y:0 }`. Use it to set initial position offset.

## CSS:
When `ngDraggable` is enabled on some element, `ng-draggable` class is automatically assigned to it. You can use it to customize the pointer style. For example:

```css
.ng-draggable {
  cursor: move;
}
```

# Events

1. Support `started` and `stopped` events. The `nativeElement` of the host would be emitted.
2. Support `edge` events only when `[bounds]` is set. It would emit the result of the boundary check.
3. `(movingOffset)` event emitter: emit position offset when moving
4. `(endOffset)` event emitter: emit position offset when stop moving

+ Simple example:
  + html:
  ```html
  <div ngDraggable
    (started)="onDragBegin($event)"
    (stopped)="onDragEnd($event)"
    (movingOffset)="onMoving($event)"
    (endOffset)="onMoveEnd($event)">
    Drag me!
  </div>
  ```

# Demo
You can clone this repo to your working copy and then launch the demo page in your local machine:
```bash
npm install
npm run demo

# or
yarn install
yarn demo
```
The demo page server is listening to: http://localhost:4203