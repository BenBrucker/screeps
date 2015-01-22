/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('constants'); // -> 'a thing'
 */
 
 
var ROOM_STATUS = {
    'INITIAL'   : 'initial',
    'WAR'       : 'war',
    'CALM'      : 'calm',
};
 
var MANAGER = {
    'NAME'      : 'manager',
    'MINER'     : 'miner',
    'FIGHTER'   : 'fighter',
    'BUILDER'   : 'builder',
};

var ROLE = {
    'NAME'      : 'role',
    'BUILDER'   : 'builder',
    'HARVESTER' : 'harvester',
    'MINER'     : 'miner',
    'HAULER'    : 'hauler',
    'FIGHTER'   : 'fighter',
    'GUARD'     : 'guard',
    'HEALER'    : 'healer',
};

var TARGET = {
    'SOURCE'    : 'targetSourceID',
    'PARENT'    : 'parentSpawn',
};

var role = ROLE.NAME;
var manager = MANAGER.NAME;

var S_TYPE = {
    BUILDER     : {
                s_name : ROLE.BUILDER,
                body : [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE],
                mem  : {role : ROLE.BUILDER,    manager: MANAGER.BUILDER}
            },
    GUARD       : {
                s_name : ROLE.GUARD,
                body : [Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK],
                mem  : {role : ROLE.GUARD,      manager: MANAGER.FIGHTER}
            },
    HEALER      : {
                s_name : ROLE.HEALER,
                body : [Game.WORK, Game.WORK, Game.CARRY, Game.MOVE, Game.MOVE],
                mem  : {role : ROLE.HEALER,     manager: MANAGER.FIGHTER}
            },
    HARVESTER   : {
                s_name : ROLE.HARVESTER,
                body : [Game.WORK, Game.CARRY, Game.MOVE],
                mem  : {role : ROLE.HARVESTER,  manager: MANAGER.MINER}
            },
    MINER       : {
                s_name : ROLE.MINER,
                body : [Game.WORK, Game.WORK, Game.WORK, Game.MOVE],
                mem  : {role : ROLE.MINER,      manager: MANAGER.MINER}
            },
    HAULER      : {
                s_name : ROLE.HAULER,
                body : [Game.CARRY, Game.MOVE],
                mem  : {role : ROLE.HAULER,     manager: MANAGER.MINER}
            },
};

module.exports  = {
    ROOM_STATUS : ROOM_STATUS,
    MANAGER     : MANAGER,
    ROLE        : ROLE,
    TARGET      : TARGET,
    S_TYPE      : S_TYPE
};
