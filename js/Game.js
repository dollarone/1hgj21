var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    this.player;
    this.platforms;
    this.cursors;

    this.stars;
    this.score = 0;
    this.scoreText;

    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground2');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.scale.setTo(26, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;

    //  Now let's create two ledgesthis.game.world.height - 64
    this.createLedge(400,400);
    this.createLedge(400 + 32*1,400);
    this.createLedge(400 + 32*2,400);
    this.createLedge(400 + 32*3,400);
    this.createLedge(400 + 32*4,400);
    this.createLedge(400 + 32*5,400);


    this.createLedge(200,200);
    this.createLedge(200 - 32*1,200);
    this.createLedge(200 - 32*2,200);
    this.createLedge(200 - 32*3,200);
    this.createLedge(200 - 32*4,200);

    this.createLedge(400,160);
    this.createLedge(400 + 32*1,160);
    this.createLedge(400 + 32*2,160);
    this.createLedge(400 + 32*3,160);

    this.createLedge(600,100);
    this.createLedge(600 + 32*1,100);
    this.createLedge(600 + 32*2,100);


    this.createLedge(100,460);
    this.createLedge(100 + 32*1,460);
    this.createLedge(100 + 32*2,460);
    this.createLedge(100 + 32*3,460);
    this.createLedge(100 + 32*4,460);
    this.createLedge(100 + 32*5,460);
    this.createLedge(100 + 32*6,460);

    // The player and its settings
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0], 10, true);
    this.player.animations.add('right', [0], 10, true);

    //  Finally some stars to collect
    this.stars = this.game.add.group();
    this.exit = this.game.add.group();
    this.exit.enableBody = true;
    //    this.createLedge(600 + 32*1,100);

    this.exit1 = this.exit.create(632, 100-32, 'exit');
    this.exit1.body.gravity.y = 300;

    this.dynamites = this.game.add.group();
    this.dynamitesCounters = new Array(30);
    this.dynamites.enableBody = true;
      //  We will enable physics for any star that is created in this group
    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 0; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText.visible = false;
    //  Our controls.
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.dropDynamiteCounter = 100;
     
  },

  createLedge : function(x,y) {
    this.ledge = this.platforms.create(x, y, 'ground');
    this.ledge.body.immovable = true;

  },

  update: function() {
    this.dynamites.forEach(function(dynamite) {
        this.updateDynamite(dynamite);
    }, this);
    if (this.dropDynamiteCounter == 0) {
        this.dropDynamiteCounter = 60;
        this.createDynamite();
    }
    else {
        this.dropDynamiteCounter = this.dropDynamiteCounter - 1;
    }



    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.exit, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.exit, this.win, null, this);
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.dynamites, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.dynamites, this.playerDynamiteCollision, null, this);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -350;
    }

  },

  updateDynamite: function(dynamite) {

       // console.log("index2: " + this.dynamites.getChildIndex(dynamite));
        //console.log("2c: " + this.ghostsCounters[0]);


        var counter = this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)];
        if (counter == 1) {
            dynamite.kill();
        }
        if (counter == 10) {
            this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] -= 1;
            dynamite.kill();
        }
        if (counter == 30) {
            this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] -= 1;
            dynamite.loadTexture('explosion',0,true);
            dynamite.scale.setTo(0.5,0.5);
        }
        if (counter > 10) {
            this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] -= 1;
        }        

  },


  createDynamite : function() {
    var dynamite = this.dynamites.create(this.player.x, this.player.y, 'dynamite');
    this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] = 100;

    //  Let gravity do its thing
    dynamite.body.gravity.y = 300;

    //  This just gives each star a slightly random bounce value
    dynamite.body.bounce.y = 0.1 + Math.random() * 0.2;
    dynamite.body.drag.setTo(200);
//    this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] = 100;


  },

  playerDynamiteCollision : function(player, dynamite) {
    if (this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] < 30) {
        this.respawn();
    }

  },

  respawn: function() {
        this.player.x = 32;
        this.player.y = this.game.world.height - 150;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
    },

  win: function() {
    this.scoreText.text = 'You win!';
    this.scoreText.visible = true;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.game.paused = true;

  },
  collectStar : function(player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;

  },
};