var myCreep = require('ClassMyCreep');

/**
 * This module controls a single harvester.
 * If there is spare capacity, move towards it's designated
 * source and harvest it
 * If it is on full capacity move home and drop off the energy
 * @param creep: A MyCreep instance
 */
module.exports = function (creep) {
    creep.setUnminedSource();
    if(creep.spareCapacity()) {
        creep.mine();
    }
    else {
        creep.drop();
    }
};

/** Makes the creep move towards it's parent and drop the energy */
myCreep.prototype.drop = function() {
    this.moveHome();
    this.creep.transferEnergy(this.getParent());
};

/** Makes the creep move towards it's designated source and mine it */
myCreep.prototype.mine = function() {
    var target = this.getSource();
    this.moveTo(target);
    this.creep.harvest(target);
};

/** Gets the designated source for this creep */
myCreep.prototype.getSource = function () {
    return this.getTargetFromMem(Game.SOURCES, c.TARGET.SOURCE);
};

/** Calculates if this creep has capacity to mine more energy */
myCreep.prototype.spareCapacity = function() {
    return this.creep.energy < this.creep.energyCapacity;
};

/** Sets the designated source to the one closest to this creep */
myCreep.prototype.setMiningSource = function() {
    if(!this.getMemory(c.TARGET.SOURCE)) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        var source = this.creep.pos.findNearest(Game.SOURCES_ACTIVE);
        source.memory.has_miner = true;
        this.setMemory(c.TARGET.SOURCE, source.id);
    } 
};


