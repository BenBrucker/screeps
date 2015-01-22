var myCreep = require('ClassMyCreep');

/**
 * This module controls a single builder.
 * If the builder is out of energy it will go home and recharge
 * If it has energy it will look for a construction site and build it
 * @param creep: A MyCreep instance
 */ 
module.exports = function (creep) {
    if(creep.energy == 0) {
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
    }
    else {
        var targets = creep.room.find(Game.CONSTRUCTION_SITES);
        if(targets.length) {
            creep.moveTo(targets[0]);
            creep.build(targets[0]);
        }
    }
 }

