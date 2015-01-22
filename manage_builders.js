var builder = require('creep_builder');
var myCreep = require('ClassMyCreep');
var c       = require('constants');

function BuilderManager(builders){
    for (var builder_index in builders) {
        var current_builder = builders[builder_index];
        if (current_builder.getMemory('role') == 'builder')
            builder(current_builder);
    }
}

BuilderManager.prototype.getPriority = function(){
    return false;
};

BuilderManager.prototype.getScreep = function(){
    return c.S_TYPE.BUILDER;
};

BuilderManager.prototype.confident = function(){
    return true;
};

module.exports = BuilderManager;
