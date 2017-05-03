# angular2-draggable [![npm version](https://badge.fury.io/js/angular2-draggable.svg)](http://badge.fury.io/js/angular2-draggable) [![npm downloads](https://img.shields.io/npm/dm/angular2-draggable.svg)](https://npmjs.org/angular2-draggable)
Angular directive (for version >= 2.x ) that makes the DOM element draggable. Please refer to the [demo](https://xieziyu.github.io/#/angular2-draggable/demo) page.

## Table of contents 
1. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Events](#events)

# Getting Started
angular2-draggable is an angular (ver >= 2.x) directive that makes the DOM element draggable. (Note that: It's different from drag-and-drop)

# Installation
```
npm install angular2-draggable --save
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

## CSS:
When `ngDraggable` is enabled on some element, `ng-draggable` class is automatically assigned to it. You can use it to customize the pointer style. For example:

```css
.ng-draggable {
  cursor: move;
}
```

# Events

To be supported soon.