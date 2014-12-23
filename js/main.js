var TileGame = TileGame || {};

TileGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
TileGame.game.state.add('Boot', TileGame.Boot);
TileGame.game.state.add('Preload', TileGame.Preload);
TileGame.game.state.add('MainMenu', TileGame.MainMenu);
TileGame.game.state.add('Game', TileGame.Game);

TileGame.game.state.start('Boot');