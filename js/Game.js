TileGame.Game = function(){};


var field = [];
var tiles = [];
var size;

TileGame.Game.prototype = {

    init: function (level) {
        size = level + 3;
    },

    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        for (var i = 0; i < size; i++)
        {
            tiles[i] = [];
            field[i] = [];
            for (var j = 0; j < size; j++)
            {
                field[i][j] = 0;
            }
        }

        for (var i = 0; i < size; i++) {
            this.pickTile(Math.floor((Math.random() * (size - 1))), Math.floor((Math.random() * (size - 1))));
        };

        this.drawField();
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    drawField: function () {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var tile = this.game.add.sprite(this.game.world.centerX - (size/2.0 * 100) + i * 100,
                 this.game.world.centerY - (size/2.0) * 100 + j * 100,'tile');

                if (field[j][i] == 1)
                {
                    tile.tint = 0xFF0000
                }
                tile.row = j;
                tile.col = i;
                tile.inputEnabled = true;
                tile.events.onInputDown.add(this.onDown, this);
                tiles[j][i] = tile;
            }
        }
    },

    onDown: function (tile, pointer) {
        this.pickTile(tile.row, tile.col);

        if (this.checkWin())
        {
            this.quitGame();
        }

        this.drawField();
    },

    pickTile: function (row, col) {
        this.flipTile(row, col);
        this.flipTile(row - 1, col);
        this.flipTile(row + 1, col);
        this.flipTile(row, col - 1);
        this.flipTile(row, col + 1);
    },

    flipTile: function (row, col) {
        if (row < size && row >= 0 && col < size && col >= 0)
        {
            field[row][col] = (field[row][col] + 1) % 2;
        }
    },

    checkWin: function () {
        var sum = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                sum += field[i][j];
            }
        }

        return sum == 0;
    }
};
