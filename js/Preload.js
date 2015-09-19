var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    // this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sky', 'assets/sky.png');
    this.game.load.image('ground', 'assets/tile_dirt.png');
    this.game.load.image('ground2', 'assets/tile_dirt_dug.png');
    this.game.load.image('star', 'assets/gold_star.png');
    this.game.load.image('rock', 'assets/rock2.png');
    this.game.load.image('dynamite', 'assets/dynomite.png');
    this.game.load.image('explosion', 'assets/explosion.png');
    this.game.load.image('explosion2', 'assets/explosion2.png');
    this.game.load.image('exit', 'assets/tile_exit.png');
    this.game.load.spritesheet('dude', 'assets/player.png', 32, 32);
  },
  create: function() {
    this.state.start('Game');
  }
};
