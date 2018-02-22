const PositionManager = require('./lib/PositionManager');
const LoginManager = require('./lib/LoginManager');

module.exports = {
    positionManager : new PositionManager($.ajax),
    loginManager : new LoginManager(),
}
