require('./scss/main.scss');
require.ensure('game',(g) => {
  const game = require('game');
  done();
});

function done() {
  console.log("done");
  // window.MyNewGame = require('logic');
}