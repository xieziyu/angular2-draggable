# angular2-draggable
[![npm version](https://badge.fury.io/js/angular2-draggable.svg)](http://badge.fury.io/js/angular2-draggable) [![npm downloads](https://img.shields.io/npm/dm/angular2-draggable.svg)](https://npmjs.org/angular2-draggable)

Angular directive (for version >= 2.x ) that makes the DOM element draggable.

+ [Online Demo](https://xieziyu.github.io/angular2-draggable)
+ [Online Docs](https://xieziyu.github.io/angular2-draggable/api-doc)

## Table of contents 
1. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Events](#events)

# Getting Started
angular2-draggable is an angular (ver >= 2.x) directive that makes the DOM element draggable. (Note that: It's different from drag-and-drop)

# Latest Update
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
Please refer to the [demo](https://xieziyu.github.io/#/angular2-draggable/demo) page.

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

+ Simple example:
  + html:
  ```html
  <div ngDraggable (started)="onDragBegin($event)" (stopped)="onDragEnd($event)">Drag me!</div>
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