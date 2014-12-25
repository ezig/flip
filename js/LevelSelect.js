TileGame.LevelSelect = function(){};

// total number of pages
var pages;

// keeps track of sprites that need to move
var levelThumbsGroup;

var currentPage;

// nav buttons
var leftArrow;
var rightArrow;
 
TileGame.LevelSelect.prototype = {
  	create: function(){
  		var menu = this.game.add.button(this.game.world.centerX - (this.game.global.thumbCols / 2.0) * (this.game.global.thumbWidth + this.game.global.thumbSpacing),
			this.game.world.centerY - ((this.game.global.thumbRows + 1) / 2.0) * (this.game.global.thumbHeight + this.game.global.thumbSpacing), 'menu', this.mainMenu, this);

  		// how many pages are needed to show all levels
  		var levelsPerPage = this.game.global.thumbRows * this.game.global.thumbCols;
  		pages = this.game.global.numLevels / levelsPerPage;

  		// current page according to last played level
		currentPage = Math.floor(this.game.state.states['Game'].levelNum / levelsPerPage);
		
		// if you just played the last level, don't go to a nonexistant page
		if(currentPage > pages - 1){
			currentPage = pages - 1;
		}
		// left page arrow
		leftArrow = this.game.add.button(this.game.world.centerX - (this.game.global.thumbCols / 2.0) * (this.game.global.thumbWidth + this.game.global.thumbSpacing),
			this.game.world.centerY + (this.game.global.thumbRows / 2.0) * (this.game.global.thumbHeight + this.game.global.thumbSpacing),"leftArrow",this.leftArrowClicked,this);

		// grey out the left arrow if on the first page
		if(currentPage == 0) {
			leftArrow.alpha = 0.3;
		}

		// arrow button, to turn one page right
		rightArrow = this.game.add.button(this.game.world.centerX + (this.game.global.thumbCols / 2.0) * (this.game.global.thumbWidth + this.game.global.thumbSpacing),
			this.game.world.centerY + (this.game.global.thumbRows / 2.0) * (this.game.global.thumbHeight + this.game.global.thumbSpacing),"rightArrow",this.rightArrowClicked,this);
		rightArrow.anchor.setTo(1, 0);

		// grey out right arrow if on the last page
		if(currentPage == pages - 1) {
			rightArrow.alpha = 0.3;
		}
		// creation of the thumbails group
		levelThumbsGroup = this.game.add.group();
		// determining level thumbnails width and height for each page
		var levelLength = this.game.global.thumbWidth*this.game.global.thumbCols+
			this.game.global.thumbSpacing*(this.game.global.thumbCols-1);
		var levelHeight = this.game.global.thumbWidth*this.game.global.thumbRows+this.game.global.thumbSpacing*(this.game.global.thumbRows-1);
		// looping through each page
		for(var l = 0; l < pages; l++){
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (this.game.width-levelLength)/2+this.game.width*l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
			var offsetY = (this.game.height - levelHeight)/2;
			// looping through each level thumbnails
		     for(var i = 0; i < this.game.global.thumbRows; i ++){
		     	for(var j = 0; j < this.game.global.thumbCols; j ++){  
		     		// which level does the thumbnail refer?
					var levelNumber = i*this.game.global.thumbCols+j+l*(this.game.global.thumbRows*this.game.global.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = this.game.add.button(offsetX+j*(this.game.global.thumbWidth+this.game.global.thumbSpacing), offsetY+i*(this.game.global.thumbHeight+this.game.global.thumbSpacing), "levels", this.thumbClicked, this);	
					// shwoing proper frame
					if (this.game.global.lockedArray[levelNumber] == 0) {
						levelThumb.tint = "0x999999";
						levelThumb.isLocked = true;
					}
					else {
						if (this.game.global.lockedArray[levelNumber] == 2) {
							levelThumb.tint = "0xFFC125";
						}
						levelThumb.isLocked = false;
					}
					levelThumb.clicked = false;
					// custom attribute 
					levelThumb.levelNumber = levelNumber+1;
					// adding the level thumb to the group
					levelThumbsGroup.add(levelThumb);
					// if the level is playable, also write level number
					if(this.game.global.lockedArray[levelNumber]<4){
						var style = {
							font: "18px Arial",
							fill: "#000000"
						};
						var levelText = this.game.add.text(levelThumb.x+10,levelThumb.y+10,levelNumber+1,style);
						//levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						levelThumbsGroup.add(levelText);
					}
				}
			}
		}
		// scrolling thumbnails group according to level position
		levelThumbsGroup.x = currentPage * this.game.width * -1
	},

	leftArrowClicked:function(button){
		// touching left arrow and still not reached first page
		if(currentPage>0){
			rightArrow.alpha = 1;
			currentPage--;
			// fade out the button if we reached first page
			if(currentPage == 0){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = this.game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * this.game.width * -1
			}, 1000, Phaser.Easing.Cubic.Out);
			buttonsTween.start();
		}		
	},

	rightArrowClicked: function (button) {
		// touching right arrow and still not reached last page
		if(currentPage<pages-1){
			leftArrow.alpha = 1;
			currentPage++;
			// fade out the button if we reached last page
			if(currentPage == pages-1){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = this.game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * this.game.width * -1
			}, 1000, Phaser.Easing.Cubic.out);
			buttonsTween.start();
		}
	},

	thumbClicked:function (button){
		// the level is playable
		if(!button.isLocked){
			this.game.state.states['Game'].levelNum = button.levelNumber;
			this.game.global.level = button.levelNumber;
			this.game.state.start('Game');
		}
		// otherwise shake the icon to show it is locked
		else {
			if (!button.clicked)
			{
				button.clicked = true;

				// shakes back and forth once
				var buttonTween = this.game.add.tween(button)
				buttonTween.to({
					x: button.x + 10
				}, 40, Phaser.Easing.Cubic.None);
				buttonTween.to({
					x: button.x - 10
				}, 40, Phaser.Easing.Cubic.None);
				buttonTween.to({
					x: button.x
				}, 40, Phaser.Easing.Cubic.None);
				buttonTween.onComplete.add(this.tweenDone, this);
				buttonTween.start();
			}
		}
	},

	tweenDone: function (target, buttonTween) {
		target.clicked = false;
	},

    mainMenu: function () {
        this.state.start('MainMenu');
    },
} 