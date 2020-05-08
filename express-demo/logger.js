function log (req, res, next) {
    console.log('Logging . . .');
    next(); // required otherwise the request will be stuck here
}

module.exports = log;