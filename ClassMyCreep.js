/**
 * The MyCreep class provides a wrapper around creeps in 
 * order to ease interacion with the underlying code.
 */
var c       = require('constants');

/**
 * Constuctor for a MyCreep
 * When this creep has no parent spawn, it automatically assigns
 * the nearest spawn as its parent. This should be normally the 
 * one that just spawned it.
 * This parent will be used in for example the moveHome method.
 * @param creep: A creep from Game.creeps
 */
function MyCreep(creep){
    this.creep = creep;
    if(!this.creep.memory.parentSpawn) {
        var spawn = this.creep.pos.findNearest(Game.MY_SPAWNS);
        this.creep.memory.parentSpawn = spawn.id;
    } 
}

/** Get the value stored in this creep's memory with key: key */
MyCreep.prototype.getMemory = function(key){
    return this.creep.memory[key];
};

/** Store the value in this creeps memory with key: key */
MyCreep.prototype.setMemory = function(key, value){
    this.creep.memory[key] = value;
};

/** Moves this creep towards the target */
MyCreep.prototype.moveTo = function(target){
    // TODO make a smarter move function that does not recalculate every turn
    this.creep.moveTo(target);
};

/**
 * Gets a target that is stored in this creeps memory.
 * @param target_type: This should be a Game.TYPE, like Game.SPAWNS
 * @param memory_name: The name of the stored type in this creeps memory
 * @return: an object of the Game.TYPE that was passed
 */
MyCreep.prototype.getTargetFromMem = function (target_type, memory_name) {
    var memory_id = this.creep.memory[memory_name];
    return Game.getObjectById(memory_id);
};

/** Gets the parent spawn of this creep */
MyCreep.prototype.getParent = function () {
    return this.getTargetFromMem(Game.MY_SPAWNS, c.TARGET.PARENT);
};

/** Move this creep towards it's parent */
MyCreep.prototype.moveHome = function() {
    var home = this.getParent();
    this.moveTo(home);
};

module.exports = MyCreep;
