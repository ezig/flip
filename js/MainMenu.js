TileGame.MainMenu = function(){};

TileGame.MainMenu.prototype = {
	create: function() {
		// this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
		// 	'space');
		// this.background.autoScroll(-15,20);
		this.game.stage.backgroundColor = '#1CABD7';

		var text = "Tap to begin";
		var style = { font: "30px Arial", fill: "#fff", align: "center"};
		var t = this.game.add.text(this.game.world.centerX, this.game.world.centerY, text, style);
		t.anchor.set(0.5, 0.5);
	},
	update: function() {
		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start('Game');
		}
	}
};