TileGame.MainMenu = function(){};

TileGame.MainMenu.prototype = {
	create: function() {
		// this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
		// 	'space');
		// this.background.autoScroll(-15,20);
		this.game.stage.backgroundColor = '#1CABD7';

		var text = "Flip";
		var style = { font: "30px Arial", fill: "fff", align: "center"};
		var t = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 80, text, style);
		t.anchor.set(0.5, 0.5);

		var texts = ["Easy", "Medium", "Hard"];
		var style = { font: "20px Arial", fill: "000", align: "center"};
		for (var i = 0; i < 3; i++)
		{
			var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 80 * i, 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			button.level = i;

			var t = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 80 * i, texts[i], style);
			t.anchor.set(0.5, 0.5);
		}
	},

	onClick: function(button) {
		button.tint = 0xFF0000;
		this.game.state.start('Game', true, false, button.level);
	},

	onOver: function(button) {
		button.tint = 0xFF0000;
	},

	onOut: function(button) {
		button.tint = 0xFFFFFF;
	},

	update: function() {
		// if(this.game.input.activePointer.justPressed()) {
		// 	this.game.state.start('Game', true, false, 3);
		// }
	}
};