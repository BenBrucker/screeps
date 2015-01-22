/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (creep, location) {
	creep.moveTo(creep.memory.location);
	var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
	if(target) {
		creep.attack(target);
	}
};
