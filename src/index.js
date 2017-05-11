//this is a synchronous require
require('./scss/main.scss');

//this is an asynchronous require
require.ensure('game',(g) => {
  const game = require('game');
  done();
});

//callback for async require
function done() {
  console.log("done");
  // window.MyNewGame = require('logic');
}