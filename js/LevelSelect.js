TileGame.LevelSelect = function(){};

var pages;
// group where to place all level thumbnails
var levelThumbsGroup;
// current page
var currentPage;
// arrows to navigate through level pages
var leftArrow;
var rightArrow;
 
TileGame.LevelSelect.prototype = {
  	create: function(){
  		// how many pages are needed to show all levels
  		pages = this.game.global.lockedArray.length/(this.game.global.thumbRows*this.game.global.thumbCols);
  		
  		// current page according to last played level, if any
		currentPage = Math.floor(this.game.global.level/(this.game.global.thumbRows*this.game.global.thumbCols));
		if(currentPage>pages-1){
			currentPage = pages-1;
		}
		// left arrow button, to turn one page left
		leftArrow = this.game.add.button(50,420,"leftArrow",this.leftArrowClicked,this);
		leftArrow.anchor.setTo(0.5);
		// can we turn one page left?
		if(currentPage==0){
			leftArrow.alpha = 0.3;
		}
		// right arrow button, to turn one page right
		rightArrow = this.game.add.button(270,420,"rightArrow",this.rightArrowClicked,this);
		rightArrow.anchor.setTo(0.5);
		rightArrow.frame = 1;
		// can we turn one page right?
		if(currentPage==pages-1){
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
			var offsetY = 20;
			// looping through each level thumbnails
		     for(var i = 0; i < this.game.global.thumbRows; i ++){
		     	for(var j = 0; j < this.game.global.thumbCols; j ++){  
		     		// which level does the thumbnail refer?
					var levelNumber = i*this.game.global.thumbCols+j+l*(this.game.global.thumbRows*this.game.global.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked   		
					var levelThumb = this.game.add.button(offsetX+j*(this.game.global.thumbWidth+this.game.global.thumbSpacing), offsetY+i*(this.game.global.thumbHeight+this.game.global.thumbSpacing), "levels", this.thumbClicked, this);	
					// shwoing proper frame
					if (this.game.global.lockedArray[levelNumber] == 1)
					{
						levelThumb.tint = "0x999999";
						// var lock = this.game.add.sprite(levelThumb.x + 49, levelThumb.y + 49, 'locked');
						// lock.anchor.setTo(0.5, 0.5);
						// //levelThumbsGroup.add(lock);
						levelThumb.isLocked = true;
					} else {
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
			}, 400, Phaser.Easing.Cubic.None);
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
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
	},

	thumbClicked:function (button){
		// the level is playable, then play the level!!
		if(!button.isLocked){
			this.game.state.states['Game'].levelNum = button.levelNumber;
			this.game.global.level = button.levelNumber;
			this.game.state.start('Game');
		}
		// else, let's shake the locked levels
		else {
			if (!button.clicked)
			{
				button.clicked = true;

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
} 