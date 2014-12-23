var TileGame = {};

TileGame.Boot = function(){};

TileGame.Boot.prototype = {

	init: function() {

    },

	preload: function() {
		// preloader assets
		this.load.image('progressBar', 'assets/images/progress_bar_bg.png');
        this.load.image('progressBarDark', 'assets/images/progress_bar_fg.png');
	},
	create: function() {
        // disable multi touch
        this.input.maxPointers = 1;

         //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  desktop specific settings go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

		this.state.start('Preload');
	}
};