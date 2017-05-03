import { Directive, ElementRef, Renderer, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';

class Position {
  constructor(public x: number, public y: number) { }
}

@Directive({
  selector: '[ngDraggable]'
})
export class AngularDraggableDirective implements OnInit{
  private allowDrag: boolean = true;
  private moving: boolean = false;
  private orignal: Position = null;

  @Input() handle: HTMLElement;

  @Input()
  set ngDraggable(setting: any) {
    if (setting != undefined && setting != null && setting != '') {
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
      this.renderer.setElementStyle(this.el.nativeElement, 'position', 'relative');
      
      let element = this.handle ? this.handle : this.el.nativeElement;
      this.renderer.setElementClass(element, 'ng-draggable', true);
    }
  }

  private getPosition(x: number, y: number) {
    return new Position(
      x - this.el.nativeElement.style.left.replace('px',''),
      y - this.el.nativeElement.style.top.replace('px','')
    );
  }

  private moveTo(x: number, y: number) {
    if (this.orignal) {
      this.el.nativeElement.style.left = (x - this.orignal.x) + 'px';
      this.el.nativeElement.style.top = (y - this.orignal.y) + 'px';
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
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.moving = false;
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
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
    this.moving = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    this.moving = true;
    this.orignal = this.getPosition(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.stopPropagation();
    if (this.moving && this.allowDrag) {
      this.moveTo(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    }
  }
}