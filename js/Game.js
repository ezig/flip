TileGame.Game = function(){};

var level;
var levelNum;
var field = [];
var size;

TileGame.Game.prototype = {

    init: function (lev) {
        levelNum = lev;
        level = data[lev].level;
        size = data[lev].size;
    },

    create: function () {


        for (var i = 0; i < size; i++)
        {
            field[i] = [];
        }

        this.drawField();
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('Game', true, false, levelNum + 1);

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
        this.pickTile(tile);

        if (this.checkWin())
        {
            this.quitGame();
        }
    },

    pickTile: function (tile) {
        var row = tile.row;
        var col = tile.col;

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

        return sum == 0;
    }
};
