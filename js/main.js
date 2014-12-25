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
	numLevels : 48,

	lockedArray : [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	// level currently playing
	level : 0
}

if (typeof localStorage["levels"] != 'undefined')
{
	TileGame.game.global.lockedArray = JSON.parse(localStorage["levels"]);
}

TileGame.game.state.add('Boot', TileGame.Boot);
TileGame.game.state.add('Preload', TileGame.Preload);
TileGame.game.state.add('MainMenu', TileGame.MainMenu);
TileGame.game.state.add('Game', TileGame.Game);
TileGame.game.state.add('LevelSelect', TileGame.LevelSelect);

TileGame.game.state.states['Game'].levelNum = 1;
TileGame.game.state.start('Boot');