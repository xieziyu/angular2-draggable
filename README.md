# angular2-draggable

<!-- Badges section here. -->
[![npm](https://img.shields.io/npm/v/angular2-draggable.svg)][npm-badge-url]
[![npm](https://img.shields.io/npm/dm/angular2-draggable.svg)][npm-badge-url]
[![Build Status](https://travis-ci.org/xieziyu/angular2-draggable.svg?branch=master)][ci-url]

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
+ 2019.06.10: 2.3.2:
  + **ngResizable**
    + Fix [issue #164](https://github.com/xieziyu/angular2-draggable/issues/164): Resize doesn't work on Windows10 IE11 ([PR #171](https://github.com/xieziyu/angular2-draggable/pull/171) by [shumih](https://github.com/shumih]), [PR #174](https://github.com/xieziyu/angular2-draggable/pull/174) by [LiorSaadon](https://github.com/LiorSaadon]))

+ 2019.05.14: 2.3.0:
  + **ngResizable**:
    + Fix [issue #157](https://github.com/xieziyu/angular2-draggable/issues/159): Problem resizing with containment
    + Add `direction` property in `IResizeEvent`. 

  + **ngDraggable**: 
    + Add CSS class `ng-dragging` when dragging.

+ 2019.04.19: 2.2.4:
  + **ngResizable**:
    + Fix [issue #157](https://github.com/xieziyu/angular2-draggable/issues/157): calling resetSize() method cause exception
+ 2019.04.18: 2.2.3:
  + **ngDraggable**: 
    + Fix draggable position bouncing when draggable is scaled and position is set ([by agnitos](https://github.com/agnitos)) - [PR #150](https://github.com/xieziyu/angular2-draggable/pull/150)
    + Fix translate in draggable.directive ([by Volker505](https://github.com/Volker505)) - [PR #151](https://github.com/xieziyu/angular2-draggable/pull/151)
    + Fix issue with dragging window inside iframe for IE ([by fdabrowski](https://github.com/fdabrowski)) - [PR #154](https://github.com/xieziyu/angular2-draggable/pull/154)
    + Fix Element move when resizing using the NW and NE handles and aspect ratio is enabled ([by dioseltorre](https://github.com/dioseltorre)) - [PR #156](https://github.com/xieziyu/angular2-draggable/pull/156)
+ 2019.03.01: 2.2.2:
  + **ngDraggable**: Fixed ngDraggable toggle bug. ([by agnitos](https://github.com/agnitos)) - [PR #145](https://github.com/xieziyu/angular2-draggable/pull/145)

+ 2018.12.25: 2.2.1:
  + **ngDraggable**: Fixed flickering of the component on initial drag while scale is applied to the parent. ([by rathodsanjay](https://github.com/rathodsanjay) - [PR #134](https://github.com/xieziyu/angular2-draggable/pull/123))

+ 2018.12.22: 2.2.0
  + **ngDraggable**:
    + Performance update. Fix [issue #112](https://github.com/xieziyu/angular2-draggable/issues/112): Control change detection with HostListener events.
    + Fix [issue #128](https://github.com/xieziyu/angular2-draggable/issues/128): Multiple phone draggables at the same time.
    + New `[lockAxis]` input.
  + **ngResizable**:
    + Fix [issue #132](https://github.com/xieziyu/angular2-draggable/issues/132): Aspect ratio feature exits Y-Axis boundary on resize.

+ 2018.11.29: 2.1.9
  + **ngDraggable**: fix [issue #31](https://github.com/xieziyu/angular2-draggable/issues/31): Problems when scale transform applied to parent. ([by rathodsanjay](https://github.com/rathodsanjay) - [PR #123](https://github.com/xieziyu/angular2-draggable/pull/123))

+ 2018.11.11: 2.1.8
  + **ngResizable**: add [preventDefaultEvent] flag to ngResizable mousedown ([by mecp](https://github.com/mecp) - [PR #119](https://github.com/xieziyu/angular2-draggable/pull/119))

+ 2018.10.31: 2.1.7
  + **ngResizable**: fix [issue #116](https://github.com/xieziyu/angular2-draggable/issues/116): ngResizable Locks Height When rzHandles Includes Only e, w. (Thanks to [Yamazaki93](https://github.com/Yamazaki93))

+ 2018.10.26: 2.1.6
  + **ngResizable**: fix [issue #115](https://github.com/xieziyu/angular2-draggable/issues/115): rzResizing IE event issue

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
    | preventDefaultEvent | boolean | `false` | Whether to prevent default mouse event |
    | scale | number | 1 | Set it when parent element has CSS transform scale |
    | lockAxis | `'x' \| 'y'` | null | Restrict dragging to a specific axis by locking another one |
  
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
    | preventDefaultEvent | boolean | `false` | Whether to prevent default mouse event. |

## CSS:
+ When `ngDraggable` is enabled on some element, `ng-draggable` and `ng-dragging` class is automatically toggled on it. You can use it to customize the pointer style. For example:

    ```css
    .ng-draggable {
      cursor: grab;
    }

    .ng-dragging {
      cursor: grabbing;
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
      direction: {
        n: boolean;
        s: boolean;
        w: boolean;
        e: boolean;
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


[npm-badge-url]: https://www.npmjs.com/package/angular2-draggable
[ci-url]: https://travis-ci.org/xieziyu/angular2-draggable
