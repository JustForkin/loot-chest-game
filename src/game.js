import 'script!pixi.js';
import 'script!p2';
import Phaser from 'phaser';

export default class Game extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'phaser-example', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

}

class GameState extends Phaser.State {

  create() {
    const center = { x: this.game.world.centerX, y: this.game.world.centerY };
    const text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
    text.anchor.set(0.5);
    
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    this.game.scale.setResizeCallback(this.gameResized, this);

  }

  gameResized(manager, bounds){
    const scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);

    manager.setUserScale(scale, scale, 0, 0);
  }
  
}

class RainbowText extends Phaser.Text {

  constructor(game, x, y, text) {
    super(game, x, y, text, { font: "45px Arial", fill: "#ff0044", align: "center" });
    this._speed = 125; //ms
    this._colorIndex = 0;
    this._colors = ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf'];
    this.colorize();
    this.startTimer();
    this.game.stage.addChild(this);
  }
	
  startTimer() {
    this.game.time.events.loop(this._speed, this.colorize, this).timer.start();
  }

  colorize() {
    for (let i = 0; i < this.text.length; i++) {
      if (this._colorIndex === this._colors.length) {
        this._colorIndex = 0;
      }
      this.addColor(this._colors[this._colorIndex], i);
      this._colorIndex++;
    }
  }
}

const game = new Game();

export { game };