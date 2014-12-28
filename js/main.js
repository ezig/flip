var TileGame = TileGame || {};
// simply pass them in

TileGame.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

TileGame.game.global = {
	// number of rows, columns for level select
	thumbRows : 4,
	thumbCols : 4,

	// dimensions of a thumbnail
	thumbWidth : 98,
	thumbHeight : 98,

	// space between level select thumbnails, in pixels
	thumbSpacing : 10,

	// this MUST equal lockedArray.length and
	// numLevels % (thumbRows * thumbCols) must equal 0 !!
	numLevels : 32,

	// Default states of the levels. 0 is locked, 1 is unlocked, 2 is beaten.
	lockedArray : [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
}

// if a local save exists, use it
if (typeof localStorage['levels'] != 'undefined')
{
	TileGame.game.global.lockedArray = JSON.parse(localStorage['levels']);
}

// if a local mute setting exists, use it
if (typeof localStorage['muted'] != 'undefined')
{
	Phaser.SoundManager.muted = JSON.parse(localStorage['muted']);
}

TileGame.game.state.add('Boot', TileGame.Boot);
TileGame.game.state.add('Preload', TileGame.Preload);
TileGame.game.state.add('MainMenu', TileGame.MainMenu);
TileGame.game.state.add('Game', TileGame.Game);
TileGame.game.state.add('LevelSelect', TileGame.LevelSelect);

// when the level select page loads, show the first page
TileGame.game.state.states['Game'].levelNum = 1;

TileGame.game.state.start('Boot');