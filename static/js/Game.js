import Input from './Input.js';
import Apple from './Apple.js';
import Grid from './Grid.js';
import Snake from './Snake.js';
import Stage from './Stage.js';

export default class Game {
  constructor(cellOnX, cellOnY, sideSize, level = 1) {
    this.fps = 100 / level;
    this.boundryX = cellOnX;
    this.boundryY = cellOnY;
    this.size = sideSize;
    this.status = false;
    this.isStart = false;
    this.isPause = false;
    this.subscribers = [];
    this._multiplier = 1;
    this._score = 0;
    this._fixScore = 0;
    this._loop;

    this.multiplier = level.toString();
    this.pauseGame = this.pauseGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.loop = this.loop.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }
  init() {
    this._grid = new Grid(this);
    this._apple = new Apple(this);
    this._snake = new Snake(this);
    this._input = new Input();
    this._stage = new Stage(
      this,
      'game',
      this.boundryX * this.size,
      this.boundryY * this.size
    );

    this._input.subscribe(this._snake.direction);
    this._input.subscribe(this.pauseGame);
    this._input.subscribe(this.startGame);

    this._stage.drawMenu();
  }
  startGame(keys) {
    keys.forEach(key => {
      if (key === 13) {
        if (!this.isStart) {
          this.isStart = !this.isStart;
          this._grid.init();
          this._apple.init();
          this._snake.init();
          this.score = 0;
          this._loop = setInterval(this.loop, this.fps);
        }
      }
    });
  }
  pauseGame(keys) {
    keys.forEach(key => {
      if (key === 32 && this.isStart) {
        this.isPause = !this.isPause;
        if (this.isPause) {
          this._stage.drawPause();
          this._loop = clearInterval(this._loop);
        } else {
          this._loop = setInterval(this.loop, this.fps);
        }
      }
    });
  }
  stopGame() {
    this._loop = clearInterval(this._loop);
    this._stage.clear();
    this._stage.drawGameover();
    this.isStart = !this.isStart;
    this.fixScore = this._score;
  }
  loop() {
    // Collision
    this.status = this._snake.death(); // Check if snake die in next move and finish game
    if (this.status) {
      this.stopGame();
      return;
    }
    // Update
    if (this._snake.collision(this._apple)) this._apple.init(); // check if snake eat apple and create new apple
    this._snake.update();
    // Clean
    this._stage.clear();
    // Draw
    this._stage.draw(this._snake.coordinates);
    this._stage.drawApple(this._apple.coordinates);
  }
  subscribe(subscriber) {
    subscriber({ score: this.score });
    this.subscribers.push(subscriber);
  }
  publish() {
    this.subscribers.forEach(subscriber =>
      subscriber({ score: this.score, fixScore: this.fixScore })
    );
  }
  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
    this.publish();
  }
  get fixScore() {
    return this._fixScore;
  }
  set fixScore(value) {
    this._fixScore = value;
    this.publish();
  }
  set multiplier(value) {
    switch (value) {
      case '1':
        this._multiplier = 1;
        break;
      case '2':
        this._multiplier = 2;
        break;
      case '3':
        this._multiplier = 5;
        break;
      case '4':
        this._multiplier = 10;
        break;
      default:
        this._multiplier = 1;
        break;
    }
  }
  get multiplier() {
    return this._multiplier;
  }
}
