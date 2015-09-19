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
    this.sky = this.game.add.sprite(0, 0, 'preloadbar');
    this.sky.anchor.setTo(0, 1);
    this.sky.angle = 90;

    this.sky.scale.setTo(10, 128);

//    this.sky.scale.setTo(16, 32 * 1);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    //  Finally some stars to collect
    this.stars = this.game.add.group();
    this.stars.enableBody = true;

        // need an exit
    this.exit = this.game.add.group();
    this.exit.enableBody = true;

    this.rocks = this.game.add.group();
    this.rocks.enableBody = true;




    this.createGround();
    this.createLevel1();

    this.platforms.add(this.rocks);

    // The player and its settings
    this.player = this.game.add.sprite(this.playerSpawnX, this.playerSpawnY, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.02;
    this.player.body.gravity.y = 300;
    this.player.anchor.setTo(0.5, 1);
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0], 10, true);
    this.player.animations.add('right', [0], 10, true);

    this.dynamites = this.game.add.group();
    this.dynamitesCounters = new Array(30);
    this.dynamites.enableBody = true;


    //  The score
    this.scoreText = this.game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
    this.score = 0;
    this.level = 1;
    this.scoreText.text = 'Level ' + this.level + ' Score: ' + this.score;

    //  Our controls.
    this.scoreAtLevelStart = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.dropDynamiteCounter = 100;
    this.respawnTimer = 0;
     
  },

  createGround : function() {
        // Here we create the ground.
    this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground2');
    this.ground['explodable'] = false;

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.scale.setTo(26, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;

},

  createLedge : function(x, y, explodable) {
    if (explodable) {
        this.ledge = this.platforms.create(x, y, 'ground');
    }
    else {
        this.ledge = this.platforms.create(x, y, 'ground2');        
    }
   // this.ledge.anchor.setTo(0.5, 0.5);
    this.ledge.body.immovable = true;
    this.ledge['explodable'] = explodable;
  },

  createStar : function(x, y) {
        var star = this.stars.create(x, y, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 200;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 1;
        star.body.bounce.x = 1;

  },

  createRock : function(x, y) {
        var rock = this.platforms.create(x, y, 'rock');

        //  Let gravity do its thing
        rock.body.bounce.y = 0.1;
        rock.body.gravity.y = 500;
        rock.body.drag.setTo(200);
        rock.anchor.setTo(0.5,1);
        rock.y += 2;
        rock["pushable"] = true;

  },


  createLevel2 : function() {


    this.createLedge(616, 36, true);
    this.createLedge(616 + 32*1, 36, true);
    this.createLedge(616 + 32*2, 36, true);
    this.createLedge(616 - 32, 36, true);
    this.createLedge(616 - 32, 68, true);
    this.createLedge(616 - 32, 100, true);
    this.createLedge(616 - 32, 100 + 32*1, true);
    this.createLedge(616 - 32, 100 + 32*2, true);
    this.createLedge(616 - 32, 100 + 32*3, true);
    this.createLedge(616 - 32, 100 + 32*4, true);
    this.createLedge(616, 100 + 32*4, true);
    this.createLedge(616 + 32, 100 + 32*4, true);
    this.createLedge(616 + 32*2, 100 + 32*4, true);
    this.createLedge(616 + 32*3, 100 + 32*4, true);
    this.createLedge(616 + 32*4, 100 + 32*4, true);
    this.createLedge(616 + 32*5, 100 + 32*4, true);
    this.createStar(616 +  32*4, 100 + 32*2);

    

    this.createLedge(616 + 32*3, 100 + 32*3, true);
    this.createLedge(616 + 32*3, 100 + 32*2, true);
    this.createLedge(616 + 32*3, 100 + 32*1, true);
    this.createLedge(616 + 32*4, 100 + 32*1, true);
    this.createLedge(616 + 32*4, 100, true);
    this.createLedge(616 + 32*4, 100 - 32*1, true);
    this.createLedge(616 + 32*4, 100 - 32*2, true);
    this.createLedge(616 + 32*4, 100 - 32*3, true);
    this.createStar(616 - 32, 100 - 32*3);
    this.createStar(616 - 32*5, 100 - 32*2);

// top left 
    this.createStar(0, 7+32);
    this.createLedge(32, 7+32, true);
    this.createLedge(32, 7+64, true);
    this.createLedge(32, 7+96, true);
    this.createLedge(32, 7+128, true);
    this.createLedge(0, 7+128, true);


// top left of left "box"

    this.createLedge(8+32*4, 4+128+32*3, true);
    this.createLedge(8+32*4, 4+128+32*4, true);
    this.createLedge(8+32*4, 4+128+32*5, true);
    this.createLedge(8+32*3, 4+128+32*5, true);
    this.createLedge(8+32*2, 4+128+32*5, true);
    this.createLedge(8+32*2, 4+128+32*6, true);
    this.createLedge(8+32*2, 4+128+32*7, true);

    this.createLedge(8+32*2, 4+128+32*8, false);
    this.createLedge(8+32*3, 4+128+32*8, false);
    this.createLedge(8+32*4, 4+128+32*8, false);
    this.createLedge(8+32*5, 4+128+32*8, false);
    this.createLedge(8+32*6, 4+128+32*8, false);
    this.createLedge(8+32*7, 4+128+32*8, false);
    this.createLedge(8+32*8, 4+128+32*10, false);
    this.createLedge(8+32*7, 4+128+32*9, false);
    this.createLedge(8+32*7, 4+128+32*10, false);
    this.createLedge(8+32*9, 4+128+32*10, false);


// end
    this.createLedge(8+32*7, 4+128+32*7, false);
    this.createLedge(8+32*7, 4+128+32*6, false);
    this.createLedge(8+32*7, 4+128+32*5, false);
    this.createLedge(8+32*7, 4+128+32*4, false);

    this.createLedge(8+32*7, 4+128+32*2, false);
    this.createLedge(8+32*8, 4+128+32*2, false);
    this.createLedge(8+32*9, 4+128+32*2, false);
    this.createLedge(8+32*10, 4+128+32*2, false);
    this.createLedge(8+32*11, 4+128+32*2, false);

    this.createLedge(8+32*7, 4+128+32*3, false);
    this.createLedge(8+32*11, 4+128+32*3, false);


    this.createLedge(8+32*11, 4+128+32*2, false);
    this.createLedge(8+32*10, 4+128+32*2, false);
    this.createLedge(8+32*9, 4+128+32*2, false);

    this.createLedge(8+32*11, 4+128+32*4, false);
    this.createLedge(8+32*9, 4+128+32*4, false);

    this.createLedge(8+32*11, 4+128+32*5, false);
    this.createLedge(8+32*9, 4+128+32*5, false);

    this.createLedge(8+32*11, 4+128+32*6, false);
    this.createLedge(8+32*9, 4+128+32*6, false);
    this.createLedge(8+32*11, 4+128+32*7, false);
    this.createLedge(8+32*9, 4+128+32*7, false);

    this.createLedge(8+32*9, 4+128+32*8, false);
    this.createLedge(8+32*10, 4+128+32*8, false);
    this.createLedge(8+32*11, 4+128+32*8, false);

    this.exit1 = this.exit.create(8+32*10, 4+128+32*7, 'exit');



    this.createLedge(8+32*4, 4+128+64, true);
    this.createLedge(8+32*4, 4+128+32, true);
    this.createLedge(8+32*5, 4+128+32, true);
    this.createLedge(8+32*6, 4+128+32, true);
    this.createLedge(8+32*7, 4+128+32, true);
    this.createLedge(8+32*8, 4+128+32, true);
    this.createLedge(8+32*9, 4+128+32, true);
    this.createLedge(8+32*10, 4+128+32, true);
    this.createLedge(8+32*11, 4+128+32, true);

    this.createLedge(8+32*5, 4+128, true);
    this.createLedge(8+32*6, 4+128, true);
    this.createLedge(8+32*7, 4+128, true);
    this.createLedge(8+32*8, 4+128, true);
    this.createLedge(8+32*9, 4+128, true);
    this.createLedge(8+32*10, 4+128, true);
    this.createLedge(8+32*11, 4+128, true);

    this.createLedge(8+32*5, 4+128+32*6, true);
    this.createLedge(8+32*4, 4+128+32*6, true);
    this.createLedge(8+32*3, 4+128+32*6, true);

    this.createLedge(8+32*4, 4+128+32*7, true);
    this.createLedge(8+32*3, 4+128+32*7, true);


    this.createLedge(8+32*5, 4+128+32*2, true);
    this.createLedge(8+32*6, 4+128+32*2, true);

    this.createLedge(8+32*5, 4+128+32*4, true);
    this.createLedge(8+32*6, 4+128+32*4, true);

    this.createLedge(8+32*5, 4+128+32*5, true);
    this.createLedge(8+32*6, 4+128+32*5, true);
    this.createLedge(8+32*5, 4+128+32*5, true);
    this.createLedge(8+32*6, 4+128+32*6, true);

    this.createStar(32*6-8, 4+128+32*7);

    this.createLedge(8+32*5, 4+128+96, true);
    this.createLedge(8+32*6, 4+128+96, true);

///    this.createLedge(8+32*8, 4+128+96, true);

/////


    this.createLedge(616 - 32*6, 100 - 32*3, false);
    this.createLedge(616 - 32*6, 100 - 32*2, false);
    this.createLedge(616 - 32*6, 100 - 32*1, false);
    this.createLedge(616 - 32*6, 100 - 32*0, false);
    this.createLedge(616 - 32*6, 100 + 32*1, false);
    this.createLedge(616 - 32*6, 100 + 32*2, false);
    this.createLedge(616 - 32*6, 100 + 32*3, false);
    this.createLedge(616 - 32*6, 100 + 32*4, false);
    this.createLedge(616 - 32*6, 100 + 32*5, false);
    this.createLedge(616 - 32*6, 100 + 32*6, false);
    this.createLedge(616 - 32*6, 100 + 32*7, false);
    this.createLedge(616 - 32*6, 100 + 32*8, false);
    this.createLedge(616 - 32*6, 100 + 32*9, false);
    this.createLedge(616 - 32*6, 100 + 32*10, false);

    this.createLedge(616 - 32*5, 100 - 32*1, true);

    this.createLedge(616 - 32*4, 100 - 32*2, true);
    this.createLedge(616 - 32*4, 100 - 32*1, true);
    this.createLedge(616 - 32*4, 100, true);
    this.createLedge(616 - 32*4, 100 + 32*1, true);
    this.createLedge(616 - 32*4, 100 + 32*2, true);
    this.createLedge(616 - 32*4, 100 + 32*3, true);
    this.createLedge(616 - 32*4, 100 + 32*4, true);

    this.createLedge(616 - 32*5, 100 + 32*0, true);
    this.createLedge(616 - 32*5, 100 + 32*1, true);
    this.createLedge(616 - 32*5, 100 + 32*2, true);
    this.createLedge(616 - 32*5, 100 + 32*3, true);
    this.createLedge(616 - 32*5, 100 + 32*4, true);


    this.createLedge(616 - 32*9, 100 + 32*11, false);
    this.createLedge(616 - 32*8, 100 + 32*11, false);
    this.createLedge(616 - 32*7, 100 + 32*11, false);
    this.createLedge(616 - 32*6, 100 + 32*11, false);
    this.createLedge(616 - 32*5, 100 + 32*11, true);
    this.createLedge(616 - 32*5, 100 + 32*12, true);
    this.createLedge(616 - 32*4, 100 + 32*11, false);
    this.createLedge(616 - 32*3, 100 + 32*11, false);
    this.createLedge(616 - 32*2, 100 + 32*11, false);
    this.createLedge(616 - 32*1, 100 + 32*11, false);

    this.createLedge(32*4, 116 + 32*11, false);
    this.createLedge(32*3, 116 + 32*11, false);
    this.createLedge(32*2, 116 + 32*11, false);
    this.createLedge(32*1, 116 + 32*11, false);
    this.createLedge(32*0, 116 + 32*11, false);
    this.createStar(32*0, 116 + 32*12);


    this.createLedge(730, 116 + 32*11, false);
    this.createLedge(730, 116 + 32*10, false);
    this.createLedge(730, 116 + 32*9, false);
    this.createLedge(730 + 32, 116 + 32*9, false);
    this.createLedge(730 + 64, 116 + 32*9, false);
    this.createStar(730 + 32, 116 + 32*10);


    this.playerSpawnX = 648;
    this.playerSpawnY = 100;

  },
  createLevel1 : function() {

    this.createLedge(400, 400, false);
    this.createLedge(400 + 32*1, 400, false);
    this.createLedge(400 + 32*2, 400, false);
    this.createLedge(400 + 32*3, 400, false);
    this.createLedge(400 + 32*4, 400, false);
    this.createLedge(400 + 32*5, 400, false);


    this.createLedge(200, 200, false);
    this.createLedge(200 - 32*1, 200, false);
    this.createLedge(200 - 32*2, 200, true);
    this.createLedge(200 - 32*3, 200, true);
    this.createLedge(200 - 32*4, 200, true);

    this.createLedge(400, 160, true);
    this.createLedge(400 + 32*1, 160, false);
    this.createLedge(400 + 32*2, 160, true);
    this.createLedge(400 + 32*3, 160, true);

    this.createLedge(600, 100, false);
    this.createLedge(600 + 32*1, 100, false);
    this.createLedge(600 + 32*2, 100, false);


    this.createLedge(100, 460, true);
    this.createLedge(100 + 32*1, 460, true);
    this.createLedge(100 + 32*2, 460, true);
    this.createLedge(100 + 32*3, 460, true);
    this.createLedge(100 + 32*4, 460, true);
    this.createLedge(100 + 32*5, 460, true);
    this.createLedge(100 + 32*6, 460, true);

    this.createRock(100 + 32*3, 460-32);


    this.exit1 = this.exit.create(648, 100, 'exit');
    this.exit1.body.gravity.y = 300;
    this.exit1.anchor.setTo(0.5, 1);

          //  We will enable physics for any star that is created in this group
    this.createStar(200 - 32*4, 200-64);
    this.createStar(648 + 64, 120);
    this.createStar(100 + 32*2, 460 + 32);
    this.createStar(400 + 32*2, 460 - 128);

    this.playerSpawnX = 32;
    this.playerSpawnY = this.game.world.height - 150;

    this.level = 1;
    this.goToNextLevel = false;

  },

  update: function() {

    if (this.respawnTimer > 0) {
        this.respawnTimer -= 1;
    }
    
    if (this.respawnTimer == 1) {
        this.respawn();
    }
    else {

    if (this.goToNextLevel) {
        this.platforms.forEachAlive(function(platform) {
           //this.platforms.remove(platform);
           platform.kill();
        }, this);
        this.stars.forEachAlive(function(star) {
            star.kill();
            //this.stars.remove(star);
        }, this);
        this.exit.forEachAlive(function(exit1) {
            exit1.kill();
            //this.exit.remove(exit1);
        }, this);

        this.level += 1;
        if (this.level == 2) {
            this.createLevel2();
            this.createGround();
        }

        this.scoreAtLevelStart = this.score;
        this.goToNextLevel = false;
        this.scoreText.text = 'Level ' + this.level + ' Score: ' + this.score;

    } 

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
    this.game.physics.arcade.collide(this.player, this.platforms, this.pushRock, null, this);
    this.game.physics.arcade.collide(this.exit, this.platforms);
//    this.game.physics.arcade.collide(this.rocks, this.platforms);
    this.game.physics.arcade.overlap(this.player, this.exit, this.win, null, this);
    this.game.physics.arcade.collide(this.stars, this.platforms, null, this.touchRock, this);
    this.game.physics.arcade.collide(this.dynamites, this.platforms); //, this.dynamitePlatformCollision, null, this);

    this.platforms.forEach(function(platform) {
        if (platform["pushable"]) {
            this.game.physics.arcade.collide(platform, this.platforms);
        }
    }, this);
/*
// howto: make dynamites blow up adjacents?
    this.dynamites.forEach(function(dynamite) {
        //this.game.physics.arcade.overlap(dynamite, this.platforms, this.dynamitePlatformCollision, null, this);
        this.platforms.forEach(function(platform) {
            if (this.distanceBetweenTwoPoints(platform, dynamite) < 10) {
                platform.kill();// this.dynamitePlatformCollision(dynamite, platform);
            }
        }, this);
    }, this);
  */
    this.game.physics.arcade.overlap(this.dynamites, this.platforms, this.dynamitePlatformCollision, null, this);
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
//    this.game.physics.arcade.overlap(this.player, this.rocks, this.pushRock, null, this);

}

  },

  updateDynamite: function(dynamite) {


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
            //dynamite.x -= 8;
            dynamite.y += 16;
            dynamite.body.gravity.y = 0;
            dynamite.body.gravity.x = 0;
            dynamite.body.velocity.y = 0;
            dynamite.body.velocity.x = 0;
            //dynamite.scale.setTo(0.5,0.5);
        }
        if (counter > 10) {
            this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] -= 1;
        }        

  },


  createDynamite : function() {
    var dynamite = this.dynamites.create(this.player.x, this.player.y - 16, 'dynamite');
    this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] = 100;

    //  Let gravity do its thing
    dynamite.body.gravity.y = 300;
    dynamite.anchor.setTo(0.5, 1);

    //  This just gives each star a slightly random bounce value
    dynamite.body.bounce.y = 0.1 + Math.random() * 0.2;
    dynamite.body.drag.setTo(200);
