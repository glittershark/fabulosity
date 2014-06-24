define(['map'], function(Map) {
    var scenes = {
        house: {
            tiles: {
                name: 'bedroom-roman',
                file: 'data/map/house.json',
                image: 'data/img/map/bedroom-roman.png'}
        }
    };

    var Scene = {};

    Scene.group;

    Scene.new = function (game) {
        var public  = {},
            private = {};

        private.setupCollisionLayer = function(game, map, layer) {
            layer.visible = false;
            map.setCollisionByExclusion([], true, layer);
            layer.resizeWorld();
        };

        public.loadMap = function(name) {
            game.stage.backgroundColor = '#21C3FC';

            var scene = scenes[name];

            // Create the map and associate the tiles with it
            var map = game.add.tilemap(name);
            map.addTilesetImage(scene.tiles.name, scene.tiles.name);

            // Create all of the layers from the tileset,
            // but set visible to false if the name is 'collision'
            var layers = {};
            map.layers.forEach(function (layerData) {
                var layer = map.createLayer(layerData.name);
                Scene.group.add(layer);
                if (layerData.name === 'collision') {
                    private.setupCollisionLayer(game, map, layer);
                }
                layers[layerData.name] = layer;
            });

            return Map.new(map, layers);
        };

        return public;
    };

    Scene.preload = function(game) {
        // Load the area01 map and its tiles
        _.each(scenes, function(scene, name) {
            game.load.tilemap(name, scene.tiles.file, null, Phaser.Tilemap.TILED_JSON);
            game.load.image(scene.tiles.name, scene.tiles.image);
        });

        Scene.group = game.add.group()
    };

    return Scene;
});

