require(['game', '../lib/domReady'], function(Game, domready) {
    var game = Game.new();
    domready(game.start);
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
});

