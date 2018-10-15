export interface IPosition {
  x: number;
  y: number;
}

export class Position implements IPosition {
  constructor(public x: number, public y: number) { }

  static fromEvent(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent) {
      return new Position(e.clientX, e.clientY);
    } else {
      return new Position(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  }

  static isIPosition(obj): obj is IPosition {
    return !!obj && ('x' in obj) && ('y' in obj);
  }

  static getCurrent(el: Element) {
    let pos = new Position(0, 0);

    if (window) {
      const computed = window.getComputedStyle(el);
      if (computed) {
        pos.x = parseInt(computed.getPropertyValue('left'), 10);
        pos.y = parseInt(computed.getPropertyValue('top'), 10);
      }
      return pos;
    } else {
      console.error('Not Supported!');
      return null;
    }
  }

  static copy(p: Position) {
    return new Position(0, 0).set(p);
  }

  get value(): IPosition {
    return { x: this.x, y: this.y };
  }

  add(p: IPosition) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  subtract(p: IPosition) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  set(p: IPosition) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }
}
