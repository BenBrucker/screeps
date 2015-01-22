var mapper          = require('game_mapper');
var room_controller = require('game_room_controller');
var c               = require('constants');

module.exports = function () {
    if (!Memory.costs) {
        initializeMemory();
    }
    mapper(Game.spawns);
};


function initializeMemory() {
    Memory.costs = {};
    console.log('calculating costs');
    for (var s_type_index in c.S_TYPE) {
        var s_type = c.S_TYPE[s_type_index];
        Memory.costs[s_type.s_name] = spawnCost(s_type.body);
    }
}

function spawnCost (body)
{
    var total = 0;
	for (var part_index in body) {
		var part = body[part_index];
		switch(part)
		{
			case Game.MOVE:             total += 50; break;
			case Game.WORK: 	        total += 20; break;
			case Game.CARRY:	        total += 50; break;
			case Game.ATTACK:	        total += 100; break;
			case Game.RANGED_ATTACK:    total += 150; break;
			case Game.HEAL: 			total += 200; break;
			case Game.TOUGH:			total += 5; break;
		}
	}
	return total;
}
