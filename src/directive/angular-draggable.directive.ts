import { Directive, ElementRef, Renderer, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';

class Position {
  constructor(public x: number, public y: number) { }
}

@Directive({
  selector: '[ngDraggable]'
})
export class AngularDraggableDirective implements OnInit {
  private allowDrag: boolean = true;
  private moving: boolean = false;
  private orignal: Position = null;
  private oldTrans: Position = new Position(0, 0);
  private tempTrans: Position = new Position(0, 0);
  private oldZIndex: string = '';
  private oldPosition: string = '';

  @Output() started = new EventEmitter<any>();
  @Output() stopped = new EventEmitter<any>();

  @Input() handle: HTMLElement;

  @Input()
  set ngDraggable(setting: any) {
    if (setting !== undefined && setting !== null && setting !== '') {
      this.allowDrag = !!setting;

      let element = this.handle ? this.handle : this.el.nativeElement;

      if (this.allowDrag) {
        this.renderer.setElementClass(element, 'ng-draggable', true);
      }
      else {
        this.renderer.setElementClass(element, 'ng-draggable', false);
      }
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    if (this.allowDrag) {
      let element = this.handle ? this.handle : this.el.nativeElement;
      this.renderer.setElementClass(element, 'ng-draggable', true);
    }
  }

  private getPosition(x: number, y: number) {   
    return new Position(x, y);
  }

  private moveTo(x: number, y: number) {
    if (this.orignal) {
      this.tempTrans.x = x - this.orignal.x;
      this.tempTrans.y = y - this.orignal.y;
      let value = `translate(${this.tempTrans.x + this.oldTrans.x}px, ${this.tempTrans.y + this.oldTrans.y}px)`;
      this.renderer.setElementStyle(this.el.nativeElement, 'transform', value);
      this.renderer.setElementStyle(this.el.nativeElement, '-webkit-transform', value);
      this.renderer.setElementStyle(this.el.nativeElement, '-ms-transform', value);
      this.renderer.setElementStyle(this.el.nativeElement, '-moz-transform', value);
      this.renderer.setElementStyle(this.el.nativeElement, '-o-transform', value);
    }
  }

  private pickUp() {
    // get old z-index and position:
    this.oldZIndex = this.el.nativeElement.style.zIndex ? this.el.nativeElement.style.zIndex : '';
    this.oldPosition = this.el.nativeElement.style.position ? this.el.nativeElement.style.position : '';

    if (window) {
      this.oldZIndex = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("z-index");
      this.oldPosition = window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("position");
    }

    // setup default position:
    let position = 'relative';

    // check if old position is draggable:
    if (this.oldPosition && (
        this.oldPosition === 'absolute' ||
        this.oldPosition === 'fixed' ||
        this.oldPosition === 'relative')) {
      position = this.oldPosition;
    }

    this.renderer.setElementStyle(this.el.nativeElement, 'position', position);
    this.renderer.setElementStyle(this.el.nativeElement, 'z-index', '99999');

    if (!this.moving) {
      this.started.emit(this.el.nativeElement);
      this.moving = true;
    }
  }

  private putBack() {
    if (this.oldZIndex) {
      this.renderer.setElementStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
    } else {
      this.el.nativeElement.style.removeProperty('z-index');
    }

    if (this.moving) {
      this.stopped.emit(this.el.nativeElement);
      this.moving = false;
      this.oldTrans.x += this.tempTrans.x;
      this.oldTrans.y += this.tempTrans.y;
    }
  }

  // Support Mouse Events:
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    // 1. skip right click;
    // 2. if handle is set, the element can only be moved by handle
    if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
      return;
    }

    this.orignal = this.getPosition(event.clientX, event.clientY);
    this.pickUp();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.putBack();
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.putBack();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: any) {
    if (this.moving && this.allowDrag) {
      this.moveTo(event.clientX, event.clientY);
    }
  }

  // Support Touch Events:
  @HostListener('document:touchend')
  onTouchEnd() {
    this.putBack();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    event.stopPropagation();
    this.orignal = this.getPosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    this.pickUp();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: any) {
    event.stopPropagation();
    if (this.moving && this.allowDrag) {
      this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    }
  }
}