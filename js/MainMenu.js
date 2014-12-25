TileGame.MainMenu = function(){};

var buttonGroup;

TileGame.MainMenu.prototype = {
	create: function() {
		// this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,
		// 	'space');
		// this.background.autoScroll(-15,20);
		buttonGroup = this.game.add.group();

		var text = "Flip";
		var style = { font: "30px Arial", fill: "0xFFFFFF", align: "center"};
		var quarterY = this.game.height/4.0;
		var t = this.game.add.text(this.game.world.centerX, quarterY, text, style);
		t.anchor.set(0.5, 0.5);

		var texts = ["Easy", "Medium", "Hard", "Adventure"];
		var style = { font: "20px Arial", fill: "000", align: "center"};

		var classicButton = this.game.add.button(this.game.world.centerX, quarterY + 80, 'button', this.onClickClassic, this);
		classicButton.anchor.set(0.5, 0.5);
		classicButton.events.onInputOver.add(this.onOver, this);
		classicButton.events.onInputOut.add(this.onOut, this);
		var t = this.game.add.text(this.game.world.centerX, quarterY + 80, 'Classic Mode', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(classicButton);
		buttonGroup.add(t);

		var adventureButton = this.game.add.button(this.game.world.centerX, quarterY + 160, 'button', this.onClickAdventure, this);
		adventureButton.anchor.set(0.5, 0.5);
		adventureButton.events.onInputOver.add(this.onOver, this);
		adventureButton.events.onInputOut.add(this.onOut, this);
		var t = this.game.add.text(this.game.world.centerX, quarterY + 160, 'Adventure Mode', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(adventureButton);
		buttonGroup.add(t);

		var easyButton = this.game.add.button(this.game.world.centerX + this.game.world.width, quarterY + 80, 'button', this.onClickSelect, this);
		easyButton.anchor.set(0.5, 0.5);
		easyButton.events.onInputOver.add(this.onOver, this);
		easyButton.events.onInputOut.add(this.onOut, this);
		easyButton.levelType = "Easy";
		var t = this.game.add.text(this.game.world.centerX + this.game.world.width, quarterY + 80, 'Easy', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(easyButton);
		buttonGroup.add(t);

		var mediumButton = this.game.add.button(this.game.world.centerX + this.game.world.width, quarterY + 160, 'button', this.onClickSelect, this);
		mediumButton.anchor.set(0.5, 0.5);
		mediumButton.events.onInputOver.add(this.onOver, this);
		mediumButton.events.onInputOut.add(this.onOut, this);
		mediumButton.levelType = "Medium";
		var t = this.game.add.text(this.game.world.centerX + this.game.world.width, quarterY + 160, 'Medium', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(mediumButton);
		buttonGroup.add(t);

		var hardButton = this.game.add.button(this.game.world.centerX + this.game.world.width, quarterY + 240, 'button', this.onClickSelect, this);
		hardButton.anchor.set(0.5, 0.5);
		hardButton.events.onInputOver.add(this.onOver, this);
		hardButton.events.onInputOut.add(this.onOut, this);
		hardButton.levelType = "Hard";
		var t = this.game.add.text(this.game.world.centerX + this.game.world.width, quarterY + 240, 'Hard', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(hardButton);
		buttonGroup.add(t);

		var backButton = this.game.add.button(this.game.world.centerX + this.game.world.width, quarterY + 320, 'button', this.onClickBack, this);
		backButton.anchor.set(0.5, 0.5);
		backButton.events.onInputOver.add(this.onOver, this);
		backButton.events.onInputOut.add(this.onOut, this);
		var t = this.game.add.text(this.game.world.centerX + this.game.world.width, quarterY + 320, 'Back', style);
		t.anchor.set(0.5, 0.5);

		buttonGroup.add(backButton);
		buttonGroup.add(t);
	},

	onClickClassic: function(button) {
		button.tint = 0xFF0000;


		var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: -this.game.width
			}, 1000, Phaser.Easing.Cubic.Out);
		buttonsTween.start();
	},

	onClickAdventure: function(button) {
		button.tint = 0xFF0000;
		this.game.state.states['Game'].levelType = 'Adventure';
		this.game.state.start('LevelSelect');
	},

	onClickBack: function(button) {
		var buttonsTween = this.game.add.tween(buttonGroup);
			buttonsTween.to({
				x: 0
			}, 1000, Phaser.Easing.Cubic.Out);
		buttonsTween.start();
	},

	onClickSelect: function(button) {
		this.game.state.states['Game'].levelType = button.levelType;
		this.game.state.start('Game');
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