//    this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] = 100;


  },

  playerDynamiteCollision : function(player, dynamite) {
    if (this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] < 30 && player.visible) {
        dynamite.loadTexture('explosion2',0,true);
        this.player.visible = false;
        this.respawnTimer = 100;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.dropDynamiteCounter = 200;
        
    }
  //  else  if (dynamite.body.touching.left && player.body.touching.right ) {
//        dynamite.body.velocity.x = player.body.velocity.x / 2;    
//    }

  },

  dynamitePlatformCollision : function(dynamite, platform) {
    if (this.dynamitesCounters[this.dynamites.getChildIndex(dynamite)] < 30 && 
        platform['explodable']) {

        platform.kill();
    }
  },

  respawn: function() {
        this.player.x = this.playerSpawnX;
        this.player.y = this.playerSpawnY;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.score = this.scoreAtLevelStart;
        this.scoreText.text = 'Level ' + this.level + ' Score: ' + this.score;
        this.player.visible = true;
    },

  win: function(player, exit) {
    if (this.distanceBetweenTwoPoints(player, exit) < 5 && !this.goToNextLevel) {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.respawnTimer = 100;
        this.goToNextLevel = true;
        this.player.visible = false;

        this.dropDynamiteCounter = 200;
        this.dynamites.forEachAlive(function(dynamite) {
            dynamite.kill();
            //this.exit.remove(exit1);
        }, this);

      }

  },
  collectStar : function(player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    this.score += 10;
    this.scoreText.text = 'Level ' + this.level + ' Score: ' + this.score;

  },
  pushRock : function(player, rock) {
    if (rock["pushable"] && !rock.body.touching.up) {
        rock.body.velocity.x = player.body.velocity.x / 2;    
        player.body.velocity.x = player.body.velocity.x / 2.1;    
    }
  },
  touchRock : function(player, rock) {
    return !rock["pushable"];
  },
      distanceBetweenTwoPoints: function(a, b) {
        var xs = b.x - a.x;
        xs = xs * xs;

        var ys = b.y - a.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    },

};