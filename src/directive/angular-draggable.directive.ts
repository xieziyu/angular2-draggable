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
  private oldZIndex: string = '';
  private oldPosition: string = '';

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
    let left = parseInt(this.el.nativeElement.style.left.replace('px',''));
    let top = parseInt(this.el.nativeElement.style.top.replace('px',''));

    if (window) {
      left = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("left"));
      top = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("top"));
    }
    
    return new Position(x - left, y - top);
  }

  private moveTo(x: number, y: number) {
    if (this.orignal) {
      this.renderer.setElementStyle(this.el.nativeElement, 'left', `${x - this.orignal.x}px`);
      this.renderer.setElementStyle(this.el.nativeElement, 'top', `${y - this.orignal.y}px`);
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
  }

  private putBack() {
    if (this.oldZIndex) {
      this.renderer.setElementStyle(this.el.nativeElement, 'z-index', this.oldZIndex);
    } else {
      this.el.nativeElement.style.removeProperty('z-index');
    }
  }

  // Support Mouse Events:
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // 1. skip right click;
    // 2. if handle is set, the element can only be moved by handle
    if (event.button == 2 || (this.handle !== undefined && event.target !== this.handle)) {
      return;
    }

    this.moving = true;
    this.orignal = this.getPosition(event.clientX, event.clientY);
    this.pickUp();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.putBack();
    this.moving = false;
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.putBack();
    this.moving = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:MouseEvent) {
    if (this.moving && this.allowDrag) {
      this.moveTo(event.clientX, event.clientY);
    }
  }

  // Support Touch Events:
  @HostListener('document:touchend')
  onTouchEnd() {
    this.putBack();
    this.moving = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    this.moving = true;
    this.orignal = this.getPosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    this.pickUp();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.stopPropagation();
    if (this.moving && this.allowDrag) {
      this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    }
  }
}