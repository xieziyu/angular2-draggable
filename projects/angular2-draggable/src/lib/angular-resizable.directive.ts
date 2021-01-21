import {
  Directive, ElementRef, Renderer2,
  Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges,
  OnDestroy, AfterViewInit
} from '@angular/core';

import { Subscription, fromEvent } from 'rxjs';
import { HelperBlock } from './widgets/helper-block';
import { ResizeHandle } from './widgets/resize-handle';
import { ResizeHandleType } from './models/resize-handle-type';
import { Position, IPosition } from './models/position';
import { Size } from './models/size';
import { IResizeEvent } from './models/resize-event';

@Directive({
  selector: '[ngResizable]',
  exportAs: 'ngResizable'
})
export class AngularResizableDirective implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  private _resizable = true;
  private _handles: { [key: string]: ResizeHandle } = {};
  private _handleType: string[] = [];
  private _handleResizing: ResizeHandle = null;
  private _direction: { 'n': boolean, 's': boolean, 'w': boolean, 'e': boolean } = null;
  private _directionChanged: { 'n': boolean, 's': boolean, 'w': boolean, 'e': boolean } = null;
  private _aspectRatio = 0;
  private _containment: HTMLElement = null;
  private _origMousePos: Position = null;

  /** Original Size and Position */
  private _origSize: Size = null;
  private _origPos: Position = null;

  /** Current Size and Position */
  private _currSize: Size = null;
  private _currPos: Position = null;

  /** Initial Size and Position */
  private _initSize: Size = null;
  private _initPos: Position = null;

  /** Snap to gird */
  private _gridSize: IPosition = null;

  private _bounding: any = null;

  /**
   * Bugfix: iFrames, and context unrelated elements block all events, and are unusable
   * https://github.com/xieziyu/angular2-draggable/issues/84
   */
  private _helperBlock: HelperBlock = null;

  private draggingSub: Subscription = null;
  private _adjusted = false;

  /** Disables the resizable if set to false. */
  @Input() set ngResizable(v: any) {
    if (v !== undefined && v !== null && v !== '') {
      this._resizable = !!v;
      this.updateResizable();
    }
  }

  /**
   * Which handles can be used for resizing.
   * @example
   * [rzHandles] = "'n,e,s,w,se,ne,sw,nw'"
   * equals to: [rzHandles] = "'all'"
   *
   * */
  @Input() rzHandles: ResizeHandleType = 'e,s,se';

  /**
   * Whether the element should be constrained to a specific aspect ratio.
   *  Multiple types supported:
   *  boolean: When set to true, the element will maintain its original aspect ratio.
   *  number: Force the element to maintain a specific aspect ratio during resizing.
   */
  @Input() rzAspectRatio: boolean | number = false;

  /**
   * Constrains resizing to within the bounds of the specified element or region.
   *  Multiple types supported:
   *  Selector: The resizable element will be contained to the bounding box of the first element found by the selector.
   *            If no element is found, no containment will be set.
   *  Element: The resizable element will be contained to the bounding box of this element.
   *  String: Possible values: "parent".
   */
  @Input() rzContainment: string | HTMLElement = null;

  /**
   * Snaps the resizing element to a grid, every x and y pixels.
   * A number for both width and height or an array values like [ x, y ]
   */
  @Input() rzGrid: number | number[] = null;

  /** The minimum width the resizable should be allowed to resize to. */
  @Input() rzMinWidth: number = null;

  /** The minimum height the resizable should be allowed to resize to. */
  @Input() rzMinHeight: number = null;

  /** The maximum width the resizable should be allowed to resize to. */
  @Input() rzMaxWidth: number = null;

  /** The maximum height the resizable should be allowed to resize to. */
  @Input() rzMaxHeight: number = null;

  /** Input css scale transform of element so translations are correct */
  @Input() scale = 1;

  /** Whether to prevent default event */
  @Input() preventDefaultEvent = true;

  /** emitted when start resizing */
  @Output() rzStart = new EventEmitter<IResizeEvent>();

  /** emitted when start resizing */
  @Output() rzResizing = new EventEmitter<IResizeEvent>();

  /** emitted when stop resizing */
  @Output() rzStop = new EventEmitter<IResizeEvent>();

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this._helperBlock = new HelperBlock(el.nativeElement, renderer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rzHandles'] && !changes['rzHandles'].isFirstChange()) {
      this.updateResizable();
    }

    if (changes['rzAspectRatio'] && !changes['rzAspectRatio'].isFirstChange()) {
      this.updateAspectRatio();
    }

    if (changes['rzContainment'] && !changes['rzContainment'].isFirstChange()) {
      this.updateContainment();
    }
  }

  ngOnInit() {
    this.updateResizable();
  }

  ngOnDestroy() {
    this.removeHandles();
    this._containment = null;
    this._helperBlock.dispose();
    this._helperBlock = null;
  }

  ngAfterViewInit() {
    const elm = this.el.nativeElement;
    this._initSize = Size.getCurrent(elm);
    this._initPos = Position.getCurrent(elm);
    this._currSize = Size.copy(this._initSize);
    this._currPos = Position.copy(this._initPos);
    this.updateAspectRatio();
    this.updateContainment();
  }

  /** A method to reset size */
  public resetSize() {
    this._currSize = Size.copy(this._initSize);
    this._currPos = Position.copy(this._initPos);
    this.doResize();
  }

  /** A method to get current status */
  public getStatus() {
    if (!this._currPos || !this._currSize) {
      return null;
    }

    return {
      size: {
        width: this._currSize.width,
        height: this._currSize.height
      },
      position: {
        top: this._currPos.y,
        left: this._currPos.x
      }
    };
  }

  private updateResizable() {
    const element = this.el.nativeElement;

    // clear handles:
    this.renderer.removeClass(element, 'ng-resizable');
    this.removeHandles();

    // create new ones:
    if (this._resizable) {
      this.renderer.addClass(element, 'ng-resizable');
      this.createHandles();
    }
  }

  /** Use it to update aspect */
  private updateAspectRatio() {
    if (typeof this.rzAspectRatio === 'boolean') {
      if (this.rzAspectRatio && this._currSize.height) {
        this._aspectRatio = (this._currSize.width / this._currSize.height);
      } else {
        this._aspectRatio = 0;
      }
    } else {
      let r = Number(this.rzAspectRatio);
      this._aspectRatio = isNaN(r) ? 0 : r;
    }
  }

  /** Use it to update containment */
  private updateContainment() {
    if (!this.rzContainment) {
      this._containment = null;
      return;
    }

    if (typeof this.rzContainment === 'string') {
      if (this.rzContainment === 'parent') {
        this._containment = this.el.nativeElement.parentElement;
      } else {
        this._containment = document.querySelector<HTMLElement>(this.rzContainment);
      }
    } else {
      this._containment = this.rzContainment;
    }
  }

  /** Use it to create handle divs */
  private createHandles() {
    if (!this.rzHandles) {
      return;
    }

    let tmpHandleTypes: string[];
    if (typeof this.rzHandles === 'string') {
      if (this.rzHandles === 'all') {
        tmpHandleTypes = ['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw'];
      } else {
        tmpHandleTypes = this.rzHandles.replace(/ /g, '').toLowerCase().split(',');
      }

      for (let type of tmpHandleTypes) {
        // default handle theme: ng-resizable-$type.
        let handle = this.createHandleByType(type, `ng-resizable-${type}`);
        if (handle) {
          this._handleType.push(type);
          this._handles[type] = handle;
        }
      }
    } else {
      tmpHandleTypes = Object.keys(this.rzHandles);
      for (let type of tmpHandleTypes) {
        // custom handle theme.
        let handle = this.createHandleByType(type, this.rzHandles[type]);
        if (handle) {
          this._handleType.push(type);
          this._handles[type] = handle;
        }
      }
    }

  }

  /** Use it to create a handle */
  private createHandleByType(type: string, css: string): ResizeHandle {
    const _el = this.el.nativeElement;

    if (!type.match(/^(se|sw|ne|nw|n|e|s|w)$/)) {
      console.error('Invalid handle type:', type);
      return null;
    }

    return new ResizeHandle(_el, this.renderer, type, css, this.onMouseDown.bind(this));
  }

  private removeHandles() {
    for (let type of this._handleType) {
      this._handles[type].dispose();
    }

    this._handleType = [];
    this._handles = {};
  }

  onMouseDown(event: MouseEvent | TouchEvent, handle: ResizeHandle) {
    // skip right click;
    if (event instanceof MouseEvent && event.button === 2) {
      return;
    }

    if (this.preventDefaultEvent) {
      // prevent default events
      event.stopPropagation();
      event.preventDefault();
    }

    if (!this._handleResizing) {
      this._origMousePos = Position.fromEvent(event);
      this.startResize(handle);

      this.subscribeEvents();
    }
  }

  private subscribeEvents() {
    this.draggingSub = fromEvent(document, 'mousemove', { passive: false }).subscribe(event => this.onMouseMove(event as MouseEvent));
    this.draggingSub.add(fromEvent(document, 'touchmove', { passive: false }).subscribe(event => this.onMouseMove(event as TouchEvent)));
    this.draggingSub.add(fromEvent(document, 'mouseup', { passive: false }).subscribe(() => this.onMouseLeave()));
    // fix for issue #164
    let isIEOrEdge = /msie\s|trident\//i.test(window.navigator.userAgent);
    if (!isIEOrEdge) {
      this.draggingSub.add(fromEvent(document, 'mouseleave', { passive: false }).subscribe(() => this.onMouseLeave()));
    }
    this.draggingSub.add(fromEvent(document, 'touchend', { passive: false }).subscribe(() => this.onMouseLeave()));
    this.draggingSub.add(fromEvent(document, 'touchcancel', { passive: false }).subscribe(() => this.onMouseLeave()));
  }

  private unsubscribeEvents() {
    this.draggingSub.unsubscribe();
    this.draggingSub = null;
  }

  onMouseLeave() {
    if (this._handleResizing) {
      this.stopResize();
      this._origMousePos = null;
      this.unsubscribeEvents();
    }
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    if (this._handleResizing && this._resizable && this._origMousePos && this._origPos && this._origSize) {
      this.resizeTo(Position.fromEvent(event));
      this.onResizing();
    }
  }

  private startResize(handle: ResizeHandle) {
    const elm = this.el.nativeElement;
    this._origSize = Size.getCurrent(elm);
    this._origPos = Position.getCurrent(elm); // x: left, y: top
    this._currSize = Size.copy(this._origSize);
    this._currPos = Position.copy(this._origPos);
    if (this._containment) {
      this.getBounding();
    }
    this.getGridSize();

    // Add a transparent helper div:
    this._helperBlock.add();
    this._handleResizing = handle;
    this.updateDirection();
    this.rzStart.emit(this.getResizingEvent());
  }

  private stopResize() {
    // Remove the helper div:
    this._helperBlock.remove();
    this.rzStop.emit(this.getResizingEvent());
    this._handleResizing = null;
    this._direction = null;
    this._origSize = null;
    this._origPos = null;
    if (this._containment) {
      this.resetBounding();
    }
  }

  private onResizing() {
    this.rzResizing.emit(this.getResizingEvent());
  }

  private getResizingEvent(): IResizeEvent {
    return {
      host: this.el.nativeElement,
      handle: this._handleResizing ? this._handleResizing.el : null,
      size: {
        width: this._currSize.width,
        height: this._currSize.height
      },
      position: {
        top: this._currPos.y,
        left: this._currPos.x
      },
      direction: { ...this._directionChanged },
    };
  }

  private updateDirection() {
    this._direction = {
      n: !!this._handleResizing.type.match(/n/),
      s: !!this._handleResizing.type.match(/s/),
      w: !!this._handleResizing.type.match(/w/),
      e: !!this._handleResizing.type.match(/e/)
    };

    this._directionChanged = { ...this._direction };

    // if aspect ration should be preserved:
    if (this.rzAspectRatio) {

      // if north then west (unless ne)
      if (this._directionChanged.n && !this._directionChanged.e) {
        this._directionChanged.w = true;
      }

      // if south then east (unless sw)
      if (this._directionChanged.s && !this._directionChanged.w) {
        this._directionChanged.e = true;
      }

      // if east then south (unless ne)
      if (this._directionChanged.e && !this._directionChanged.n) {
        this._directionChanged.s = true;
      }

      // if west then south (unless nw)
      if (this._directionChanged.w && !this._directionChanged.n) {
        this._directionChanged.s = true;
      }
    }
  }

  private resizeTo(p: Position) {
    p.subtract(this._origMousePos).divide(this.scale);

    const tmpX = Math.round(p.x / this._gridSize.x) * this._gridSize.x;
    const tmpY = Math.round(p.y / this._gridSize.y) * this._gridSize.y;

    if (this._direction.n) {
      // n, ne, nw
      this._currPos.y = this._origPos.y + tmpY;
      this._currSize.height = this._origSize.height - tmpY;
    } else if (this._direction.s) {
      // s, se, sw
      this._currSize.height = this._origSize.height + tmpY;
    }

    if (this._direction.e) {
      // e, ne, se
      this._currSize.width = this._origSize.width + tmpX;
    } else if (this._direction.w) {
      // w, nw, sw
      this._currSize.width = this._origSize.width - tmpX;
      this._currPos.x = this._origPos.x + tmpX;
    }

    this.checkBounds();
    this.checkSize();
    this.adjustByRatio();
    this.doResize();
  }

  private doResize() {
    const container = this.el.nativeElement;
    if (!this._direction || this._direction.n || this._direction.s || this._aspectRatio) {
      this.renderer.setStyle(container, 'height', this._currSize.height + 'px');
    }
    if (!this._direction || this._direction.w || this._direction.e || this._aspectRatio) {
      this.renderer.setStyle(container, 'width', this._currSize.width + 'px');
    }
    this.renderer.setStyle(container, 'left', this._currPos.x + 'px');
    this.renderer.setStyle(container, 'top', this._currPos.y + 'px');
  }

  private adjustByRatio() {
    if (this._aspectRatio && !this._adjusted) {
      if (this._direction.e || this._direction.w) {
        const newHeight = Math.floor(this._currSize.width / this._aspectRatio);

        if (this._direction.n) {
          this._currPos.y += this._currSize.height - newHeight;
        }

        this._currSize.height = newHeight;
      } else {
        const newWidth = Math.floor(this._aspectRatio * this._currSize.height);

        if (this._direction.n) {
          this._currPos.x += this._currSize.width - newWidth;
        }

        this._currSize.width = newWidth;
      }
    }
  }

  private checkBounds() {
    if (this._containment) {
      const maxWidth = this._bounding.width - this._bounding.pr - this._bounding.deltaL - this._bounding.translateX - this._currPos.x;
      const maxHeight = this._bounding.height - this._bounding.pb - this._bounding.deltaT - this._bounding.translateY - this._currPos.y;

      if (this._direction.n && (this._currPos.y + this._bounding.translateY < 0)) {
        this._currPos.y = -this._bounding.translateY;
        this._currSize.height = this._origSize.height + this._origPos.y + this._bounding.translateY;
      }

      if (this._direction.w && (this._currPos.x + this._bounding.translateX) < 0) {
        this._currPos.x = -this._bounding.translateX;
        this._currSize.width = this._origSize.width + this._origPos.x + this._bounding.translateX;
      }

      if (this._currSize.width > maxWidth) {
        this._currSize.width = maxWidth;
      }

      if (this._currSize.height > maxHeight) {
        this._currSize.height = maxHeight;
      }

      /**
       * Fix Issue: Additional check for aspect ratio
       * https://github.com/xieziyu/angular2-draggable/issues/132
       */
      if (this._aspectRatio) {
        this._adjusted = false;

        if ((this._direction.w || this._direction.e) &&
            (this._currSize.width / this._aspectRatio) >= maxHeight) {
          const newWidth = Math.floor(maxHeight * this._aspectRatio);

          if (this._direction.w) {
            this._currPos.x += this._currSize.width - newWidth;
          }

          this._currSize.width = newWidth;
          this._currSize.height = maxHeight;
          this._adjusted = true;
        }

        if ((this._direction.n || this._direction.s) &&
            (this._currSize.height * this._aspectRatio) >= maxWidth) {
          const newHeight = Math.floor(maxWidth / this._aspectRatio);

          if (this._direction.n) {
            this._currPos.y += this._currSize.height - newHeight;
          }

          this._currSize.width = maxWidth;
          this._currSize.height = newHeight;
          this._adjusted = true;
        }
      }
    }
  }

  private checkSize() {
    const minHeight = !this.rzMinHeight ? 1 : this.rzMinHeight;
    const minWidth = !this.rzMinWidth ? 1 : this.rzMinWidth;

    if (this._currSize.height < minHeight) {
      this._currSize.height = minHeight;

      if (this._direction.n) {
        this._currPos.y = this._origPos.y + (this._origSize.height - minHeight);
      }
    }

    if (this._currSize.width < minWidth) {
      this._currSize.width = minWidth;

      if (this._direction.w) {
        this._currPos.x = this._origPos.x + (this._origSize.width - minWidth);
      }
    }

    if (this.rzMaxHeight && this._currSize.height > this.rzMaxHeight) {
      this._currSize.height = this.rzMaxHeight;

      if (this._direction.n) {
        this._currPos.y = this._origPos.y + (this._origSize.height - this.rzMaxHeight);
      }
    }

    if (this.rzMaxWidth && this._currSize.width > this.rzMaxWidth) {
      this._currSize.width = this.rzMaxWidth;

      if (this._direction.w) {
        this._currPos.x = this._origPos.x + (this._origSize.width - this.rzMaxWidth);
      }
    }
  }

  private getBounding() {
    const el = this._containment;
    const computed = window.getComputedStyle(el);
    if (computed) {
      let p = computed.getPropertyValue('position');

      const nativeEl = window.getComputedStyle(this.el.nativeElement);
      let transforms = nativeEl.getPropertyValue('transform').replace(/[^-\d,]/g, '').split(',');

      this._bounding = {};
      this._bounding.width = el.clientWidth;
      this._bounding.height = el.clientHeight;
      this._bounding.pr = parseInt(computed.getPropertyValue('padding-right'), 10);
      this._bounding.pb = parseInt(computed.getPropertyValue('padding-bottom'), 10);
      this._bounding.deltaL = this.el.nativeElement.offsetLeft - this._currPos.x;
      this._bounding.deltaT = this.el.nativeElement.offsetTop - this._currPos.y;

      if (transforms.length >= 6) {
        this._bounding.translateX = parseInt(transforms[4], 10);
        this._bounding.translateY = parseInt(transforms[5], 10);
      } else {
        this._bounding.translateX = 0;
        this._bounding.translateY = 0;
      }

      this._bounding.position = computed.getPropertyValue('position');

      if (p === 'static') {
        this.renderer.setStyle(el, 'position', 'relative');
      }
    }
  }

  private resetBounding() {
    if (this._bounding && this._bounding.position === 'static') {
      this.renderer.setStyle(this._containment, 'position', 'relative');
    }
    this._bounding = null;
  }

  private getGridSize() {
    // set default value:
    this._gridSize = { x: 1, y: 1 };

    if (this.rzGrid) {
      if (typeof this.rzGrid === 'number') {
        this._gridSize = { x: this.rzGrid, y: this.rzGrid };
      } else if (Array.isArray(this.rzGrid)) {
        this._gridSize = { x: this.rzGrid[0], y: this.rzGrid[1] };
      }
    }
  }
}
