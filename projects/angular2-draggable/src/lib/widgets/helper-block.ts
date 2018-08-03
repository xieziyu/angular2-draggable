import { Renderer2 } from '@angular/core';

export class HelperBlock {
  protected _helper: Element;

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
    if (this.parent) {
      this.parent.appendChild(this._helper);
    }
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this._helper);
    }
  }

  dispose() {
    this._helper = null;
  }

  get el() {
    return this._helper;
  }
}
