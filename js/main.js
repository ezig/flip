var TileGame = TileGame || {};

TileGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

TileGame.game.global = {
	thumbRows : 4,
	// number of thumbnail cololumns
	thumbCols : 4,
	// width of a thumbnail, in pixels
	thumbWidth : 98,
	// height of a thumbnail, in pixels
	thumbHeight : 98,
	// space among thumbnails, in pixels
	thumbSpacing : 10,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	numLevels : 36,

	lockedArray : [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	// level currently playing
	level : 0
}

TileGame.game.state.add('Boot', TileGame.Boot);
TileGame.game.state.add('Preload', TileGame.Preload);
TileGame.game.state.add('MainMenu', TileGame.MainMenu);
TileGame.game.state.add('Game', TileGame.Game);
TileGame.game.state.add('LevelSelect', TileGame.LevelSelect);

TileGame.game.state.start('Boot');