import { Renderer2 } from '@angular/core';

export class HelperBlock {
  protected _helper: Element;
  private _added = false;

  constructor(
    protected parent: Element,
    protected renderer: Renderer2
  ) {
    // generate helper div
    let helper = renderer.createElement('div');
    renderer.setStyle(helper, 'position', 'absolute');
    renderer.setStyle(helper, 'width', '100%');
    renderer.setStyle(helper, 'height', '100%');
    renderer.setStyle(helper, 'background-color', 'transparent');
    renderer.setStyle(helper, 'top', '0');
    renderer.setStyle(helper, 'left', '0');

    // done
    this._helper = helper;
  }

  add() {
    // append div to parent
    if (this.parent && !this._added) {
      this.parent.appendChild(this._helper);
      this._added = true;
    }
  }

  remove() {
    if (this.parent && this._added) {
      this.parent.removeChild(this._helper);
      this._added = false;
    }
  }

  dispose() {
    this._helper = null;
    this._added = false;
  }

  get el() {
    return this._helper;
  }
}
