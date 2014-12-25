TileGame.ClassicGame = function(){};


var field = [];
var size;

TileGame.ClassicGame.prototype = {

    init: function (level) {
        size = level + 3;
    },

    create: function () {
        this.flipSound = this.game.add.audio('flip');
        this.wonSound = this.game.add.audio('won');

        for (var i = 0; i < size; i++)
        {
            field[i] = [];
        }

        this.drawField();

        while (this.checkWin())
        {
            for (var i = 0; i < size; i++) {
                this.pickTile(Math.floor((Math.random() * (size - 1))), Math.floor((Math.random() * (size - 1))));
            }
        }
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
                var tile = this.game.add.sprite(this.game.world.centerX - (size/2.0 * 100) + j * 100,
                 this.game.world.centerY - (size/2.0) * 100 + i * 100,'tile');

                tile.val = 0
                tile.row = j;
                tile.col = i;
                tile.inputEnabled = true;
                tile.events.onInputDown.add(this.onDown, this);
                field[j][i] = tile;
            }
        }
    },

    onDown: function (tile, pointer) {
        this.flipSound.play();

        this.pickTile(tile.row, tile.col);

        if (this.checkWin())
        {
            this.wonSound.onStop.add(this.quitGame, this);
            this.wonSound.play();
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
        if (row < size && row >= 0 && col < size && col >= 0)
        {
            field[row][col].val = (field[row][col].val + 1) % 2;

            if (field[row][col].val == 0)
            {
                field[row][col].tint = "0xFFFFFF";
            } else 
            {
                field[row][col].tint = "0xFF0000";
            }
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
