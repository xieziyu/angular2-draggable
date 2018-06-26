import {
  Directive, ElementRef, Renderer2,
  Input, Output, OnInit, HostListener,
  EventEmitter, OnChanges, SimpleChanges,
  OnDestroy, AfterViewInit
} from '@angular/core';

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

  /** emitted when start resizing */
  @Output() rzStart = new EventEmitter<IResizeEvent>();

  /** emitted when start resizing */
  @Output() rzResizing = new EventEmitter<IResizeEvent>();

  /** emitted when stop resizing */
  @Output() rzStop = new EventEmitter<IResizeEvent>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rzHandles'] && !changes['rzHandles'].isFirstChange()) {
      this.updateResizable();
    }
  }

  ngOnInit() {
    this.updateResizable();
  }

  ngOnDestroy() {
    this.removeHandles();
  }

  ngAfterViewInit() {
    const elm = this.el.nativeElement;
    this._initSize = Size.getCurrent(elm);
    this._initPos = Position.getCurrent(elm);
    this._currSize = Size.copy(this._initSize);
    this._currPos = Position.copy(this._initPos);
  }

  /** A method to reset size */
  public resetSize() {
    this._currSize = Size.copy(this._initSize);
    this._currPos = Position.copy(this._initPos);
    this.doResize();
  }

  /** A method to reset size */
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
    this._handleResizing = handle;
    this.rzStart.emit(this.getResizingEvent());
  }

  private stopResize() {
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
      this._currSize.height = this._origSize.height - p.y;
      this._currPos.y = this._origPos.y + p.y;
    } else if (this._handleResizing.type.match(/s/)) {
      // s, se, sw
      this._currSize.height = this._origSize.height + p.y;
    }

    if (this._handleResizing.type.match(/e/)) {
      // e, ne, se
      this._currSize.width = this._origSize.width + p.x;
    } else if (this._handleResizing.type.match(/w/)) {
      // w, nw, sw
      this._currSize.width = this._origSize.width - p.x;
      this._currPos.x = this._origPos.x + p.x;
    }

    this.doResize();
  }

  private doResize() {
    const container = this.el.nativeElement;
    this.renderer.setStyle(container, 'height', this._currSize.height + 'px');
    this.renderer.setStyle(container, 'width', this._currSize.width + 'px');
    this.renderer.setStyle(container, 'left', this._currPos.x + 'px');
    this.renderer.setStyle(container, 'top', this._currPos.y + 'px');
  }
}
