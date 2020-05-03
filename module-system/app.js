const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (args) => {
    console.log('Listener called ', args);
});

logger.log('message');

