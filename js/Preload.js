TileGame.Preload = function(){};

TileGame.Preload.prototype = {
	preload: function() {
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 40,
			'progressBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);

		// load assets
		this.load.image('tile', 'assets/images/tile.png');
		this.load.image('particle', 'assets/images/particle.png');
		this.load.image('button', 'assets/images/button.png');
		this.load.image('menu', 'assets/images/menu.png');
		this.load.image('musicOff', 'assets/images/musicOff.png');
		this.load.image('musicOn', 'assets/images/musicOn.png');
		this.load.image('restart', 'assets/images/restart.png');
		this.load.image('new', 'assets/images/new.png');
		this.load.audio('flip', 'assets/audio/flip.ogg');
		this.load.audio('won', 'assets/audio/won.ogg');
		
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