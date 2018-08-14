# angular2-draggable
[![npm version](https://badge.fury.io/js/angular2-draggable.svg)](http://badge.fury.io/js/angular2-draggable)
[![npm downloads](https://img.shields.io/npm/dm/angular2-draggable.svg)](https://npmjs.org/angular2-draggable)
[![Build Status](https://travis-ci.org/xieziyu/angular2-draggable.svg?branch=master)](https://travis-ci.org/xieziyu/angular2-draggable)

+ [Online Demo](https://xieziyu.github.io/angular2-draggable)
+ [Online Docs](https://xieziyu.github.io/angular2-draggable/api-doc)

## Table of contents 
1. [Getting Started](#getting-started)
2. [Latest Update](#latest-update)
3. [Installation](#installation)
4. [Draggable](#draggable)
4. [Resizable](#resizable)
5. [API](#api)
6. [Events](#events)

# Getting Started
angular2-draggable has angular directives that make the DOM element draggable and resizable.
+ `ngDraggable`
    + v2.x requires Angular >= 6
    + v1.4.2 requires Angular >= 4 && < 6

+ `ngResizable`
    + provided since v2.0, requires Angular >= 6

# Latest Update
+ 2018.08.14: 2.1.0
  + ngResizable: Provide `[rzGrid]`. Snaps the resizing element to a grid.
  + ngResizable: Provide `[rzMinWidth]`, `[rzMaxWidth]`, `[rzMinHeight]`, `[rzMaxHeight]`. The minimum/maximum width/height the resizable should be allowed to resize to.

+ 2018.08.08: 2.0.1
  + Bugfix: click events are blocked. [#87](https://github.com/xieziyu/angular2-draggable/issues/87), [#84](https://github.com/xieziyu/angular2-draggable/issues/84)

+ 2018.08.03: 2.0.0
  + Fix [issue #84](https://github.com/xieziyu/angular2-draggable/issues/84): iFrames, and context unrelated elements block all events, and are unusable

+ 2018.07.02: 2.0.0-beta.2
  + ngResizable: Provide `[rzAspectRatio]`, whether the element should be constrained to a specific aspect ratio. [demo](https://xieziyu.github.io/angular2-draggable/#/resizable/aspect-ratio)
  + ngResizable: Provide `[rzContainment]`, constrains resizing to within the bounds of the specified element or region. [demo](https://xieziyu.github.io/angular2-draggable/#/resizable/containment)

+ 2018.06.26: 2.0.0-beta.1
  + ngResizable: Provide `(rzStart)`, `(rzResizing)`, `(rzStop)` event emitters
  + ngResizable: Provide `resetSize()`, `getStatus()` methods

+ 2018.06.25: 2.0.0-beta.0
  + New: `ngResizable` directive which you can use to make the element resizable! More resizable options are planning. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/resizable/default)

+ 2018.05.23: 1.4.2
  + Changes: expose boundsCheck() method.

+ 2018.05.11: 1.4.1
  + Bugfix: Handle Drag is not working in Firefox [#68](https://github.com/xieziyu/angular2-draggable/issues/68).

+ 2018.05.04: 1.4.0
  + Provide `[gridSize]` option for snapping to grid. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/advance/snap-grid). (PR [#64](https://github.com/xieziyu/angular2-draggable/pull/64) by [PAHADIx](https://github.com/PAHADIx))
  + Code optimized. (PR [#60](https://github.com/xieziyu/angular2-draggable/pull/60) by [korn3l](https://github.com/korn3l))

+ 2018.04.10: 1.3.2
  + Provide `[outOfBounds]` option. Set it to allow element get out of bounds from the direction. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/usage/boundary). (PR [#57](https://github.com/xieziyu/angular2-draggable/issues/58) by [waldo2188](https://github.com/waldo2188))

+ 2018.03.15: 1.3.1
  + Provide `(movingOffset)` event emitter: emit position offset when moving
  + Provide `(endOffset)` event emitter: emit position offset when stop moving

+ 2018.03.09: 1.3.0
  + Provide `[position]` option: to set current position offset.

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

# Installation
```
npm install angular2-draggable --save
```

# Draggable
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

# Resizable
Please refer to the [demo](https://xieziyu.github.io/angular2-draggable/#/resizable/default) page.

Besides of importing `AngularDraggableModule`, you need to import `resizable.min.css` in your project. If you use `angular-cli`, you can add this in `angular.json`:

```diff
"styles": [
    ...
+   "node_modules/angular2-draggable/css/resizable.min.css"
]
```

Then you can use `ngResizable` directive to make the element resizable:
```html
<div ngResizable> I'm now resizable </div>

<div [ngResizable]="false"> Resizable is disabled now </div>

<div ngResizable [rzHandles]="'n,e,s,w,se,sw,ne,nw'"> Each side is resizable </div>
```

Well you can use both directives concurrently if you wish:
```html
<div ngDraggable ngResizable> I'm now draggable and resizable </div>
```

# API

## Directive:
+ `ngDraggable` directive support following input porperties:

    | Input | Type | Default | Description |
    | ----- | ---- | ------- | ----------- |
    | ngDraggable | boolean | `true` | You can toggle the draggable capability by setting `true` or `false` |
    | handle | HTMLElement | null | Use template variable to refer to the handle element. Then only the handle element is draggable |
    | zIndex | string | null | Use it to set z-index property when element is not moving |
    | zIndexMoving | string | null | Use it to set z-index property when element is moving |
    | bounds | HTMLElemnt | null | Use it to set the boundary |
    | inBounds | boolean | `false` | Use it make element stay in the bounds |
    | outOfBounds | `{ top: boolean; bottom: boolean; right: boolean; left: boolean }` | `false` | Set it to allow element get out of bounds from the direction. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/usage/boundary) |
    | position | `{ x: number, y: number }` | `{ x:0, y:0 }` | Use it to set position offset |
    | gridSize | number | 1 | Use it for snapping to grid. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/advance/snap-grid) |

+ `ngResizable` directive support following input porperties:

    | Input | Type | Default | Description |
    | ----- | ---- | ------- | ----------- |
    | ngResizable | boolean | `true` | You can toggle the resizable capability by setting `true` or `false` |
    | rzHandles | string | `"e,s,se"` | Which handles can be used for resizing. Optional types in `"n,e,s,w,se,sw,ne,nw"` or `"all"` |
    | rzAspectRatio | boolean \| number | `false` | `boolean`: Whether the element should be constrained to a specific aspect ratio. `number`: Force the element to maintain a specific aspect ratio during resizing (width/height) |
    | rzContainment | Selector \| string \| Element | null | Constrains resizing to within the bounds of the specified element or region. It accepts an HTMLElement, `'parent'` or a valid CSS selector string such as '#id' |
    | rzGrid | number \| number[] | 1 | Snaps the resizing element to a grid, every x and y pixels. Array values: `[x, y]`|
    | rzMinWidth | number | 1 | The minimum width the resizable should be allowed to resize to. |
    | rzMaxWidth | number | 1 | The maximum width the resizable should be allowed to resize to. |
    | rzMinHeight | number | 1 | The minimum height the resizable should be allowed to resize to. |
    | rzMaxHeight | number | 1 | The maximum height the resizable should be allowed to resize to. |

## CSS:
+ When `ngDraggable` is enabled on some element, `ng-draggable` class is automatically assigned to it. You can use it to customize the pointer style. For example:

    ```css
    .ng-draggable {
      cursor: move;
    }
    ```

+ When `ngResizable` is enabled on some element, `ng-resizable` class is automatically assigned to it. And handle elements will be created with `ng-resizable-handle`. You can customize the handle style.

# Events
+ `ngDraggable` directive:

    | Output | $event | Description |
    | ------ | ------ | ----------- |
    | started | `nativeElement` of host | emitted when start dragging |
    | stopped | `nativeElement` of host | emitted when stop dragging |
    | edge | { top: boolean, right: boolean, bottom: boolean, left: boolean } | emitted after `[bounds]` is set |
    | movingOffset | { x: number, y: number } | emit position offset when moving |
    | endOffset | { x: number, y: number } | emit position offset when stop moving |

    Simple example:
    ```html
    <div ngDraggable
      (started)="onDragBegin($event)"
      (stopped)="onDragEnd($event)"
      (movingOffset)="onMoving($event)"
      (endOffset)="onMoveEnd($event)">
      Drag me!
    </div>
    ```

+ `ngResizable` directive:

    | Output | $event | description |
    | ------ | ------ | ----------- |
    | rzStart | `IResizeEvent` | emitted when start resizing |
    | rzResizing | `IResizeEvent` | emitted when resizing |
    | rzStop | `IResizeEvent` | emitted when stop resizing |

    ```typescript
    export interface IResizeEvent {
      host: any;
      handle: any;
      size: {
        width: number;
        height: number;
      };
      position: {
        top: number;
        left: number;
      };
    }
    ```

    Simple example:
    ```html
    <div ngResizable
      (rzStart)="onResizeStart($event)"
      (rzResizing)="onResizing($event)"
      (rzStop)="onResizeStop($event)">
      Resizable
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
