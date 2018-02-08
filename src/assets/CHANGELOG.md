## 1.2.1 (2018-02-08)

#### Bugfix
+ `[preventDefaultEvent]` should not prevent events of elements outside the handle.

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