define(["globals"], function (globals) {

    var Player = {};

    Player.new = function (game) {
        var public = game.add.sprite(32 * 10, 32 * 4, 'gripe_run_right');
        var private = {};

        private.motor = {};
        private.motor.speed = 200;
        private.motor.currentSpeed = 0;
        private.motor.acceleration = 20;
        private.motor.jumpPower = 75;

        // rotate & flip around the center of the sprite
        public.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(public);
        public.body.setSize(40, 56, 15, 24);
        // Use all of the frames for the 'walk' animation
        public.animations.add('walk');

        public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        public.body.collideWorldBounds = true;


        //call this during update based on cursors
        public.jump = function () {
            if (public.body.onFloor()) {
                //motor.body.velocity.y = -300;
                motor.jumping = true;
                motor.jumpPack = motor.jumpPackFull;
            }
            if (motor.jumpPack > 0) {
                motor.jumpPack -= game.time.physicsElapsed;
                public.body.velocity.y -= motor.jumpPower;
                console.log(motor.jumpPack);
            }
        };


        //direction false is left. call this based on cursors input in update
        public.walk = function (direction) {

            switch(direction){
                case globals.direction.left:
                    public.body.velocity.x -= private.motor.acceleration;
                    if (private.motor.currentSpeed < -private.motor.speed)
                        private.motor.currentSpeed = -private.motor.speed;
                    break;
                case globals.direction.right:
                    public.body.velocity.x += private.motor.acceleration;
                    if (private.motor.currentSpeed > private.motor.speed)
                        private.motor.currentSpeed = private.motor.speed;
                    break;
                case globals.direction.stationary:
                    public.body.velocity.x = 0;
                    break;
            }
        };


        return public;
    };

    Player.preload = function(game) {
        // Load the main player spritesheet
        game.load.spritesheet('gripe_run_right',
            'data/img/sprite/gripe_run_right.png', 64, 64);
    };

    return Player;
});

