var myCreep = require('ClassMyCreep');

/**
 * This module controls a single guard.
 * If there is an enemy on the map chase and attack it
 * If there is no enemy, go home to regroup
 * @param creep: A MyCreep instance
 */
module.exports = function (creep) {
    var target = creep.findBestTarget();
	if(target) {
		creep.attack(target);
	}
	else {
	    creep.moveHome();
	}
 };

/** Find the best target for this guard. In this case the nearest creep */
myCreep.prototype.findBestTarget = function() {
    return this.creep.pos.findNearest(Game.HOSTILE_CREEPS);
};

/** Move towards the target and attack it */
myCreep.prototype.attack = function(target) {
    this.moveTo(target);
    this.creep.attack(target);
};
