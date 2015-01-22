var harvester = require('creep_harvester');
var myCreep = require('ClassMyCreep');
var c       = require('constants');

var MIN_WORKERS = 6;

function MinerManager(miners){
    this.miners = miners;
    this.nr_harvesters  = 0;
    this.nr_miners      = 0;
    this.nr_haulers     = 0;
    
    for (var miner_index in miners) {
        var current_miner = miners[miner_index];
        switch(current_miner.getMemory('role')) {
            case 'harvester': 
                this.nr_harvesters +=1;  
                harvester(current_miner);
                break;
        }
    }
}

MinerManager.prototype.getPriority = function(){
    return (this.nr_harvesters < MIN_WORKERS);
};

MinerManager.prototype.confident = function(){
    return (nr_harvesters > 2 || nr_miners > 0 && nr_haulers > 1);
};

MinerManager.prototype.getScreep = function(){
    return c.S_TYPE.HARVESTER;
};

module.exports = MinerManager;
