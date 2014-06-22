define([
    'player',
    '../lib/domReady',
    'scene',
    'globals',
    'inputkeys',
    'flyingEnemy',
    'projectile',
    'text',
    'levelscript',
    'beefcake'
], function(
    Player,
    domready,
    Scene,
    globals,
    InputKeys,
    FlyingEnemy,
    Projectile,
    Text,
    LevelScript,
    BeefCake
) {
    var Game = {};
    Game.new = function() {
        var public = {},
            private = {
                game: null,
                scene: null,
                map: null,
                layers: null,
                cursors: null,
                player: null,
                beefCake: null,

                nextQueue: [],
                everyQueue: []
            };

        public.preload = function (game) {
            Scene.preload(public);
            Player.preload(public);
            Player.preload(public);
            Projectile.preload(public);
            FlyingEnemy.preload(public);
            BeefCake.preload(public);
        };
        
        

        function onPlayerReachEnd()
        {
            public.moveCameraToSpot();
            private.keepGeneratingEnemies = false;
        };

        function checkEnemyCollisions()
        {
            public.phaser.physics.arcade.overlap(Player.projectileGroup,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                enemy.removeHitPoints(100);
            });

            public.phaser.physics.arcade.overlap(private.player,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                    enemy.collidedWithPlayer();
            });


            public.phaser.physics.arcade.overlap(BeefCake.BeefCakeGroup,
                Player.projectileGroup,
                 function(beefcake, playerBullet) {
                    beefcake.onHit();
             });

            public.phaser.physics.arcade.overlap( private.player, BeefCake.ProjectileGroup,
                function(playa, dumbell)
                {
                    console.log("dumbell hit");
                   //playa.hitWithDumbell();
             });


        }

        public.create = function () 
        {
            
            // Load the Start Screen BG an buttob
            public.phaser.load.image('startScreenBG', 'data/img/title-page/title-page.png');
            public.phaser.load.image('startBTN', 'data/img/title-page/play-btn.png');
           
            public.startBTN = document.createElement('a');
            public.startScreenBG = document.createElement('div');

            public.startBTN.setAttribute('style', 'position:absolute;width:167px;height:85px;background:url("data/img/title-page/play-btn.png");bottom:159px;left:74px;');
            public.startScreenBG.setAttribute('style', 'position:absolute;width:640px;height:480px;background:url("data/img/title-page/title-page.png");top:0;left:0px;');

            public.startBTN.setAttribute('href', '#');

            document.getElementById('game-div').appendChild(public.startScreenBG);
            document.getElementById('game-div').appendChild(public.startBTN);

            //Listen for a click and execute a click handler
            public.startBTN.addEventListener('click', public.startGame, false);

         }

        public.startGame = function () {
            
            // destroy the play button
            document.getElementById('game-div').removeChild(public.startBTN);
            document.getElementById('game-div').removeChild(public.startScreenBG);

            public.phaser.physics.startSystem(Phaser.Physics.ARCADE);
           
            
            private.scene = Scene.new(public);
            
            private.map = private.scene.loadMap('house');
            public.every(function() {
                private.map.collide(public, private.player);
            });


            // Create player
            private.player = Player.new(public, onPlayerReachEnd);
            private.input = InputKeys.new(public, private.player);

            //create beefcake
            //3083 is the trigger

            public.beefcake = BeefCake.new(public, 3352, 296);
            public.levelscript = LevelScript.new(public, private.player);


private.testText = Text.new(public, 'Test', 100, 0,
                { fadeSpeed: 2, fadeOutAfter:5, fadeDir:globals.direction.down, fadeOffset:5, color:"#00FF00" });
            private.keepGeneratingEnemies = true;

            public.doAfter(enemyFactory, 3);
            /*set up generator
             public.doAfter(function(){
                if(!private.keepGeneratingEnemies)
                    return;

                FlyingEnemy.new(public
            var enemy = FlyingEnemy.new(public);*/


            public.every(checkEnemyCollisions);
            


            public.camera.follow(private.player, Phaser.Camera.FOLLOW_PLATFORMER);
        };

           function enemyFactory()
           {
               if(!private.keepGeneratingEnemies)
                   return;
               FlyingEnemy.new(public, 640+ private.player.x, Math.random()*public.phaser.world.height);
               public.doAfter(enemyFactory, 3);
           }

        public.update = function () {
            var ncb;
            while (private.nextQueue.length > 0) {
                ncb = private.nextQueue.pop();
                ncb(public);
            }

            _.each(private.everyQueue, function(ecb) {
                ecb(public);
            });
        };

        public.render = function () {
        };

        public.start = function() {



            var transparent = false;
            var antialias = false;
            public.phaser = new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-div',
                public,
                transparent
            );
        };

        public.next = function(cb) {
            private.nextQueue.push(cb);
        };

        public.every = function(cb) {
            private.everyQueue.push(cb);
        };

        public.doAfter = function(cb, secs){
           // public.phaser.time.events.add(Phaser.Timer.SECOND * secs, cb);
            setTimeout(function() {public.next(cb)}, secs*1000);
        };


        public.moveCameraToSpot = function()
        {

            public.phaser.camera.follow(null);
            public.phaser.add.tween(public.camera).to({x:3083 - 150},1500, Phaser.Easing.Linear.None,true);//.onComplete();
           // public.camera.setPosition(3083+50,0);

        };

        return public;
    };

    return Game;
});


