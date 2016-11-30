// mods by Patrick OReilly
// twitter: @pato_reilly
export default class MyNewGame {
  constructor(){
    this.game = new window.Phaser.Game(800, 600, window.Phaser.CANVAS, 'phaser-example', { preload: this.preload, create: this.create, update: this.pdate, render: this.render });
    this.player;
    this.analog;
    this.cursors;
    this.arrow;
    this.catchflag = false;
    this.launchVelocity = 0;
    this.Xvector;
    this.Yvector;
  }

  preload () {

    this.game.load.image('background','assets/misc/starfield.png');
    this.game.load.image('player','assets/sprites/phaser-dude.png');
    this.game.load.image('analog', 'assets/tests/fusia.png');
    this.game.load.image('arrow', 'assets/sprites/longarrow2.png');

  }

  create() {

    this.game.physics.startSystem(window.Phaser.Physics.ARCADE);

    this.game.world.setBounds(0, 0, 3400, 1000);
    this.game.add.tileSprite(0, 0, 3400, 1000, 'background');

    this.analog = this.game.add.sprite(200, 450, 'analog');
    this.analog.width = 8;
    this.analog.rotation = 220;
    this.analog.alpha = 0;
    this.analog.anchor.setTo(0.5, 0.0);

    this.arrow = this.game.add.sprite(200, 450, 'arrow');
    this.arrow.anchor.setTo(0.1, 0.5);
    this.arrow.alpha = 0;

    this.player = this.game.add.sprite(150, 320, 'player');

    this.game.physics.enable([this.player], window.Phaser.Physics.ARCADE);

    this.player.anchor.set(0.5);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(0.9);
    this.player.body.drag.set(20, 20);

    // Enable input.
    this.player.inputEnabled = true;
    this.player.input.start(0, true);
    this.player.events.onInputDown.add(() => {
      console.log(this);
      this.set();
    }, this);
    this.player.events.onInputUp.add(() => {
      this.launch();
    });

    this.game.camera.follow(this.player, window.Phaser.Camera.FOLLOW_TOPDOWN);

  }
  
  set(player,pointer) {

    this.catchFlag = true;
    this.game.camera.follow(null);

    player.body.moves = false;
    player.body.velocity.setTo(0, 0);
    this.arrow.reset(player.x, player.y);
    this.analog.reset(player.x, player.y);

  }


  launch(){

    this.catchFlag = false;
    this.player.body.moves = true;
    this.game.camera.follow(this.player, window.Phaser.Camera.FOLLOW_TOPDOWN);

    this.arrow.alpha = 0;
    this.analog.alpha = 0;

    this.Xvector = (this.arrow.x - this.player.x) * 3;
    this.Yvector = (this.arrow.y - this.player.y) * 3;

    this.player.body.velocity.setTo(this.Xvector, this.Yvector);

  }

  update() {

    this.arrow.rotation = this.game.physics.arcade.angleBetween(this.arrow, this.player);

    if (this.catchFlag === true){
      //  Track the ball sprite to the mouse  
      this.player.x = this.game.input.activePointer.worldX; 
      this.player.y = this.game.input.activePointer.worldY;

      this.arrow.alpha = 1;    
      this.analog.alpha = 0.5;
      this.analog.rotation = this.arrow.rotation - 3.14 / 2;
      this.analog.height = this.game.physics.arcade.distanceBetween(this.arrow, this.player);    
      this.launchVelocity = this.analog.height;
    }

  }

  render() {

    this.game.debug.text("Drag the sprite and release to launch", 32, 32, 'rgb(0,255,0)');
    this.game.debug.cameraInfo(this.game.camera, 32, 64);
    this.game.debug.spriteCoords(this.player, 32, 150);
    this.game.debug.text("Launch Velocity: " + parseInt(this.launchVelocity), 550, 32, 'rgb(0,255,0)');

  }
};
