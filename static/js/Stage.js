export default class Stage {
  constructor(game, parent, width, height) {
    this._game = game;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.style = {
      background: '#b6bf01',
      color: '#6a6a6a',
      fontStyle: '30px Comic Sans MS',
    };
    if (!parent) {
      document.body.appendChild(canvas);
    } else {
      document.getElementById(parent).appendChild(this.canvas);
    }
  }
  drawMenu() {
    this.ctx.fillStyle = this.style.background;

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = this.style.fontStyle;
    this.ctx.fillStyle = this.style.color;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'Game Start',
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.font = '15px Comic Sans MS';
    this.ctx.fillText(
      'Press enter to start again',
      this.canvas.width / 2,
      this.canvas.height / 2 + 30
    );
  }
  drawPause() {
    this.ctx.fillStyle = this.style.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = this.style.fontStyle;
    this.ctx.fillStyle = this.style.color;
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Pause', this.canvas.width / 2, this.canvas.height / 2);
  }
  drawGameover() {
    this.ctx.fillStyle = this.style.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = this.style.fontStyle;
    this.ctx.fillStyle = this.style.color;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      'Game Over',
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.font = '15px Comic Sans MS';
    this.ctx.fillText(
      'Press enter to start again',
      this.canvas.width / 2,
      this.canvas.height / 2 + 30
    );
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw(collection) {
    collection.forEach(cell => {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(
        (cell.x * this.canvas.width) / this._game.boundryX,
        (cell.y * this.canvas.height) / this._game.boundryY,
        this.canvas.width / this._game.boundryX,
        this.canvas.height / this._game.boundryY
      );
    });
  }
  drawApple(collection) {
    collection.forEach(cell => {
      this.ctx.fillStyle = 'black';
      const width = this.canvas.width / this._game.boundryX / 3;
      const height = this.canvas.height / this._game.boundryY / 3;
      for (let i = 0; i < 9; i++) {
        if (i % 2 !== 0) {
          this.ctx.fillRect(
            (cell.x * this.canvas.width) / this._game.boundryX +
              width * Math.floor(i / 3),
            (cell.y * this.canvas.height) / this._game.boundryY +
              height * (i % 3),
            width,
            height
          );
        }
      }
    });
  }
}
