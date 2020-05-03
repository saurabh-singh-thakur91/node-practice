const EventEmitter = require('events');

const emitter = new EventEmitter();

// #2 Register a listener
emitter.on('messageLogged', function(eventArg){
    console.log('Listener called', eventArg )
});

// Arrow functions
emitter.on('messageLogged', (eventArg) => {
    console.log('Listener called that has an arrow function: ', eventArg);
})

// #1 Raise an event
emitter.emit('messageLogged'); // argument 'messageLogged' is the name of the event

emitter.emit('messageLogged', {id: 1, url: 'http://'});

//Exercise
emitter.on('logging', (eventArg) => {
    console.log('logging event generated: ', eventArg.data);
});

emitter.emit('logging', {data: 'This is a log message . . .'})