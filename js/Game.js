TileGame.Game = function(){};

var levelType
var level;
var levelNum;
var field = [];
var size;

TileGame.Game.prototype = {

    init: function () {
        levelNum = this.levelNum;
        levelType = this.levelType;

    },

    create: function () {
        this.flipSound = this.game.add.audio('flip');
        this.wonSound = this.game.add.audio('won');

        if (levelType == "Adventure")
        {
            level = data[levelNum].level;
            size = data[levelNum].size;
        } else {
            var sizes = [];
            sizes["Easy"] = 3;
            sizes["Medium"] = 4;
            sizes["Hard"] = 5;
            sizes["Killer"] = 6;

            size = sizes[levelType];
        }

        for (var i = 0; i < size; i++) {
            field[i] = [];

            for (var j = 0; j < size; j++)
            {
                field[i][j] = [0];
            }
        }

        if (levelType == 'Adventure') {
            this.drawField();
        }
        else {
            this.generateLevel();
        }
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        if (levelType == 'Adventure') {
            if (levelNum < data.length - 1) {
                this.state.states['Game'].levelNum++;
                this.state.start('Game', true, false);
            } else {
                this.state.start('MainMenu');
            }
        }
        else {
            this.state.start('MainMenu');
        }

    },

    generateLevel: function () {
        level = field;
        this.drawField();

        while (this.checkWin())
        {
            for (var i = 0; i < size; i++) {
                this.pickTile(Math.floor((Math.random() * (size - 1))), Math.floor((Math.random() * (size - 1))));
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
        this.flipSound.play();

        this.pickTile(tile.row, tile.col);

        if (this.checkWin())
        {
            this.win();
        }
    },

    pickTile: function (row, col) {
        this.flipTile(row, col);
        this.flipTile(row - 1, col);
        this.flipTile(row + 1, col);
        this.flipTile(row, col - 1);
        this.flipTile(row, col + 1);
    },

    flipTile: function (row, col) {
        if (row < size && row >= 0 && col < size && col >= 0) {
            if (field[row][col].isTile) {
                field[row][col].val = (field[row][col].val + 1) % 2;

                this.changeTint(field[row][col]);
            }
        }
    },

    changeTint: function (tile) {
        if (tile.val == 0) {
            tile.tint = "0xFFFFFF";
        } 
        else {
            tile.tint = "0xFF0000";
        }
    },

    checkWin: function () {
        var sum = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                sum += field[i][j].val;
            }
        }

        return (sum == 0);
    },

    win: function () {
        var emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY - 50, 100);
        emitter.makeParticles('particle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 100;
        emitter.start(true, 1500, null, 300);
        this.wonSound.onStop.add(this.quitGame, this);
        this.wonSound.play();
    },
};
