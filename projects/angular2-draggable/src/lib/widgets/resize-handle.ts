import { Renderer2 } from '@angular/core';

export class ResizeHandle {
  protected _handle: Element;
  private _onResize;

  constructor(
    protected parent: Element,
    protected renderer: Renderer2,
    public type: string,
    public css: string,
    private onMouseDown: any
  ) {
    // generate handle div
    let handle = renderer.createElement('div');
    renderer.addClass(handle, 'ng-resizable-handle');
    renderer.addClass(handle, css);

    // add default diagonal for se handle
    if (type === 'se') {
      renderer.addClass(handle, 'ng-resizable-diagonal');
    }

    // append div to parent
    if (this.parent) {
      parent.appendChild(handle);
    }

    // create and register event listener
    this._onResize = (event) => { onMouseDown(event, this); };
    handle.addEventListener('mousedown', this._onResize, { passive: false });
    handle.addEventListener('touchstart', this._onResize, { passive: false });

    // done
    this._handle = handle;
  }

  dispose() {
    this._handle.removeEventListener('mousedown', this._onResize);
    this._handle.removeEventListener('touchstart', this._onResize);

    if (this.parent) {
      this.parent.removeChild(this._handle);
    }
    this._handle = null;
    this._onResize = null;
  }

  get el() {
    return this._handle;
  }
}
