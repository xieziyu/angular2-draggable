## 2.1.8 (2018-11-11)

#### New
+ **ngResizable**: add [preventDefaultEvent] flag to ngResizable mousedown ([by mecp](https://github.com/mecp) - [PR #119](https://github.com/xieziyu/angular2-draggable/pull/119))

---

## 2.1.7 (2018-10-31)

#### Bugfix
+ **ngResizable**: ngResizable Locks Height When rzHandles Includes Only e, w. [#116](https://github.com/xieziyu/angular2-draggable/issues/116) (Thanks to [Yamazaki93](https://github.com/Yamazaki93))

---

## 2.1.6 (2018-10-26)

#### Bugfix
+ **ngResizable**: rzResizing IE event issue. [#115](https://github.com/xieziyu/angular2-draggable/issues/115)

---

## 2.1.5 (2018-10-15)

#### Bugfix
+ **ngDraggable**: EndOffset event not working properly with SnapToGrid. [#114](https://github.com/xieziyu/angular2-draggable/issues/114)

---

## 2.1.4 (2018-09-17)

#### Bugfix
+ Fix a build issue
+ **ngResizable**: Resize bounds on a draggable element inside a containment is off. [#100](https://github.com/xieziyu/angular2-draggable/issues/100)

---

## 2.1.2 (2018-08-20)

#### Bugfix
+ **ngDraggable**: Item is produced with div partially out of bounds. [#97](https://github.com/xieziyu/angular2-draggable/issues/97)

---

## 2.1.1 (2018-08-14)

#### New
+ **ngResizable**: Provide `[rzGrid]`. Snaps the resizing element to a grid.
+ **ngResizable**: Provide `[rzMinWidth]`, `[rzMaxWidth]`, `[rzMinHeight]`, `[rzMaxHeight]`. The minimum/maximum width/height the resizable should be allowed to resize to.

#### Bugfix
+ **ngResizable**: resizing from w, nw or n with a min/max size moves the window if it goes below/above the min/max size. [#94](https://github.com/xieziyu/angular2-draggable/issues/94)

---

## 2.0.1 (2018-08-08)

#### Bugfix
+ click events are blocked. [#87](https://github.com/xieziyu/angular2-draggable/issues/87), [#84](https://github.com/xieziyu/angular2-draggable/issues/84)

---

## 2.0.0 (2018-08-03)

#### Bugfix
+ Fix [issue #84](https://github.com/xieziyu/angular2-draggable/issues/84): iFrames, and context unrelated elements block all events, and are unusable

---

## 2.0.0-beta.2 (2018-07-02)

#### New
+ **ngResizable**: Provide `[rzAspectRatio]`, whether the element should be constrained to a specific aspect ratio.
+ **ngResizable**: Provide `[rzContainment]`, constrains resizing to within the bounds of the specified element or region.

---

## 2.0.0-beta.1 (2018-06-26)

#### New
+ **ngResizable**: Provide `(rzStart)`, `(rzResizing)`, `(rzStop)` event emitters
+ **ngResizable**: Provide `resetSize()`, `getStatus()` methods

---

## 2.0.0-beta.0 (2018-06-25)

#### New
+ `ngResizable` directive which you can use to make the element resizable.
+ Provide `[rzHandles]` option for which handles can be used for resizing.

## 1.4.2 (2018-05-23)

#### Changes
+ Expose boundsCheck() method.

---

## 1.4.1 (2018-05-11)

#### Bugfix
+ Handle Drag is not working in Firefox [#68](https://github.com/xieziyu/angular2-draggable/issues/68).

---

## 1.4.0 (2018-05-04)

#### New
+ Provide `[gridSize]` option for snapping to grid. Refer to [demo](https://xieziyu.github.io/angular2-draggable/#/advance/snap-grid). (PR [#64](https://github.com/xieziyu/angular2-draggable/pull/64) by [PAHADIx](https://github.com/PAHADIx))

#### Changes
+ Code optimized. (PR [#60](https://github.com/xieziyu/angular2-draggable/pull/60) by [korn3l](https://github.com/korn3l))

---

## 1.3.2 (2018-04-10)

#### New
+  Provide `[outOfBounds]` option. Set it to allow element get out of bounds from the direction. (PR [#57](https://github.com/xieziyu/angular2-draggable/issues/58) by [waldo2188](https://github.com/waldo2188))

---

## 1.3.1 (2018-03-15)

#### New
+ Provide `(movingOffset)` event emitter: emit position offset when moving
+ Provide `(endOffset)` event emitter: emit position offset when stop moving

---

## 1.3.0 (2018-03-09)

#### New
+ Provide `[position]` option: to set initial position offset.

---

## 1.2.1 (2018-02-08)

#### Bugfix
+ `[preventDefaultEvent]` should not prevent events of elements outside the handle.

---

## 1.2.0 (2018-02-07)

#### New
+ Provide `resetPosition()` method to reset position.

#### Breaking Changes
+ Use `Renderer2` of angular-core. So we don't support angular version < 4.0.

#### Bugfix
+ `[trackPosition]` was not working as expected.

#### Changes
+ The directive now `exportAs: 'ngDraggable'`.
+ `[preventDefaultEvent]` set default to false.

---

## 1.1.0 (2018-02-01)

#### New
+ Provide `[trackPosition]` option: whether to track the element's movement. (PR by [Blackbaud-MikitaYankouski](https://github.com/Blackbaud-MikitaYankouski))
+ Provide `[scale]` option: to fix scaling issue [#31](https://github.com/xieziyu/angular2-draggable/issues/31)
+ Provide `[preventDefaultEvent]` option: whether to prevent default mouse or touch event. (default: true)

---

## 1.1.0-beta.0 (2017-12-20)

#### New
+ Provide `[zIndex]` and `[zIndexMoving]` to control z-index property.
+ Provide `[bounds]`, `(edge)` and `[inBounds]` to do boundary check and limit element staying in the bounds.

---

<a name="1.0.7"></a>
## [1.0.7](https://github.com/xieziyu/angular2-draggable/compare/v1.0.6...v1.0.7) (2017-09-19)

### Bugfix
+ Fix an issue when dragging with touch.

---

<a name="1.0.6"></a>
## [1.0.6](https://github.com/xieziyu/angular2-draggable/compare/v1.0.5...v1.0.6) (2017-08-26)

### Bugfix
+ Fix an issue: clicking before dragging leading to unexpected offset ([PR #12](https://github.com/xieziyu/angular2-draggable/pull/12) by [bmartinson13](https://github.com/bmartinson13))

---

<a name="1.0.5"></a>
## [1.0.5](https://github.com/xieziyu/angular2-draggable/compare/v1.0.4...v1.0.5) (2017-07-24)

### New
+ Fix cross-browser compatibility issues.

---

<a name="1.0.4"></a>
## [1.0.4](https://github.com/xieziyu/angular2-draggable/compare/v1.0.3...v1.0.4) (2017-07-05)

### New
+ Publish `UMD` bundle

---

<a name="1.0.3"></a>
## [1.0.3](https://github.com/xieziyu/angular2-draggable/compare/v1.0.2...v1.0.3) (2017-06-13)

### New
+ Support `started` and `stopped` dragging event.

---

<a name="1.0.2"></a>
## [1.0.2](https://github.com/xieziyu/angular2-draggable/compare/v1.0.1...v1.0.2) (2017-05-05)

### BugFix
+ It now saves and restores the `position` and `z-index` properties.
+ It now calculates the correct `left` and `top` properties from CSS value.

---

<a name="1.0.1"></a>
## [1.0.1](https://github.com/xieziyu/angular2-draggable/compare/v1.0.0...v1.0.1) (2017-05-05)

### BugFix
+ Giving all draggable elements the position relative (PR: [#1](https://github.com/xieziyu/angular2-draggable/pull/1), thanks to tylerlindell)

### Changes
+ Bring moving element to the top by setting z-index (PR: [#1](https://github.com/xieziyu/angular2-draggable/pull/1), thanks to tylerlindell)
