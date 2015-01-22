/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner'); // -> 'a thing'
 */
var build_manager   = require('manage_builders');
var miner_manager   = require('manage_miners');
var fighter_manager = require('manage_fighters');

function getFreeSpawns(room) {
    var spawns = room.find(Game.MY_SPAWNS);
    var free_spawns = {};
    for (var spawn_index in spawns) {
        var spawn = spawns[spawn_index];
        free_spawns.spawn = spawn.energy;
    }
    return free_spawns;
}
module.exports.getFreeSpawns = getFreeSpawns;

function spawnAtBest(room, screep) {
    var current_energy = 0;
    var best_spawn;
    var spawns = room.find(Game.MY_SPAWNS);
    for (var spawn_index in spawns) {
        var spawn = spawns[spawn_index];
        if(!best_spawn && canSpawnAt(spawn, screep)) {
            if (spawn.energy > current_energy) {
                current_energy = spawn.energy;
                best_spawn = spawn;
            }
        }
    }
    if (best_spawn) {
        spawnAtSpecific(best_spawn, screep);
    }
}
module.exports.spawnAtBest = spawnAtBest;

function spawnAtSpecific(spawn, screep) {
    if(!spawn.spawning) {
        var NAME;
        spawn.createCreep(screep.body, 
                          NAME,
                          screep.mem);
    }
}
module.exports.spawnAtSpecific = spawnAtSpecific;

function canSpawnAt(spawn, screep) {
    return (spawn.energy >= Memory.costs[screep.s_name]);
}
module.exports.canSpawnAt = canSpawnAt;
