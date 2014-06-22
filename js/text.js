define([], function() {
    var textStyle = {
        font: '20px Silkscreen',
        fill: '#fff',
        align: 'left'
    };

    var Text = {};
    Text.new = function(game, text, x, y, options) {
        var public = {},
            private = {};

        private = game.phaser.add.text(x, y, text, textStyle);
        private.alpha = 0;


        var fadeSpeed = options.fadeSpeed || 2;
        game.phaser.add.tween(public).to( { alpha: 1 }, fadeSpeed, Phaser.Easing.Linear.None, true,0,false);

/*
        if (options.fadeOutAfter)
        {
            game.doAfter(function (){
                game.phaser.add.tween(public).to( { alpha: 0 }, fadeSpeed*1000, Phaser.Easing.Linear.None, true);
            }, options.fadeOutAfter);
        }(*/
        return public;
    };

    return Text;
});
