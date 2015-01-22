var initializer     = require('game_initializer');
var room_controller = require('game_room_controller');
var c               = require('constants');

module.exports = function (creep) {
    initializer();
    clearDeadCreeps();
    for (var room_index in Memory.rooms) {
        var room_name = Memory.rooms[room_index].name;
        room_controller(Game.getRoom(room_name));
    }
};


/** Clears the memory of dead creeps */
function clearDeadCreeps(){
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}
