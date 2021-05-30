export default class Input {
  constructor() {
    this._keys = new Set();
    this.subscribers = [];
    this.init();
  }
  init() {
    document.addEventListener('keydown', e => this.onKeyDown(e));
    document.addEventListener('keyup', e => this.onKeyUp(e));
  }
  onKeyDown(e) {
    this._keys.add(e.keyCode);
    this.publish();
  }
  onKeyUp(e) {
    this._keys.delete(e.keyCode);
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
  publish() {
    this.subscribers.forEach(subscriber => subscriber(this._keys));
  }
}
