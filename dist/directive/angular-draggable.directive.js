import { Directive, ElementRef, Renderer, Input, HostListener } from '@angular/core';
var Position = (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
export var AngularDraggableDirective = (function () {
    function AngularDraggableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.allowDrag = true;
        this.moving = false;
        this.orignal = null;
        this.oldZIndex = '';
        this.oldPosition = '';
    }
    Object.defineProperty(AngularDraggableDirective.prototype, "ngDraggable", {
        set: function (setting) {
            if (setting !== undefined && setting !== null && setting !== '') {
                this.allowDrag = !!setting;
                var element = this.handle ? this.handle : this.el.nativeElement;
                if (this.allowDrag) {
                    this.renderer.setElementClass(element, 'ng-draggable', true);
                }
                else {
                    this.renderer.setElementClass(element, 'ng-draggable', false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AngularDraggableDirective.prototype.ngOnInit = function () {
        if (this.allowDrag) {
            var element = this.handle ? this.handle : this.el.nativeElement;
            this.renderer.setElementClass(element, 'ng-draggable', true);
        }
    };
    AngularDraggableDirective.prototype.getPosition = function (x, y) {
        var left = parseInt(this.el.nativeElement.style.left.replace('px', ''));
        var top = parseInt(this.el.nativeElement.style.top.replace('px', ''));
        if (window) {
            left = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("left"));
            top = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("top"));
        }
        return new Position(x - left, y - top);
    };
    AngularDraggableDirective.prototype.moveTo = function (x, y) {
        if (this.orignal) {
            this.renderer.setElementStyle(this.el.nativeElement, 'left', (x - this.orignal.x) + "px");
            this.renderer.setElementStyle(this.el.nativeElement, 'top', (y - this.orignal.y) + "px");
        }
    };
    AngularDraggableDirective.prototype.pickUp = function () {
        this.oldZIndex = this.el.nativeElement.style.zIndex ? this.el.nativeElement.style.zIndex : '';
        this.oldPosition = this.el.nativeElement.style.position ? this.el.nativeElement.style.position : '';
        if (window) {
            this.oldZIndex = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("z-index");
            this.oldPosition = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("position");
        }
        var position = 'relative';
        if (this.oldPosition && (this.oldPosition === 'absolute' ||
            this.oldPosition === 'fixed' ||
            this.oldPosition === 'relative')) {
            position = this.oldPosition;
        }
        this.renderer.setElementStyle(this.el.nativeElement, 'position', position);
        this.renderer.setElementStyle(this.el.nativeElement, 'z-index', '99999');
    };
    AngularDraggableDirective.prototype.putBack = function () {
        if (this.oldZIndex) {
            this.renderer.setElementStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
        }
        else {
            this.el.nativeElement.style.removeProperty('z-index');
        }
    };
    AngularDraggableDirective.prototype.onMouseDown = function (event) {
        if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
            return;
        }
        this.moving = true;
        this.orignal = this.getPosition(event.clientX, event.clientY);
        this.pickUp();
    };
    AngularDraggableDirective.prototype.onMouseUp = function () {
        this.putBack();
        this.moving = false;
    };
    AngularDraggableDirective.prototype.onMouseLeave = function () {
        this.putBack();
        this.moving = false;
    };
    AngularDraggableDirective.prototype.onMouseMove = function (event) {
        if (this.moving && this.allowDrag) {
            this.moveTo(event.clientX, event.clientY);
        }
    };
    AngularDraggableDirective.prototype.onTouchEnd = function () {
        this.putBack();
        this.moving = false;
    };
    AngularDraggableDirective.prototype.onTouchStart = function (event) {
        event.stopPropagation();
        this.moving = true;
        this.orignal = this.getPosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        this.pickUp();
    };
    AngularDraggableDirective.prototype.onTouchMove = function (event) {
        event.stopPropagation();
        if (this.moving && this.allowDrag) {
            this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
    };
    AngularDraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngDraggable]'
                },] },
    ];
    AngularDraggableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    AngularDraggableDirective.propDecorators = {
        'handle': [{ type: Input },],
        'ngDraggable': [{ type: Input },],
        'onMouseDown': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
        'onMouseUp': [{ type: HostListener, args: ['document:mouseup',] },],
        'onMouseLeave': [{ type: HostListener, args: ['document:mouseleave',] },],
        'onMouseMove': [{ type: HostListener, args: ['document:mousemove', ['$event'],] },],
        'onTouchEnd': [{ type: HostListener, args: ['document:touchend',] },],
        'onTouchStart': [{ type: HostListener, args: ['touchstart', ['$event'],] },],
        'onTouchMove': [{ type: HostListener, args: ['document:touchmove', ['$event'],] },],
    };
    return AngularDraggableDirective;
}());
//# sourceMappingURL=angular-draggable.directive.js.map