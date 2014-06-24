define(["globals"],function(globals) {

    var Projectile = {};

    Projectile.new = function(game, group, originX, originY, direction, spriteName, spriteTrail, owner, damage){
        var public = game.phaser.add.sprite(originX, originY, spriteName);
        var private = {};
        public.anchor.setTo(0.5, 0.5);
        private.length = 1;
        private.lengthTimer = private.length;
        //public.blendMode = PIXI.blendModes.MULTIPLY;

        group.add(public);
        game.phaser.physics.arcade.enableBody(public);
        
        private.timer = 2;

        damage = damage || 0;
        switch(direction){
            case globals.direction.left:
                public.body.velocity.x = -400;
                break;
            case globals.direction.right:
                public.body.velocity.x = 400;
                break;
        }
        
        var tweenData = 0;


        if (spriteName == "rainbowflicker") {
            //public.blendMode = PIXI.blendModes.ADD;
            public.alpha = 1;
            game.add.tween(public).to({alpha: 1}, 200, Phaser.Easing.Sinusoidal.InOut, true)
                .to({alpha: 1}, 1000, Phaser.Easing.Sinusoidal.InOut, true).start();

            public.scale = {x: 1, y: 1};
            game.add.tween(public.scale).to({x: 10.0, y: 1.0}, 1000, Phaser.Easing.Sinusoidal.InOut, true)
                .to({ x: 0, y: 1 }, 1000, Phaser.Easing.Sinusoidal.InOut, true).start();
            //var tween = game.add.tween(tweenData).to(100, 2000, Phaser.Easing.Sinusoidal.InOut);
        }

        public.update = function(){
            //move forward here
            if (spriteName == "rainbowflicker") {
                public.animations.frame = Math.floor(Math.random() * 12);
            }
            else if (spriteName == "dumbell"){
                public.animations.frame = Math.floor(Math.random() * 8);
                public.body.gravity.y = globals.GRAVITY;
            }
            
            if (private.timer > 0)
                private.timer -= game.phaser.time.physicsElapsed;
            else public.kill();
        };

        return public;
    };

    Projectile.preload = function(game){
        //globals.randomizer.preload(game, 'rainbow', '.png', 0, 12, globals.fileType.image);
        game.load.spritesheet('rainbowflicker',
            'data/img/sprite/AllTheRainbows.png', 32, 32);

    };

    return Projectile;
});