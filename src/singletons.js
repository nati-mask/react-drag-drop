const PositionManager = require('./lib/PositionManager');
module.exports = {
    positionManager : new PositionManager($.ajax),
}