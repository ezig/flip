TileGame.Game = function(){};


var field = new Array([]);
var tiles = [[],[],[],[]];

TileGame.Game.prototype = {

    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        field = [[0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]];

        for (var i = 0; i < 5; i++) {
            this.pickTile(Math.floor((Math.random() * 3)), Math.floor((Math.random() * 3)));
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
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var tile = this.game.add.sprite(this.game.world.centerX - 200 + i * 100,
                 this.game.world.centerY - 200 + j * 100,'tile');

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
        if (row < 4 && row >= 0 && col < 4 && col >= 0)
        {
            field[row][col] = (field[row][col] + 1) % 2;
        }
    },

    checkWin: function () {
        var sum = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                sum += field[i][j];
            }
        }

        return sum == 0;
    }
};
