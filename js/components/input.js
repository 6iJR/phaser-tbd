var SpaceBear = SpaceBear || {};

SpaceBear.Input = function(game) {
  this.game = game;
  // init xbox 360 controller
  this.game.input.gamepad.start();
  this.pad1 = this.game.input.gamepad.pad1;

  // init keyboard controls
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.kbPrimary = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
  this.kbSecondary = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
  this.kbStart = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  // input buffer setup
  this.bufferFrames = 6; // must be LESS than player.wasOnGround
  this.kbPrimaryTimer = 0;
  this.kbPrimaryDown = false;
  this.kbPrimaryPressed = false;
  this.kbPrimaryLast = this.kbPrimaryDown;
  this.kbSecondaryDown = false;
  this.kbSecondaryLast = this.kbSecondaryDown;

  // xbox 360 controller flag
  this.usingXbox = false;
};

// SpaceBear.Input.prototype = Object.create(Object.prototoype);
SpaceBear.Input.prototype.constructor = SpaceBear.Input;

SpaceBear.Input.prototype.update = function() {
  if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad1.connected) {
    this.usingXbox = true;
  } else {
    this.usingXbox = false;
  }

  // REMOVE THIS WHEN YOUR'E READY TO USE XBOX controller
  this.usingXbox = false;

  // keyboard input buffering for primary and secondary btns
  if (this.kbPrimaryPressed) {
    this.kbPrimaryTimer++;
    if (this.kbPrimaryTimer > this.bufferFrames) {
      this.kbPrimaryPressed = false;
      this.kbPrimaryTimer = 0;
    }
  }

  // primary and secondary buttons
  this.kbPrimaryLast = this.kbPrimaryDown;
  this.kbPrimaryDown = this.kbPrimary.isDown;
  this.kbSecondaryLast = this.kbSecondaryDown;
  this.kbSecondaryDown = this.kbSecondary.isDown;

  if (this.resetting) {
    this.resetting = false;
    return; // skip the onDown flag if input is being cleared
  }

  // process and set flags (for handmade onDown events)
  if (this.kbPrimaryDown && !this.kbPrimaryLast) { // just pressed
    this.kbPrimaryPressed = true;
  }

};

// GET BUTTON OBJECTS //
SpaceBear.Input.prototype.leftIsDown = function() {
  if (this.usingXbox) {
    return this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
  }
  return this.cursors.left.isDown;
};

SpaceBear.Input.prototype.rightIsDown = function() {
  if (this.usingXbox) {
    return this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
  }
  return this.cursors.right.isDown;
};

SpaceBear.Input.prototype.primaryPressed = function() {
  if (this.usingXbox) {
    return this.pad1.justPressed(Phaser.Gamepad.XBOX360_A);
  }
  return this.kbPrimaryPressed;
};

SpaceBear.Input.prototype.secondaryPressed = function() {
  if (this.usingXbox) {
    return this.pad1.justPressed(Phaser.Gamepad.XBOX360_X);
  }
  return this.kbSecondaryDown && !this.kbSecondaryLast;
};

SpaceBear.Input.prototype.secondaryReleased = function() {
  if (this.usingXbox) {
    return this.pad1.justReleased(Phaser.Gamepad.XBOX360_X);
  }
  return !this.kbSecondaryDown && this.kbSecondaryLast;
};

SpaceBear.Input.prototype.startPressed = function() {
  if (this.usingXbox) {
    return this.pad1.isDown(Phaser.Gamepad.XBOX360_START);
  }
  return this.kbStart.isDown;
};

// BUTTON OBJECTS TO STRING (for tutorials) //
SpaceBear.Input.prototype.directionsToString = function() {
  if (this.usingXbox) {
    return 'left joystick';
  }
  return 'arrow keys';
};

SpaceBear.Input.prototype.primaryBtnToString = function() {
  if (this.usingXbox) {
    return 'a button';
  }
  return 'x key';
};

SpaceBear.Input.prototype.secondaryBtnToString = function() {
  if (this.usingXbox) {
    return 'x button';
  }
  return 'z key';
};

SpaceBear.Input.prototype.startBtnToString = function() {
  if (this.usingXbox) {
    return 'start';
  }
  return 'spacebar';
};

SpaceBear.Input.prototype.destroy = function() {
  // nothing
};

SpaceBear.Input.prototype.resetPrimary = function() {
  this.kbPrimaryTimer = 0;
  this.kbPrimaryDown = false;
  this.kbPrimaryPressed = false;
  this.kbPrimaryLast = this.kbPrimaryDown;
  this.resetting = true;
};