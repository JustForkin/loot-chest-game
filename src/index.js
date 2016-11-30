require('./scss/main.scss');

require(['script!pixi.js','script!p2','script!phaser'],() => {
  window.MyNewGame = require('logic');
  done();
});

function done() {
  console.log("done");
  // window.MyNewGame = require('logic');
}