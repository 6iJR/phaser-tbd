var SpaceBear = SpaceBear || {};

SpaceBear.menuState = function (){};

SpaceBear.menuState.prototype = {
	create: function() {
		  //this.startText = this.game.add.bitmapText(this.game.world.centerX, this.game.height - 150, 'carrier_command', 'SPACE BEARRRR', 12);
    	  //this.startText.anchor.setTo(0.5, 0.5);
    	this.map = this.game.add.tilemap('map1');
        this.map.addTilesetImage('MarsLevelFloorv2', 'tiles');
		this.map.createLayer('Kachelebene1');
   	},
   	update: function() {
   	}
};