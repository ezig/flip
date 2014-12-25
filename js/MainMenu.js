TileGame.MainMenu = function(){};

TileGame.MainMenu.prototype = {
	create: function() {
		// this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
		// 	'space');
		// this.background.autoScroll(-15,20);
		var text = "Flip";
		var style = { font: "30px Arial", fill: "0xFFFFFF", align: "center"};
		var quarterY = this.game.height/4.0;
		var t = this.game.add.text(this.game.world.centerX, quarterY, text, style);
		t.anchor.set(0.5, 0.5);

		var texts = ["Easy", "Medium", "Hard", "Adventure"];
		var style = { font: "20px Arial", fill: "000", align: "center"};
		for (var i = 0; i < 4; i++)
		{
			var button = this.game.add.button(this.game.world.centerX, quarterY + 80 * (i + 1), 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			
			button.levelType = texts[i];

			var t = this.game.add.text(this.game.world.centerX, quarterY + 80 * (i + 1), texts[i], style);
			t.anchor.set(0.5, 0.5);
		}
	},

	onClick: function(button) {
		button.tint = 0xFF0000;
		this.game.state.states['Game'].levelType = button.levelType;

		if (button.levelType == 'Adventure')
		{
			this.game.state.start('LevelSelect');
		} else {
			this.game.state.start('Game');
		}
		// this.game.state.states['Game'].levelNum = 20;
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