export default class Grid {
  constructor(game) {
    this._game = game;
    this.grid = new Map();
    this.init();
  }
  init() {
    this.grid.clear();
    for (var i = 0; i < this._game.boundryX; i++) {
      for (var j = 0; j < this._game.boundryY; j++) {
        this.grid.set(`${i}|${j}`, false);
      }
    }
  }
  occupy(cell) {
    this.grid.set(`${cell.x}|${cell.y}`, true);
  }
  deoccupy(cell) {
    this.grid.set(`${cell.x}|${cell.y}`, false);
  }
  isOccupied(cell) {
    return this.grid.get(`${cell.x}|${cell.y}`);
  }
  isExist(cell) {
    return this.grid.has(`${cell.x}|${cell.y}`);
  }
  get gridArray() {
    return Array.from(this.grid, currentValue => {
      const [x, y] = currentValue[0].split('|');
      return { x: parseInt(x), y: parseInt(y), value: currentValue[1] };
    });
  }
}
