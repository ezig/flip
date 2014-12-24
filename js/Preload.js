TileGame.Preload = function(){};

TileGame.Preload.prototype = {
	preload: function() {
		// this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 40,
		// 	'progressBar');
		// this.preloadBar.anchor.setTo(0.5, 0.5);
		// this.load.setPreloadSprite(this.preloadBar);

		// load assets
		this.load.image('tile', 'assets/images/tile.png');
		this.load.spritesheet('button', 'assets/images/button.png', 190, 49);
		
	},
	
	create: function() {
		//	Once the load has finished we disable the crop as the music decodes
		//this.preloadBar.cropEnabled = false;
		this.ready = true;
		this.state.start('MainMenu');
	},

	update: function() {
		//waits for audio to finish decoding for smoother experience

		// if (this.cache.isSoundDecoded('collect') && this.ready == false)
		// {
		// 	this.ready = true;
		// 	this.state.start('MainMenu');
		// }
	}
};