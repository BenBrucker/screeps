var guard = require('creep_guard');
var healer = require('creep_healer');
var myCreep = require('ClassMyCreep');
var c       = require('constants');

function FighterManager(fighters){
    this.fighterscreeps = [];
    for (var fighter_index in fighters) {
        var current_fighter = fighters[fighter_index];
        if (current_fighter.getMemory('role') == 'guard') {
            guard(current_fighter);
            //this.fighterscreeps.add(current_fighter);
        }
        else if (current_fighter.getMemory('role') == 'healer') {
            healer(current_fighter);
        }
    }
}

FighterManager.prototype.getPriority = function(){
    return false;
};

FighterManager.prototype.getScreep = function(){
    return c.S_TYPE.GUARD;
};

//TODO
FighterManager.prototype.confident = function(){
    return (this.fighterscreeps.length > 4);
};

module.exports = FighterManager;
