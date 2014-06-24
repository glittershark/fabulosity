define(["globals", "text"], function(globals, Text) {


    var LevelScript = {};
    LevelScript.new = function(game, player) {
        var public = {},
            private = {};

        public.player = player;

        private.dialogue = {};
        private.dialogue.shoot = [
            "Nah.",
            "No.",
            "Stop talking.",
            "I don't care.",
            "Go away.",
            "Uhuh.",
            "Whatever.",
            "Fuck you.",
            "...",
            "Sure.",
            "Silence.",
            "Nope.",
            "Right, right.",
            "Please.",
            "Have a rainbow!",
            ":)",
            "^u^",
            "lol",
            "k"
        ];

        public.getRandomSpeech = function(){
            return private.dialogue.shoot[Math.floor(Math.random()*private.dialogue.shoot.length)];
        };



        private.dialogue.punk = [
            {text: "Hello",                 subtext: "Hello"},
            {text: "What's up?",            subtext: "What's up?"},
            {text: "Oh, cool. On what?",    subtext: "Oh, another meathead."},
            {text: "Nice.",                 subtext: "HahahahahahahhaHAHAHA"},
            {text: "Thanks.",               subtext: "Fuck you."},
            {text: "I love pink.",          subtext: "I'm gay."},
            {text: "I like your clothes.",  subtext: "You have a fucking gstring"} 
        ];
        
        private.dialogue.buff = [
            {text: "Hey.",                  subtext: "Hey."},
            {text: "Just working out.",     subtext: "Working on muscles."},
            {text: "Working on my 'ceps.",  subtext: "Muscles muscules muscles."},
            {text: "I like your hair.",     subtext: "Your hair's fucking gay."},
            {text: "It has a nice color.",  subtext: "Queer ass cunt bitch."},
            {text: "It's nice.",            subtext: "What a faggot."},
            {text: "Thanks.",               subtext: "Fuck you stupid shit."},
        ];
        
        private.dialogue.punkcount = 0;
        private.dialogue.buffcount = 0;
        private.dialogue.turntrack = 1;
        public.nextDialogue = function(){

            var ans;
            //console.log(private.dialogue.punkcount);
            if (private.dialogue.punkcount == private.dialogue.punk.length ||
                private.dialogue.buffcount == private.dialogue.buff.length) {
                console.log("Can't return dialogue");
                return;
            }
            //return punk
            if (private.dialogue.turntrack == 1){

                if (private.dialogue.punkcount % 1 == .5){
                    ans = private.dialogue.punk[private.dialogue.punkcount -.5].subtext;
                    private.dialogue.turntrack = 2;
                }
                else ans = private.dialogue.punk[private.dialogue.punkcount].text;

                private.dialogue.punkcount += .5;
            }

            //return buff
            else{
                if (private.dialogue.buffcount % 1 == .5){
                    private.dialogue.turntrack = 1;
                    ans = private.dialogue.buff[private.dialogue.buffcount -.5].subtext;
                }
                else ans = private.dialogue.buff[private.dialogue.buffcount].text;

                private.dialogue.buffcount += .5;
            }
            return ans;
        };

        public.buffEvent = function() {
            //move player, freeze player, center camera
            //every shoot becomes a dialogue. callback on enemy collision
            //callback on player collision too
        };

        public.displayNextBuff = function() {
        };

        public.displayNextMessage = function(originX, originY, color, fadeDirection, message, bool){
            message = message || public.getRandomSpeech();
            var testText = Text.new(game, message, originX, originY,
                { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
            return testText;
        };

        public.displayNextDialogue = function(){
            switch (private.turntrack){
                case 1: //punk
                    private.dialogue.turntrack = 2;
                    var text = Text.new(game, private.dialogue.punk[private.dialogue.punkcount++],
                        originX, originY,
                        { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
                    break;
                case 2: //beef
                    private.dialogue.turntrack = 2;
                    var text = Text.new(game, private.dialogue.beef[private.dialogue.punkcount++],
                        originX, originY,
                        { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
                    break;
                default:
                    break;
            }
            var text =   Text.new(game, public.getRandomSpeech(), originX, originY,
                { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
        };

        return public;
    };

    return LevelScript
});
