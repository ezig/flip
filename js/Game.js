TileGame.Game = function(){};

// Adventure mode or classic difficulty
var levelType

// Array of tiles used to generate level 
var level = [];
var levelNum;
var levelTitle;

// Array of tiles build in drawField
var field = [];

//dimension of square level/field
var size;

TileGame.Game.prototype = {

    init: function () {
        // Copy state properties to local variables
        levelNum = this.levelNum;
        levelType = this.levelType;

        if (levelType == "Adventure")
        {
            // get the level data from the global JSON
            level = data[levelNum - 1].level;
            size = data[levelNum - 1].size;
            levelTitle = data[levelNum - 1].name;
        } else {
            // If we're in classic mode,
            // set the size of the field based on difficulty mode
            var sizes = [];
            sizes["Easy"] = 3;
            sizes["Medium"] = 4;
            sizes["Hard"] = 5;

            size = sizes[levelType];
        }
    },

    create: function () {
        this.flipSound = this.game.add.audio('flip');
        this.wonSound = this.game.add.audio('won');

        // add main menu and audio toggle buttons
        var menu = this.game.add.button(this.game.world.centerX - (size/2.0 * 100),
            this.game.world.centerY - (size/2.0 * 100) - 60, 'menu', this.mainMenu, this);

        var audio = this.game.add.button(this.game.world.centerX - (size/2.0 * 100) + 50,
            this.game.world.centerY - (size/2.0 * 100) - 60, 'audio', this.audio, this);
        audio.frame = 0;

        // show the right icon for the current mute setting
        if (Phaser.SoundManager.muted)
        {
            audio.frame = 1;
        }

        // in classic mode, make a button to generate a new random level
        if (levelType != "Adventure")
        {
            var newLevel = this.game.add.button(this.game.world.centerX - (size/2.0 * 100) + (size - 1) * 100,
                this.game.world.centerY - (size/2.0 * 100) - 60, 'new', this.newLevel, this);
        }

        // in adventure mode, display the title of the level 
        if (levelType == "Adventure")
        {
            var style = { font: "30px Ubuntu", fill: "#FFFFFF", align: "center"};
            var title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - (size/2.0 * 100) - 60,
             levelTitle, style);
            title.anchor.set(0.45, -0.25);
        }

        var restart = this.game.add.button(this.game.world.centerX - (size/2.0 * 100) + size * 100 - 50,
            this.game.world.centerY - (size/2.0 * 100) - 60, 'restart', this.restart, this);

        for (var i = 0; i < size; i++) {
            field[i] = [];
        }

        if (levelType == 'Adventure') {
            this.drawField();
        }
        else {
            this.generateLevel();
        }
    },

    restart: function () {
        this.drawField();
    },

    mainMenu: function () {
        if (levelType == 'Adventure') {
            // prevent scrolling over to the next page
            // if you quit the last level on a pageinstead of beating it
            this.state.states['Game'].levelNum--;

            this.state.start('LevelSelect');
        } 
        else  {
            this.state.states['MainMenu'].menu = 'Classic';
            this.state.start('MainMenu');
        }
    },

    audio: function (button) {
        Phaser.SoundManager.muted = !Phaser.SoundManager.muted;
        button.frame = (button.frame + 1) % 2;

        localStorage['muted'] = JSON.stringify(Phaser.SoundManager.muted);
    },

    newLevel: function() {
        this.generateLevel();
    },

    //  go back to the appropriate menu.
    win: function (pointer) {
        if (levelType == 'Adventure') {
            // set the current level to beaten
            this.game.global.lockedArray[levelNum - 1] = 2

            // unlock the next level (if it's locked)
            if (this.game.global.lockedArray[levelNum] == 0)
            {
                this.game.global.lockedArray[levelNum] = 1;
            }

            // update local save
            localStorage["levels"] = JSON.stringify(this.game.global.lockedArray);

            // go back to level select menu
            this.state.start('LevelSelect');

        }
        // if we're in classic mode, go back to the main menu
        else {
            this.state.start('MainMenu');
        }

    },

    generateLevel: function () {
        for (var i = 0; i < size; i++) {
            level[i] = [];

            for (var j = 0; j < size; j++) {
                level[i][j] = [0];
            }
        }
        this.drawField();

        while (this.checkWin())
        {
            for (var i = 0; i < size; i++) {
                this.pickTile(Math.floor((Math.random() * (size - 1))), Math.floor((Math.random() * (size - 1))));
            }
        }

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                level[i][j] = field[i][j].val;
            }
        }

    },

    drawField: function () {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (level[j][i] !== "") {
                    var tile = this.game.add.sprite(this.game.world.centerX - (size/2.0 * 100) + i * 100,
                     this.game.world.centerY - (size/2.0) * 100 + j * 100,'tile');

                    tile.val = level[j][i];
                    this.changeTint(tile);

                    tile.row = j;
                    tile.col = i;
                    tile.isTile = true;
                    tile.inputEnabled = true;
                    tile.events.onInputDown.add(this.onDown, this);
                    field[j][i] = tile;
                } else {
                    var tile = {
                        val: 0,
                        isTile: false 
                    };

                    field[j][i] = tile;
                }
            }
        }
    },

    onDown: function (tile, pointer) {
        if (!Phaser.SoundManager.muted) {
            this.flipSound.play();
        }

        // flip tiles
        this.pickTile(tile.row, tile.col);

        // if all of the tiles are white, win the game
        if (this.checkWin())
        {
            this.winEffects();
        }
    },

    // when a tile is clicked, flip that tile and the adjacent tiles
    pickTile: function (row, col) {
        this.flipTile(row, col);
        this.flipTile(row - 1, col);
        this.flipTile(row + 1, col);
        this.flipTile(row, col - 1);
        this.flipTile(row, col + 1);
    },

    flipTile: function (row, col) {
        // if the row,col passed is within the field and 
        // is a tile (in the case of non-rectangular fields) flip it
        if (row < size && row >= 0 && col < size && col >= 0) {
            if (field[row][col].isTile) {
                // toggle the value between 0 and 1
                field[row][col].val = (field[row][col].val + 1) % 2;
                // change color to match value
                this.changeTint(field[row][col]);
            }
        }
    },

    // changes the color of the tile based on the value
    // 0 is white and 1 is red
    changeTint: function (tile) {
        if (tile.val == 0) {
            tile.tint = "0xFFFFFF";
        } 
        else {
            tile.tint = "0xFF0000";
        }
    },

    // checks if all of the tiles are white (0)
    // returns true if all tiles are white, false otherwise
    checkWin: function () {
        var sum = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                sum += field[i][j].val;
            }
        }

        return (sum == 0);
    },

    // plays the winning sound and launches particle emitter
    winEffects: function () {
        var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY - 50, 80);
        emitter.makeParticles('particle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 100;
        emitter.start(true, 1500, null, 300);
        this.game.time.events.add(1500, this.win, this);

        if (!Phaser.SoundManager.muted) {
            this.wonSound.play();
        }
    },
};
