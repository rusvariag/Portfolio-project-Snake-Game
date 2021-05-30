export default class Snake {
  constructor(game) {
    this._game = game;
    this.direction = this.direction.bind(this);
    this.init();
  }
  init() {
    this.speed = 1;
    this.eating = false;
    this.head = { x: 9, y: 9 };
    this.velocity = { x: 1, y: 0 };
    this.tail = [];
    this._game._grid.occupy(this.head);
  }
  direction(keys) {
    keys.forEach(key => {
      const neck = this.tail.slice(-1);
      switch (key) {
        case 38:
          if (neck.length === 0 || neck.pop().y !== this.head.y - this.speed) {
            this.velocity.x = 0;
            this.velocity.y = this.speed * -1;
          }
          break;
        case 40:
          if (neck.length === 0 || neck.pop().y !== this.head.y + this.speed) {
            this.velocity.x = 0;
            this.velocity.y = this.speed;
          }
          break;
        case 37:
          if (neck.length === 0 || neck.pop().x !== this.head.x - this.speed) {
            this.velocity.y = 0;
            this.velocity.x = this.speed * -1;
          }
          break;
        case 39:
          if (neck.length === 0 || neck.pop().x !== this.head.x + this.speed) {
            this.velocity.y = 0;
            this.velocity.x = this.speed;
          }
          break;
        default:
          break;
      }
    });
  }
  death() {
    // Create next head coordinates
    const shadow = {
      x: this.head.x + this.velocity.x,
      y: this.head.y + this.velocity.y,
    };
    // Check if snake hit the wall
    if (!this._game._grid.isExist(shadow)) {
      return true;
    }
    // Check if snake hit itself
    if (this._game._grid.isOccupied(shadow)) {
      return true;
    }
  }
  update() {
    // Move snake tail if it not ate apple
    if (!this.eating) {
      // Push the head to tail Array
      this.tail.push({ x: this.head.x, y: this.head.y });
      // Slice from tail last cell
      const [cell] = this.tail.splice(0, 1);
      this._game._grid.deoccupy(cell);
    }
    // move the head to next cell
    this.head.x += this.velocity.x;
    this.head.y += this.velocity.y;
    this._game._grid.occupy(this.head);
  }
  collision(apple) {
    // Check if snake ate apple
    if (apple.x === this.head.x && apple.y === this.head.y) {
      this.tail.push({ x: apple.x, y: apple.y });
      this.eating = true;
      this._game.score += this._game.multiplier;
      return true;
    } else {
      this.eating = false;
      return false;
    }
  }
  get coordinates() {
    return [this.head, ...this.tail];
  }
}
