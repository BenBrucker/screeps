var myCreep = require('ClassMyCreep');

/**
 * This module controls a single healer.
 * If there is a healable target, move towards it and heal it, else go home
 * @param creep: A MyCreep instance
 */
module.exports = function (creep) {
    var target = creep.findBestHeal();
    if(target) {
		creep.heal(target);
	}
	else {
	    creep.moveHome();
	}
};

/**
 * Find the best target to heal
 * Currrently: The first creep in Game.MY_CREEPS that
 * is damaged
 */
myCreep.prototype.findBestHeal = function() {
    var targets = this.creep.room.find(Game.MY_CREEPS);
    var target;
    if(targets.length) {
        for(var p in targets) {
            if(targets[p].hits < targets[p].hitsMax ) {
                target = targets[p];
                break;
            }
        }
    }
    return target;
};

/** Move towards the target and heal it. */
myCreep.prototype.heal = function(target) {
    this.moveTo(target);
    this.creep.heal(target);
};
