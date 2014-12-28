var TileGame = {};

TileGame.Boot = function(){};

TileGame.Boot.prototype = {

	init: function() {

    },

	preload: function() {
		// preloader assets
		this.load.image('progressBar', 'assets/images/progressBar.png');
	},
	create: function() {
        this.game.stage.backgroundColor = '#1CABD7';

        // disable multi touch
        this.input.maxPointers = 1;

        if (this.game.device.desktop)
        {
            //  desktop specific settings go in here
            this.scale.pageAlignVertically = true;
            this.scale.pageAlignHorizontally = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize();
            this.game.scale.refresh();
        }
        else
        {
            this.scale.pageAlignVertically = true;
            this.scale.pageAlignHorizontally = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(640, 360, 1280, 720);
            this.game.scale.setScreenSize();
            this.game.scale.refresh();
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.setScreenSize();
            // this.game.scale.refresh();
            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.scale.setMinMax(480, 260, 1024, 768);
            // this.scale.forceLandscape = true;
            // this.scale.pageAlignHorizontally = true;
        }

        this.state.start('Preload');
    }
};