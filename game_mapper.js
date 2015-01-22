/**
 * Creates a distance map between spawns and their closest sources.
 * This calculation if only run once (This is stored in memory) in 
 * order to save computation time.
 * You should manually call this module with the forceCalculation param 
 * set in order to update the map.
 * A good time to recalculate is the founding of a new spawn.
 */

/**
 * Calls the mapper function (See module doc-string for more info)
 * @param spawns: The set of spawns this calculation should be done for.
 *                Usually just Game.spawns, but this setup might allow for
 *                more nuanced calculations later.
 * @param forceCalculation: if not set, this calculation will only run once. 
 *                          if set, it will recalculate the distance map
 */
module.exports = function(spawns, forceCalculation) {
    if (forceCalculation || !Memory.mapper || !Memory.mapper.set) {
        Memory.mapper = {};
        Memory.mapper.set = false;
        Memory.rooms = {};
        calculateMap(spawns);
    }
};

/**
 * Calculates a distance map for a set of spawns. 
 * Currently it sets the following things in memory:
 * - A list of Sources (named with their .id value)
 *   - Per source the id of the closest spawn
 *   - The distance to the closest spawn
 *   - The amount of available mining spots per spawn
 * @param spawns: The set of spawns to do this calculation for.
 */
function calculateMap (spawns) {
    console.log('calculating');
    var initial = true;
    for (var spawn_index in spawns) {
        Memory.mapper.set = true;
        var spawn = Game.spawns[spawn_index];
        setRoomInfo(spawn);
        setSourceDistances(spawn, initial);
        initial = false;
    }
}

/**
 * Stores the name of a room in memory
 * @param spawn: The spawn who'se room will be stored
 */
function setRoomInfo(spawn) {
    if (!Memory.rooms[spawn.room]) {
        Memory.rooms[spawn.room]  = {name: spawn.room.name, sources: {}};
    }
}

/**
 * Calculates the distance between a spawn and the sourcs in the 
 * room. If the distance is shorter then the one already recorded,
 * update the closest source id and distance. This function sets
 * the following values:
 * -A list of Sources in the room of this spawn.
 *   - Per source the id of the closest spawn
 *   - The distance to the closest spawn
 *   - The amount of available mining spots per spawn
 * @param spawn: The spawn from where to calculate the distances
 * @param initial: Set this to true ONLY if it is called for the 
 * first time, it sets the initial value for these sources
 */
function setSourceDistances(spawn, initial) {
    var sources = spawn.room.find(Game.SOURCES);
    for (var source_index in sources) {
        var source = sources[source_index];
        var path = spawn.room.findPath(spawn.pos, source.pos, 
                            {maxOps: 400, ignoreCreeps: true});
        var dist = path.length;
        if (initial || dist < Memory.rooms[spawn.room].sources[source.id].distance) {
            var spots = getMiningSpots(spawn.room, source);
            Memory.rooms[spawn.room].sources[source.id] = {
                closest : spawn.id, 
                distance: dist,
                spots: spots
            };
        }
    }
}

/**
 * Calculate the number of squares around a source that
 * are not occupied by walls, and are therefore accessible
 * to a harvester
 * @param room: The current room `object''
 * @param source: The current source `object'
 * @return: The number of accessible spaces around the source (0-8)
 */
function getMiningSpots(room, source) {
    // Start off with no walls and the sources x and y coordinates
    var walls = 0;
    var x = source.pos.x;
    var y = source.pos.y;
    // Set the 8 coordinates around the source
    var xs = [x-1, x-1, x-1,   x,   x, x+1, x+1, x+1];
    var ys = [y+1,   y, y-1, y+1, y-1, y+1, y  , y-1];
    // Look at those 8 coordinates and record the number of walls
    for (var i = 0; i < 8; i++) {
        var content = room.lookAt(xs[i], ys[i]);
        if (getTerrain(content) == 'wall') {
            walls += 1;
        }
    }
    return 8 - walls;
}

/**
 * Get the .terrain value of a (lookAt) tile
 * @param terrain_tile: the result of a 'room.lookAt' function
 * @return the value of the `terrain' key in the `lookAt' tile.
 */
function getTerrain(terrain_tile) {
    var terrain_type;
    // Loop through al values of the lookAt result
    for (var i in terrain_tile) {
        if(terrain_tile[i].terrain) {
            terrain_type = terrain_tile[i].terrain;
            break;
        }
    }
    return terrain_type;
}
/*
function getClosestSources(spawn) {
    var sources = [];
    for (source_index in Memory.sources) {
        var source = 
    }
}
*/
