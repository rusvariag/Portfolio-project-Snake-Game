export default class Apple {
  constructor(game) {
    this._game = game;
    this.init();
  }
  init() {
    const arr = this._game._grid.gridArray.filter(curr => !curr.value);
    const idx = Math.floor(Math.random() * (arr.length - 1));
    this.x = arr[idx].x;
    this.y = arr[idx].y;
  }
  get coordinates() {
    return [{ x: this.x, y: this.y }];
  }
}
