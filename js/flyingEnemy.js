define(["globals"],function(Globals){

    var Enemy = {};


    var hotFlashTween;
    var hotFlashgraphic;

    Enemy.enemyGroup;

    Enemy.new = function(globalGame, originX, originY)
    {
        
        //default parameters
        originX = originX || 0;
        originY = originY || 0;

        var game = globalGame.phaser;
        var public = game.add.sprite(originX, originY, 'words');
        public.animations.frame = Math.floor(Math.random()*25);
        public.tint = Math.random() * 0xFFFFFF;
        public.blendMode = PIXI.blendModes.ADD;

        Enemy.enemyGroup.add(public);
        var private = {};

        public.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enableBody(public);
        public.body.setSize(128, 128, 0,0);

        private.hitPoints = 1;




        //particle emitter
        //public.animations.frame = Math.floor(Math.random() * 12);
//        emitter = game.add.emitter(0, originX, originY);
//        emitter.makeParticles('squareparticle0');
//        //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
//        //	The 5000 value is the lifespan of each particle
//        emitter.setXSpeed(-50, -50);
//        emitter.start(false, 5000, 500);
//
//        public.addChild(emitter);



        function hotFlash()
        {


            if(hotFlashTween){hotFlashTween.stop();}
            if(hotFlashgraphic)
                hotFlashgraphic.destroy();
                hotFlashgraphic = game.add.graphics(0, 0);
            hotFlashgraphic.beginFill(0xff0000, 1);
            hotFlashgraphic.drawRect(public.x - game.width, 0, game.width *2, game.height);
            hotFlashgraphic.alpha = 0;
            hotFlashgraphic.endFill();

            hotFlashTween =game.add.tween(hotFlashgraphic)
            hotFlashTween.to({ alpha: 1 }, 1, null)
            var next = game.add.tween(hotFlashgraphic)
            next.to({ alpha: 0 }, 800, null)
            hotFlashTween.chain(next);
            hotFlashTween.start();
            
            globalGame.staticsheet.alpha = 1;
            game.add.tween(globalGame.staticsheet).to({alpha: .3}, 800, Phaser.Easing.Sinusoidal.InOut, true);

        }

        public.setHitPoints= function(points)
        {
            private.hitPoints = points;
        };

        public.die = function()
        {
            public.kill();
        };

        public.removeHitPoints = function(points) {
            private.hitPoints -= points;
            if (private.hitPoints <= 0) {
                public.die();
                globalGame.sfx.hit2.play();
            }
        };

        public.shoot = function()
        {

        };

        public.collidedWithPlayer = function()
        {
           // console.log("work!");
            hotFlash();
            public.die();
        };

        public.update = function()
        {
            if (game.finalSceneReached) public.die();
            
            public.body.x-=2;

            if(public.body.x < 0)
                public.die();

//            if(game.phaser.physics.overlap())
        };

        game.add.tween(public.body).to( { y: originY-300 }, 1200, Phaser.Easing.Quadratic.InOut, true, 0, 1200, true);
        return public;
    };



    Enemy.preload = function(game)
    {
        game.load.spritesheet('words', 'data/img/sprite/wordEnemies.png', 128, 128);
        
       // Globals.randomizer.preload(game, 'squareparticle', '.png', 0, 25, Globals.fileType.image);
        Enemy.enemyGroup = game.add.group();





    };

    return Enemy;
});