const EventEmitter = require('events');

console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
     log(message){
        //send the http request
        console.log(message);

        this.emit('messageLogged', {id: 1, url: url});
    }
}



//module.exports = log; //importing just the function
//module.exports.log = log; // importing the object
//module.exports.endPoint = url;
module.exports = Logger;