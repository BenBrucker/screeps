var manage_miners   = require('manage_miners');
var manage_fighters = require('manage_fighters');
var manage_builders = require('manage_builders');
var mycreep         = require('ClassMyCreep');
var spawner         = require('game_spawner');
var c               = require('constants');

var MINER_INDEX   = 0;
var FIGHTER_INDEX = 1;
var BUILDER_INDEX = 2;
/*
 * This controller sorts the creeps into arrays of different 
 * categories and then calls the relevant manager for that category
 */
module.exports = function (room) {
    var managers = initializeManagers(room);
    setRoomStatus(room, managers);
    selectResponse(room, managers);
};

function selectResponse(room, managers) {
    var status = getRoomStatus(room);
    var toSpawn;
    switch (status) {
        case (c.ROOM_STATUS.INITIAL):
            toSpawn = managers[MINER_INDEX].getScreep();  
            break;
        case (c.ROOM_STATUS.WAR):
            toSpawn = managers[FIGHTER_INDEX].getScreep();  
            break;
        case (c.ROOM_STATUS.CALM):
            break;
    }
    for (var manager_index in managers){
        if (managers[manager_index].getPriority()) {
            toSpawn = managers[manager_index].getScreep();
            break;
        }
    }
    if (!toSpawn) {
        toSpawn = managers[MINER_INDEX].getScreep();  
    }
    spawner.spawnAtBest(room, toSpawn);
}

function setRoomStatus(room, managers) {
    if (!Memory.rooms[room].status) {
        Memory.rooms[room].status = c.ROOM_STATUS.INITIAL;
    }
    else if (managers[FIGHTER_INDEX].confident()) {
       Memory.rooms[room].status = c.ROOM_STATUS.CALM;
    }
    else {
        Memory.rooms[room].status = c.ROOM_STATUS.WAR;
    }
}

function getRoomStatus(room) {
    return Memory.rooms[room].status;
}

function initializeManagers(room) {
    var screeps = room.find(Game.MY_CREEPS);
    var miners   = [];
    var fighters = [];
    var builders = [];
    
    for(var screep_index in screeps) {
        var myCreep = new mycreep(screeps[screep_index]);
        switch(myCreep.getMemory(c.MANAGER.NAME)) {
            case c.MANAGER.MINER: 
                miners.push(myCreep);
                break;
            case c.MANAGER.FIGHTER: 
                fighters.push(myCreep);
                break;
            case c.MANAGER.BUILDER: 
                builders.push(myCreep);
                break;
        }
    }
    var managers = [
        new manage_miners(miners),
        new manage_fighters(fighters),
        new manage_builders(builders)
    ];
    return managers;
}
