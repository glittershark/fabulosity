define(["globals", 'projectile'],function(globals, Projectile){

    var BeefCake = {};

    BeefCake.BeefCakeGroup;
    BeefCake.ProjectileGroup;

    BeefCake.new = function(globalGame, originX, originY) {
        var game = globalGame.phaser;
        var public = game.add.sprite(originX-100, originY-90, 'beefcake');
        var private = {};
        BeefCake.BeefCakeGroup.add(public);
        
        public.animations.add('shoot', [0, 0, 1], 3, false);
        public.animations.frame = 1;
            //public.animations.add('walk', [0, 1, 2, 1, 0, 3, 4, 3, 0], 4, true);

        // rotate & flip around the center of the sprite
        public.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(public);
        public.body.setSize(152, 160,0,0);


        //public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        //public.body.collideWorldBounds = true;
        private.fireRateTimer = .5;
        private.canFire = true;

        public.shoot = function() {
            public.animations.frame = 0;
            globalGame.sfx.throw.play();
            
            if (!private.canFire) return;
            globalGame.levelscript.displayNextBuff(originX, originY);
            //spawn particle here. just one.
            var projectile = Projectile.new(globalGame, BeefCake.ProjectileGroup,
                public.body.x, public.body.y, globals.direction.left, 'dumbell');

            private.canFire = false;
            
            public.animations.play('shoot');
            
        };

        public.onHit = function(){
            //on the rainbow hit basically
            var tween =  game.add.tween(public);
            globalGame.sfx.hit.play();
            tween.to({tint: Math.random() * 0xFFFFFF},500, Phaser.Easing.Bounce.InOut,true);
            tween.to({tint: 0xFFFFFF},500, Phaser.Easing.Bounce.InOut,true);
        };

        public.update = function(){
            if (private.fireRateTimer>0)
                private.fireRateTimer -= globalGame.phaser.time.physicsElapsed;

            if (private.fireRateTimer <= 0){
                private.canFire = true;
                private.fireRateTimer = .5;
            }
        };


        return public;
    };




    BeefCake.preload = function(game){
        game.load.spritesheet('beefcake', 'data/img/sprite/beefcake-sheet.png', 152, 160);
        //dumbell projectile
        game.load.spritesheet('dumbell', 'data/img/sprite/dumbbell-sprite2.png', 80, 48);
        BeefCake.BeefCakeGroup = game.add.group();
        BeefCake.ProjectileGroup = game.add.group();
    };



    return BeefCake;
});