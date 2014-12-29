TileGame.MainMenu = function(){};

var buttonGroup;

TileGame.MainMenu.prototype = {
	create: function() {
		// group for buttons to use for tweening between menus
		buttonGroup = this.game.add.group();

		// title text
		var style = { font: "60px Ubuntu", fill: "#FFFFFF", align: "center"};
		var title = this.game.add.text(this.game.world.centerX, this.game.height/6.0, 'Flip', style);
		title.anchor.set(0.5, 0.5);

		// set a rotating animation for the title on repeat
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

		// create the "center" menu
		var texts = ['Classic', 'Adventure', 'Help'];
		var style = { font: "30px Ubuntu", fill: "#000000", align: "center"};

		for (var i = 1; i <= 3; i++)
		{
			var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100 * (i - 2), 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputUp.add(this.onUp, this);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			button.title = texts[i - 1];
			button.scale.setTo(1.5);

			var t = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100 * (i - 2), texts[i - 1], style);
			t.anchor.set(0.5, 0.5);

			buttonGroup.add(button);
			buttonGroup.add(t);
		}

		// create the "right" menu you reach when classic is clicked
		var texts = ['Easy', 'Medium', 'Hard', 'Back']
		for (var i = 1; i <= 4; i++)
		{
			var button = this.game.add.button(this.game.world.centerX + this.game.world.width, this.game.world.centerY + 100 * (i - 2), 'button', this.onClick, this);
			button.anchor.set(0.5, 0.5);
			button.events.onInputUp.add(this.onUp, this);
			button.events.onInputOver.add(this.onOver, this);
			button.events.onInputOut.add(this.onOut, this);
			button.title = texts[i - 1];
			button.scale.setTo(1.5);

			var t = this.game.add.text(this.game.world.centerX + this.game.world.width, this.game.world.centerY + 100 * (i - 2), texts[i - 1], style);
			t.anchor.set(0.5, 0.5);

			buttonGroup.add(button);
			buttonGroup.add(t);
		}

		// create the help screen
		var helpText = this.game.add.text(this.game.world.centerX - this.game.world.width, this.game.world.centerY - 100,
		 'Flip all of the tiles from red to white.\n Flipping a tile flips all adjacent tiles.', style);
		helpText.anchor.set(0.5,0.5);

		var help = this.game.add.sprite(this.game.world.centerX - this.game.world.width, this.game.world.centerY - 50, 'help');
		help.anchor.set(0.5,0)

		var button = this.game.add.button(this.game.world.centerX - this.game.world.width, this.game.world.centerY + 200, 'button', this.onClick, this);
		button.anchor.set(0.5, 0.5);
		button.events.onInputUp.add(this.onUp, this);
		button.events.onInputOver.add(this.onOver, this);
		button.events.onInputOut.add(this.onOut, this);
		button.title = 'OK!';

		button.scale.setTo(1.5);

		var t = this.game.add.text(this.game.world.centerX - this.game.world.width, this.game.world.centerY + 200, 'OK!', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(helpText);
		buttonGroup.add(help);
		buttonGroup.add(button);
		buttonGroup.add(t);

		// If we just exited a classic level, display the list of 
		// classic difficulties, rather than the "center" menu
		if (this.menu == 'Classic')
		{
			buttonGroup.x -= this.game.width
		}
	},

	// respond to button click
	onClick: function(button) {
		if (button.title == "Classic") {
			// scrol to the right menu
			var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: -this.game.width
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}
		else if (button.title == "Adventure") {
			// go to the level select screen
			this.game.state.states['Game'].levelType = 'Adventure';
			this.game.state.start('LevelSelect');
		}
		else if (button.title == "Help") {
			// scroll to the help menu
			var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: this.game.width
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}
		else if (button.title == "Back" || button.title == "OK!") {
			// return to the center menu
			var buttonsTween = this.game.add.tween(buttonGroup);

			buttonsTween.to({
				x: 0
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}
		// else, one of the classic difficulties was chosen 
		else {
			// start classic game with chosen difficulty
			this.game.state.states['Game'].levelType = button.title;
			this.game.state.start('Game');
		}
	},

	// tint button white on release
	onUp: function(button) {
		button.tint = 0xFFFFFF;
	},

	// tint button red when mouse is over button
	onOver: function(button) {
		button.tint = 0xFF0000;
	},

	// disable tint when mouse exits button
	onOut: function(button) {
		button.tint = 0xFFFFFF;
	},
};