import {
  Directive, ElementRef, Renderer2,
  Input, Output, OnInit, HostListener,
  EventEmitter, OnChanges, SimpleChanges,
  OnDestroy, AfterViewInit
} from '@angular/core';

import { HelperBlock } from './widgets/helper-block';
import { ResizeHandle } from './widgets/resize-handle';
import { ResizeHandleType } from './models/resize-handle-type';
import { Position } from './models/position';
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

  private _bounding: any = null;

  private _minSize: { width: number, height: number } = null;
  /**
   * Bugfix: iFrames, and context unrelated elements block all events, and are unusable
   * https://github.com/xieziyu/angular2-draggable/issues/84
   */
  private _helperBlock: HelperBlock = null;

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

  @Input() rzMinWidth: number = null;
  @Input() rzMinHeight: number = null;

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

    if ((changes['rzMinWidth'] && !changes['rzMinWidth'].isFirstChange()) ||
      (changes['rzMinHeight'] && !changes['rzMinHeight'].isFirstChange()))  {
      this.updateMinSize();
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
    this.updateMinSize();
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

  /** Use it to update minimum sizes */
  private updateMinSize() {
    console.log(this.rzMinWidth);
    console.log(this.rzMinHeight);
    if (!this.rzMinWidth || !this.rzMinHeight) {
      this._minSize = null;
      return;
    }

    this._minSize = {'width': this.rzMinWidth, 'height': this.rzMinHeight};
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

    // prevent default events
    event.stopPropagation();
    event.preventDefault();

    if (!this._handleResizing) {
      const elm = this.el.nativeElement;
      this._origMousePos = Position.fromEvent(event);
      this._origSize = Size.getCurrent(elm);
      this._origPos = Position.getCurrent(elm); // x: left, y: top
      this._currSize = Size.copy(this._origSize);
      this._currPos = Position.copy(this._origPos);
      if (this._containment) {
        this.getBounding();
      }
      this.startResize(handle);
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:mouseleave')
  @HostListener('document:touchend')
  @HostListener('document:touchcancel')
  onMouseLeave() {
    if (this._handleResizing) {
      this.stopResize();
      this._origMousePos = null;
      this._origSize = null;
      this._origPos = null;
      if (this._containment) {
        this.resetBounding();
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (this._handleResizing && this._resizable && this._origMousePos && this._origPos && this._origSize) {
      this.resizeTo(Position.fromEvent(event));
      this.onResizing();
    }
  }

  private startResize(handle: ResizeHandle) {
    // Add a transparent helper div:
    this._helperBlock.add();
    this._handleResizing = handle;
    this.rzStart.emit(this.getResizingEvent());
  }

  private stopResize() {
    // Remove the helper div:
    this._helperBlock.remove();
    this.rzStop.emit(this.getResizingEvent());
    this._handleResizing = null;
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
      }
    };
  }

  private resizeTo(p: Position) {
    p.subtract(this._origMousePos);

    if (this._handleResizing.type.match(/n/)) {
      // n, ne, nw
      this._currPos.y = this._origPos.y + p.y;
      this._currSize.height = this._origSize.height - p.y;

      // check bounds
      if (this._containment) {
        if (this._currPos.y < 0) {
          this._currPos.y = 0;
          this._currSize.height = this._origSize.height + this._origPos.y;
        }
      }

      if (this._currSize.height < 1) {
        this._currSize.height = 1;
        this._currPos.y = this._origPos.y + (this._origSize.height - 1);
      }

      // aspect ratio
      this.adjustByRatio('h');
    } else if (this._handleResizing.type.match(/s/)) {
      // s, se, sw
      this._currSize.height = this._origSize.height + p.y;

      // aspect ratio
      this.adjustByRatio('h');
    }

    if (this._handleResizing.type.match(/e/)) {
      // e, ne, se
      this._currSize.width = this._origSize.width + p.x;

      // aspect ratio
      this.adjustByRatio('w');
    } else if (this._handleResizing.type.match(/w/)) {
      // w, nw, sw
      this._currSize.width = this._origSize.width - p.x;
      this._currPos.x = this._origPos.x + p.x;

      // check bounds
      if (this._containment) {
        if (this._currPos.x < 0) {
          this._currPos.x = 0;
          this._currSize.width = this._origSize.width + this._origPos.x;
        }
      }

      if (this._currSize.width < 1) {
        this._currSize.width = 1;
        this._currPos.x = this._origPos.x + (this._origSize.width - 1);
      }

      // aspect ratio
      this.adjustByRatio('w');
    }

    this.checkBounds();
    this.checkMinSize();
    this.doResize();
  }

  private doResize() {
    const container = this.el.nativeElement;
    this.renderer.setStyle(container, 'height', this._currSize.height + 'px');
    this.renderer.setStyle(container, 'width', this._currSize.width + 'px');
    this.renderer.setStyle(container, 'left', this._currPos.x + 'px');
    this.renderer.setStyle(container, 'top', this._currPos.y + 'px');
  }

  private adjustByRatio(d: string) {
    if (this._aspectRatio) {
      if (d === 'w') {
        this._currSize.height = this._currSize.width / this._aspectRatio;
      } else {
        this._currSize.width = this._aspectRatio * this._currSize.height;
      }
    }
  }

  private checkBounds() {
    if (this._containment) {
      const container = this._containment;
      const maxWidth = this._bounding.width - this._bounding.pr - this.el.nativeElement.offsetLeft;
      const maxHeight = this._bounding.height - this._bounding.pb - this.el.nativeElement.offsetTop;

      if (this._currSize.width > maxWidth) {
        this._currSize.width = maxWidth;
      }

      if (this._currSize.height > maxHeight) {
        this._currSize.height = maxHeight;
      }
    }
  }

  private checkMinSize() {
    if (this._minSize) {
      const minWidth = this._minSize['width'];
      const minHeight = this._minSize['height'];

      if (this._currSize.width < minWidth) {
        this._currSize.width = minWidth;
      }

      if (this._currSize.height < minHeight) {
        this._currSize.height = minHeight;
      }
    }
  }

  private getBounding() {
    const el = this._containment;
    const computed = window.getComputedStyle(el);
    if (computed) {
      let p = computed.getPropertyValue('position');

      this._bounding = {};
      this._bounding.width = el.clientWidth;
      this._bounding.height = el.clientHeight;
      this._bounding.pr = parseInt(computed.getPropertyValue('padding-right'), 10);
      this._bounding.pb = parseInt(computed.getPropertyValue('padding-bottom'), 10);
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
}
