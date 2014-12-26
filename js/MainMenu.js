TileGame.MainMenu = function(){};

var buttonGroup;

TileGame.MainMenu.prototype = {
	create: function() {
		// this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
		// 	'space');
		// this.background.autoScroll(-15,20);
		buttonGroup = this.game.add.group();

		var style = { font: "30px Ubuntu", fill: "#FFFFFF", align: "center"};
		var quarterY = this.game.height/4.0;
		var title = this.game.add.text(this.game.world.centerX, quarterY, 'Flip', style);
		title.anchor.set(0.5, 0.5);

		var titleTween = this.game.add.tween(title)
		titleTween.to({
			angle: 180
			}, 1500, Phaser.Easing.Cubic.None);
		titleTween.to({
			angle: 180
			}, 2000, Phaser.Easing.Cubic.None);
		titleTween.to({
			angle: 0
			}, 1500, Phaser.Easing.Cubic.None);
		titleTween.to({
			angle: 0
			}, 2000, Phaser.Easing.Cubic.None);
		titleTween.repeatAll(Infinity);
		titleTween.start();

		var texts = ['Classic', 'Adventure', 'Help'];
		var style = { font: "20px Ubuntu", fill: "#000000", align: "center"};

		for (var i = 1; i <= 3; i++)
		{
			var button = this.game.add.button(this.game.world.centerX, quarterY + 80 * i, 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			button.title = texts[i - 1];

			var t = this.game.add.text(this.game.world.centerX, quarterY + 80 * i, texts[i - 1], style);
			t.anchor.set(0.5, 0.5);

			buttonGroup.add(button);
			buttonGroup.add(t);
		}

		var texts = ['Easy', 'Medium', 'Hard', 'Back']
		for (var i = 1; i <= 4; i++)
		{
			var button = this.game.add.button(this.game.world.centerX + this.game.world.width, quarterY + 80 * i, 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			button.title = texts[i - 1];

			var t = this.game.add.text(this.game.world.centerX + this.game.world.width, quarterY + 80 * i, texts[i - 1], style);
			t.anchor.set(0.5, 0.5);

			buttonGroup.add(button);
			buttonGroup.add(t);
		}

		var helpText = this.game.add.text(this.game.world.centerX - this.game.world.width, quarterY + 75,
		 'Flip all of the tiles from red to white.\n Flipping a tile flips all adjacent tiles.', style);
		helpText.anchor.set(0.5,0.5);

		var help = this.game.add.sprite(this.game.world.centerX - this.game.world.width, quarterY + 100, 'help');
		help.anchor.set(0.5,0)

		var button = this.game.add.button(this.game.world.centerX - this.game.world.width, quarterY + 320, 'button', this.onClick, this);
		button.anchor.set(0.5, 0.5);
		button.events.onInputOver.add(this.onOver, this);
		button.events.onInputOut.add(this.onOut, this);
		button.title = 'OK!';

		var t = this.game.add.text(this.game.world.centerX - this.game.world.width, quarterY + 320, 'OK!', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(helpText);
		buttonGroup.add(help);
		buttonGroup.add(button);
		buttonGroup.add(t);

		if (this.menu == 'Classic')
		{
			buttonGroup.x -= this.game.width
		}
	},


	onClick: function(button) {
		button.tint = 0xFF0000;

		if (button.title == "Classic") {
			var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: -this.game.width
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}
		else if (button.title == "Adventure") {
			this.game.state.states['Game'].levelType = 'Adventure';
			this.game.state.start('LevelSelect');
		}
		else if (button.title == "Help") {
			var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: this.game.width
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}
		else if (button.title == "Back" || button.title == "OK!") {
			var buttonsTween = this.game.add.tween(buttonGroup);

			buttonsTween.to({
				x: 0
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		} else {
			this.game.state.states['Game'].levelType = button.title;
			this.game.state.start('Game');
		}
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