import { ElementRef, Renderer, OnInit } from '@angular/core';
export declare class AngularDraggableDirective implements OnInit {
    private el;
    private renderer;
    private allowDrag;
    private moving;
    private orignal;
    private oldZIndex;
    private oldPosition;
    handle: HTMLElement;
    ngDraggable: any;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    private getPosition(x, y);
    private moveTo(x, y);
    private pickUp();
    private putBack();
    onMouseDown(event: MouseEvent): void;
    onMouseUp(): void;
    onMouseLeave(): void;
    onMouseMove(event: MouseEvent): void;
    onTouchEnd(): void;
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
}
